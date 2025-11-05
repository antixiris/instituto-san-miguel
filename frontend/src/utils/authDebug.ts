// Herramienta de debug para autenticación
export function debugAuth() {
  console.group('🔍 AUTH DEBUG');
  console.log('Token exists:', !!localStorage.getItem('token'));
  console.log('Token value:', localStorage.getItem('token')?.substring(0, 50) + '...');
  console.log('User exists:', !!localStorage.getItem('user'));

  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      console.log('User data:', {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      });
    } catch (e) {
      console.error('Error parsing user:', e);
    }
  } else {
    console.warn('No user data in localStorage');
  }

  console.log('RefreshToken exists:', !!localStorage.getItem('refreshToken'));
  console.groupEnd();
}

// Exponer globalmente para debug
(window as any).debugAuth = debugAuth;
