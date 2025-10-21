import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import Button from './ui/Button';

/**
 * Navbar - Extreme Minimalism
 * Inspired by Claude's clean, purposeful navigation
 * Minimal logo, essential navigation, subtle presence
 */

// Icono conceptual: San Miguel + Espada + Dragón
const SanMiguelIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-neutral-900 dark:text-white"
  >
    {/* San Miguel - Círculo (cabeza/aureola) */}
    <circle
      cx="20"
      cy="8"
      r="3"
      fill="currentColor"
    />

    {/* Cuerpo de San Miguel + Espada (unificados en una forma) */}
    <path
      d="M 20 11 L 20 26"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* Alas minimalistas - dos trazos curvos */}
    <path
      d="M 20 14 Q 12 14 10 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M 20 14 Q 28 14 30 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />

    {/* Guarda de la espada */}
    <line
      x1="14"
      y1="20"
      x2="26"
      y2="20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Dragón derrotado - forma serpentina simple abajo */}
    <path
      d="M 12 32 Q 16 28 20 30 Q 24 32 28 30"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const MinimalLogo = () => (
  <div className="flex items-center gap-3">
    <SanMiguelIcon />
    <div className="flex flex-col">
      <span className="font-semibold text-lg text-orange-600 dark:text-orange-500 tracking-tight">
        Instituto San Miguel
      </span>
      <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-medium">
        Computación, IA y PLN
      </span>
    </div>
  </div>
);

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();
  const location = useLocation();

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Minimal navigation - only essentials
  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/campus', label: 'Campus' },
    { to: '/notebook', label: 'Notebook' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800'
          : 'bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <MinimalLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive(link.to)
                    ? 'text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              ) : (
                <Moon className="w-5 h-5 text-neutral-600" />
              )}
            </button>

            {isAuthenticated ? (
              <>
                <Link to="/campus">
                  <Button variant="ghost" size="sm">
                    Mi Campus
                  </Button>
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-neutral-100 transition-colors">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-8 h-8 rounded-full object-cover border border-neutral-200"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-white font-medium text-xs">
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                      </div>
                    )}
                  </button>

                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-neutral-200 shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="px-3 py-2 border-b border-neutral-100">
                      <p className="font-medium text-sm text-neutral-900">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                    </div>
                    <Link
                      to="/campus/perfil"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Perfil
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Iniciar sesión
                  </Button>
                </Link>
                <Link to="/registro">
                  <Button variant="primary" size="sm">
                    Empezar
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile: Theme Toggle & Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              ) : (
                <Moon className="w-5 h-5 text-neutral-600" />
              )}
            </button>
            <button
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
              ) : (
                <Menu className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-neutral-200 dark:border-neutral-800 overflow-hidden"
            >
              <div className="py-3 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link.to)
                        ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="pt-3 mt-3 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/campus"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block"
                      >
                        <Button variant="ghost" size="sm" fullWidth>
                          Mi Campus
                        </Button>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full btn btn-ghost text-sm"
                      >
                        <LogOut className="w-4 h-4" />
                        Cerrar sesión
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block"
                      >
                        <Button variant="ghost" size="sm" fullWidth>
                          Iniciar sesión
                        </Button>
                      </Link>
                      <Link
                        to="/registro"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block"
                      >
                        <Button variant="primary" size="sm" fullWidth>
                          Empezar
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
