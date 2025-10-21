import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react';

/**
 * Footer - Minimal Essential Information
 * Inspired by Claude's clean, unobtrusive footer
 * Only essential links and information
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="container-custom py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-3">
              <span className="font-semibold text-base text-neutral-900 dark:text-white">
                Instituto San Miguel
              </span>
            </Link>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Investigación y educación en Procesamiento del Lenguaje Natural
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-medium text-neutral-900 dark:text-white mb-3">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/campus" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Campus
                </Link>
              </li>
              <li>
                <Link to="/investigacion" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                  I+D
                </Link>
              </li>
              <li>
                <a
                  href="https://iasanmiguel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  iasanmiguel.com
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="text-sm font-medium text-neutral-900 dark:text-white mb-3">Conectar</h3>
            <div className="flex items-center gap-3 mb-4">
              <a
                href="https://github.com/institutosanmiguel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/institutosanmiguel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/institutosanmiguel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacidad" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Términos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
            © {currentYear} Instituto San Miguel. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
