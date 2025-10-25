"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = slugify;
exports.generateUniqueSlug = generateUniqueSlug;
// Utilidad para crear slugs URL-friendly
function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .normalize('NFD') // Descomponer caracteres acentuados
        .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
        .replace(/\s+/g, '-') // Reemplazar espacios con guiones
        .replace(/[^\w\-]+/g, '') // Eliminar caracteres no alfanuméricos
        .replace(/\-\-+/g, '-') // Reemplazar múltiples guiones con uno solo
        .replace(/^-+/, '') // Eliminar guiones al inicio
        .replace(/-+$/, ''); // Eliminar guiones al final
}
/**
 * Genera un slug único agregando un sufijo numérico si es necesario
 */
function generateUniqueSlug(baseSlug, existingSlugs) {
    let slug = slugify(baseSlug);
    let counter = 1;
    while (existingSlugs.includes(slug)) {
        slug = `${slugify(baseSlug)}-${counter}`;
        counter++;
    }
    return slug;
}
//# sourceMappingURL=slugify.js.map