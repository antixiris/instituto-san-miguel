/**
 * PDF Generation Service
 *
 * Genera PDFs de módulos del curso usando Puppeteer.
 * Incluye contenido de todas las lecciones del módulo en formato profesional.
 */

import puppeteer, { Browser, Page } from 'puppeteer';
import { marked } from 'marked';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs/promises';

const prisma = new PrismaClient();

interface PDFOptions {
  title: string;
  subtitle?: string;
  author?: string;
  includeTableOfContents?: boolean;
}

export class PDFService {
  private browser: Browser | null = null;

  /**
   * Inicializa el browser de Puppeteer
   */
  async initialize() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }
  }

  /**
   * Cierra el browser de Puppeteer
   */
  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  /**
   * Genera PDF de un módulo completo
   */
  async generateModulePDF(
    moduleId: string,
    options: PDFOptions = { title: '', includeTableOfContents: true }
  ): Promise<Buffer> {
    await this.initialize();

    // Obtener módulo con lecciones
    const module = await prisma.module.findUnique({
      where: { id: moduleId },
      include: {
        lessons: {
          where: { isPublished: true },
          orderBy: { order: 'asc' }
        },
        course: {
          select: {
            title: true,
            instructor: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        }
      }
    });

    if (!module) {
      throw new Error(`Module ${moduleId} not found`);
    }

    // Generar HTML del contenido
    const html = await this.generateHTML(module, options);

    // Crear página y generar PDF
    const page = await this.browser!.newPage();

    try {
      await page.setContent(html, {
        waitUntil: 'networkidle0'
      });

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '15mm',
          bottom: '20mm',
          left: '15mm'
        },
        displayHeaderFooter: true,
        headerTemplate: `
          <div style="font-size: 10px; width: 100%; text-align: center; color: #666; padding: 5px 0;">
            <span class="title">${options.title}</span>
          </div>
        `,
        footerTemplate: `
          <div style="font-size: 10px; width: 100%; text-align: center; color: #666; padding: 5px 0;">
            <span class="pageNumber"></span> / <span class="totalPages"></span>
          </div>
        `
      });

      return Buffer.from(pdfBuffer);
    } finally {
      await page.close();
    }
  }

  /**
   * Genera HTML completo del módulo
   */
  private async generateHTML(
    module: any,
    options: PDFOptions
  ): Promise<string> {
    const lessons = module.lessons;

    // Generar contenido de lecciones
    const lessonsHTML = await Promise.all(
      lessons.map(async (lesson: any, index: number) => {
        const content = await this.convertMarkdownToHTML(lesson.content || '');

        return `
          <div class="lesson" id="lesson-${index + 1}">
            <h2 class="lesson-title">
              <span class="lesson-number">Lección ${index + 1}</span>
              ${lesson.title}
            </h2>
            <div class="lesson-description">
              ${lesson.description || ''}
            </div>
            <div class="lesson-content">
              ${content}
            </div>
          </div>
          ${index < lessons.length - 1 ? '<div class="page-break"></div>' : ''}
        `;
      })
    );

    // Generar tabla de contenidos
    const tocHTML = options.includeTableOfContents
      ? this.generateTableOfContents(lessons)
      : '';

    // Template HTML completo
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${options.title}</title>
        <style>
          ${this.getStyles()}
        </style>
      </head>
      <body>
        <!-- Portada -->
        <div class="cover-page">
          <div class="cover-content">
            <div class="logo">
              <h1>Instituto San Miguel</h1>
            </div>
            <h1 class="course-title">${module.course.title}</h1>
            <h2 class="module-title">${module.title}</h2>
            ${options.subtitle ? `<p class="subtitle">${options.subtitle}</p>` : ''}
            <div class="author">
              ${module.course.instructor
                ? `Por: ${module.course.instructor.firstName} ${module.course.instructor.lastName}`
                : ''}
            </div>
            <div class="date">
              Generado: ${new Date().toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>

        <div class="page-break"></div>

        <!-- Tabla de Contenidos -->
        ${tocHTML}

        ${tocHTML ? '<div class="page-break"></div>' : ''}

        <!-- Contenido de Lecciones -->
        <div class="lessons-container">
          ${lessonsHTML.join('')}
        </div>

        <!-- Página Final -->
        <div class="page-break"></div>
        <div class="final-page">
          <h2>¡Felicitaciones!</h2>
          <p>Has completado el módulo <strong>${module.title}</strong></p>
          <p>Continúa aprendiendo en el Instituto San Miguel.</p>
          <div class="footer-note">
            <p>Este material es propiedad del Instituto San Miguel.</p>
            <p>© ${new Date().getFullYear()} Instituto San Miguel. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Convierte Markdown a HTML
   */
  private async convertMarkdownToHTML(markdown: string): Promise<string> {
    // Configurar marked
    marked.setOptions({
      gfm: true, // GitHub Flavored Markdown
      breaks: true
    });

    return marked(markdown);
  }

  /**
   * Genera tabla de contenidos
   */
  private generateTableOfContents(lessons: any[]): string {
    const items = lessons.map((lesson, index) => `
      <li class="toc-item">
        <a href="#lesson-${index + 1}">
          <span class="toc-number">${index + 1}.</span>
          <span class="toc-title">${lesson.title}</span>
        </a>
      </li>
    `).join('');

    return `
      <div class="table-of-contents">
        <h2>Tabla de Contenidos</h2>
        <ol class="toc-list">
          ${items}
        </ol>
      </div>
    `;
  }

  /**
   * Estilos CSS para el PDF
   */
  private getStyles(): string {
    return `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        font-size: 11pt;
      }

      /* Portada */
      .cover-page {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 40px;
      }

      .cover-content {
        max-width: 600px;
      }

      .logo h1 {
        font-size: 28pt;
        margin-bottom: 60px;
        font-weight: 300;
        letter-spacing: 2px;
      }

      .course-title {
        font-size: 20pt;
        margin-bottom: 20px;
        font-weight: 300;
        opacity: 0.9;
      }

      .module-title {
        font-size: 32pt;
        margin-bottom: 30px;
        font-weight: 700;
      }

      .subtitle {
        font-size: 14pt;
        margin-bottom: 40px;
        opacity: 0.8;
      }

      .author {
        font-size: 12pt;
        margin-bottom: 10px;
      }

      .date {
        font-size: 10pt;
        opacity: 0.7;
      }

      /* Tabla de Contenidos */
      .table-of-contents {
        padding: 40px 20px;
      }

      .table-of-contents h2 {
        font-size: 24pt;
        margin-bottom: 30px;
        color: #667eea;
        border-bottom: 2px solid #667eea;
        padding-bottom: 10px;
      }

      .toc-list {
        list-style: none;
        padding: 0;
      }

      .toc-item {
        margin-bottom: 15px;
        padding: 10px;
        border-left: 3px solid #667eea;
        background: #f8f9fa;
      }

      .toc-item a {
        text-decoration: none;
        color: #333;
        display: flex;
        align-items: center;
      }

      .toc-number {
        font-weight: bold;
        color: #667eea;
        margin-right: 10px;
        font-size: 12pt;
      }

      .toc-title {
        font-size: 11pt;
      }

      /* Lecciones */
      .lessons-container {
        padding: 20px;
      }

      .lesson {
        margin-bottom: 40px;
      }

      .lesson-title {
        font-size: 20pt;
        color: #667eea;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 2px solid #667eea;
      }

      .lesson-number {
        display: inline-block;
        background: #667eea;
        color: white;
        padding: 5px 15px;
        border-radius: 5px;
        font-size: 12pt;
        margin-right: 10px;
      }

      .lesson-description {
        font-style: italic;
        color: #666;
        margin-bottom: 20px;
        padding: 10px;
        background: #f8f9fa;
        border-left: 4px solid #667eea;
      }

      .lesson-content {
        padding: 10px 0;
      }

      /* Markdown elements */
      h1, h2, h3, h4, h5, h6 {
        margin-top: 20px;
        margin-bottom: 10px;
        color: #2c3e50;
      }

      h1 { font-size: 18pt; }
      h2 { font-size: 16pt; }
      h3 { font-size: 14pt; }
      h4 { font-size: 12pt; }

      p {
        margin-bottom: 12px;
        text-align: justify;
      }

      code {
        background: #f4f4f4;
        padding: 2px 6px;
        border-radius: 3px;
        font-family: 'Courier New', monospace;
        font-size: 10pt;
        color: #e74c3c;
      }

      pre {
        background: #2d2d2d;
        color: #f8f8f2;
        padding: 15px;
        border-radius: 5px;
        overflow-x: auto;
        margin: 15px 0;
      }

      pre code {
        background: transparent;
        color: inherit;
        padding: 0;
      }

      blockquote {
        border-left: 4px solid #667eea;
        padding-left: 15px;
        margin: 15px 0;
        font-style: italic;
        color: #555;
        background: #f8f9fa;
        padding: 15px;
      }

      ul, ol {
        margin-left: 25px;
        margin-bottom: 15px;
      }

      li {
        margin-bottom: 8px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin: 15px 0;
      }

      th, td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
      }

      th {
        background: #667eea;
        color: white;
        font-weight: bold;
      }

      tr:nth-child(even) {
        background: #f8f9fa;
      }

      img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 15px auto;
      }

      a {
        color: #667eea;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      /* Página final */
      .final-page {
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 40px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      .final-page h2 {
        font-size: 32pt;
        margin-bottom: 30px;
        color: white;
      }

      .final-page p {
        font-size: 14pt;
        margin-bottom: 15px;
        text-align: center;
      }

      .footer-note {
        margin-top: 60px;
        opacity: 0.7;
        font-size: 10pt;
      }

      /* Page break */
      .page-break {
        page-break-after: always;
      }

      /* Print optimizations */
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `;
  }

  /**
   * Verifica si un estudiante ha aprobado el test del módulo
   */
  async hasStudentPassedModuleTest(
    studentId: string,
    moduleId: string
  ): Promise<boolean> {
    // Obtener test del módulo
    const moduleTest = await prisma.moduleTest.findFirst({
      where: {
        moduleId,
        isActive: true
      }
    });

    if (!moduleTest) {
      // Si no hay test, permitir descarga
      return true;
    }

    // Buscar submission aprobado
    const passedSubmission = await prisma.moduleTestSubmission.findFirst({
      where: {
        testId: moduleTest.id,
        userId: studentId,
        passed: true
      }
    });

    return !!passedSubmission;
  }

  /**
   * Obtiene o genera PDF cacheado
   */
  async getCachedOrGeneratePDF(
    moduleId: string,
    options: PDFOptions
  ): Promise<Buffer> {
    const cacheDir = path.join(__dirname, '../../.cache/pdfs');
    const cacheFile = path.join(cacheDir, `${moduleId}.pdf`);

    try {
      // Verificar si existe cache válido (menos de 24 horas)
      const stats = await fs.stat(cacheFile);
      const ageHours = (Date.now() - stats.mtimeMs) / (1000 * 60 * 60);

      if (ageHours < 24) {
        // Retornar cache
        return await fs.readFile(cacheFile);
      }
    } catch (error) {
      // Cache no existe o error al leer
    }

    // Generar nuevo PDF
    const pdfBuffer = await this.generateModulePDF(moduleId, options);

    // Guardar en cache
    try {
      await fs.mkdir(cacheDir, { recursive: true });
      await fs.writeFile(cacheFile, pdfBuffer);
    } catch (error) {
      console.error('Error saving PDF cache:', error);
    }

    return pdfBuffer;
  }

  /**
   * Limpia cache de PDFs
   */
  async clearCache(moduleId?: string) {
    const cacheDir = path.join(__dirname, '../../.cache/pdfs');

    if (moduleId) {
      // Limpiar solo un módulo específico
      const cacheFile = path.join(cacheDir, `${moduleId}.pdf`);
      try {
        await fs.unlink(cacheFile);
      } catch (error) {
        // Archivo no existe
      }
    } else {
      // Limpiar todo el cache
      try {
        const files = await fs.readdir(cacheDir);
        await Promise.all(
          files.map(file => fs.unlink(path.join(cacheDir, file)))
        );
      } catch (error) {
        // Directorio no existe
      }
    }
  }
}

// Singleton instance
export const pdfService = new PDFService();
