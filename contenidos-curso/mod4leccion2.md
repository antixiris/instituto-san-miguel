<p><strong><em>Componentes reutilizables: El poder de las props</em></strong></p>

## Introducción: De una tarjeta a mil tarjetas

En la lección anterior creaste tu primer componente React. Pero había un problema: el componente `TarjetaPresentacion` siempre mostraba la misma información (el nombre "Juan Pérez"). ¿Qué pasaría si quisieras mostrar 10 tarjetas diferentes con 10 nombres diferentes? ¿Tendrías que crear 10 componentes distintos?

¡Por supuesto que no! Aquí es donde React muestra su verdadero poder. En esta lección aprenderás a crear componentes que funcionan como plantillas: escribes el componente una sola vez, y luego lo usas mil veces con información diferente cada vez.

Piensa en las props como los ingredientes de una receta: la receta (el componente) siempre es la misma, pero puedes usar diferentes ingredientes cada vez que cocinas. Así puedes hacer la misma pizza con diferentes sabores.

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Entender qué son las props**: Comprenderás cómo pasar información de un componente padre a un componente hijo usando props (propiedades).
2. **Crear componentes reutilizables**: Construirás componentes que aceptan datos dinámicos y se adaptan a diferentes situaciones.
3. **Usar TypeScript con props**: Aprenderás a definir interfaces que especifican qué props debe recibir un componente, haciendo tu código más seguro.
4. **Reutilizar componentes múltiples veces**: Usarás el mismo componente varias veces con diferentes datos, comprendiendo el verdadero poder de React.

---

## ¿Por qué son importantes las props?

Imagina que trabajas en una imprenta. Tienes una plantilla para tarjetas de presentación con espacios en blanco para el nombre, cargo y teléfono. Cada cliente te da sus datos, tú los colocas en la plantilla, imprimes la tarjeta y listo. No necesitas diseñar una plantilla nueva para cada cliente.

**Las props funcionan exactamente así en React**: son los datos que le pasas a un componente para que se personalice. El componente es la plantilla, las props son la información específica que quieres mostrar.

### La analogía de la máquina de café

Piensa en un componente como una máquina de café:
- **El componente** es la máquina (siempre la misma)
- **Las props** son los botones que presionas (expreso, capuchino, latte)
- **El resultado** es diferente según qué botón presiones, pero la máquina sigue siendo la misma

```
Componente Tarjeta + Props (nombre: "Ana") = Tarjeta de Ana
Componente Tarjeta + Props (nombre: "Luis") = Tarjeta de Luis
Componente Tarjeta + Props (nombre: "María") = Tarjeta de María
```

### 📊 Un dato interesante

El concepto de props es tan fundamental en React que absolutamente todas las aplicaciones profesionales lo usan. Sin props, React sería solo un sistema de plantillas estáticas sin ninguna ventaja. Las props son lo que permite que Netflix muestre miles de tarjetas de películas usando un solo componente de tarjeta.

---

## 🤖 Claude Code en Acción: Tu Asistente para Componentes Reutilizables

Crear componentes reutilizables con props bien diseñadas es una de las habilidades más importantes en React. Claude Code puede ayudarte a diseñar interfaces de props robustas, extraer componentes de código repetitivo y crear sistemas de componentes escalables. En esta sección verás cómo Claude Code transforma la forma en que trabajas con componentes.

### Por qué Claude Code brilla con componentes

Diseñar componentes reutilizables requiere:
- **Identificar patrones repetitivos** en tu código que puedan extraerse
- **Definir interfaces TypeScript claras** para props
- **Balancear flexibilidad y simplicidad** (ni muy genérico ni muy específico)
- **Documentar correctamente** qué props espera cada componente

Claude Code sobresale en estas tareas porque puede analizar tu código completo, identificar oportunidades de reutilización y generar componentes con interfaces TypeScript bien diseñadas.

### Prompt 1: Crear componente reutilizable con props

**Tu situación**: Quieres crear un componente `Button` reutilizable con diferentes variantes (primario, secundario, peligro) y tamaños.

**Prompt efectivo**:
```
Crea un componente Button reutilizable en TypeScript con estas características:
- Props: label (string), variant ('primary' | 'secondary' | 'danger'), size ('small' | 'medium' | 'large'), onClick (función)
- Estilos diferentes según variant y size
- Accesibilidad: atributos ARIA apropiados
- Export default del componente
```

**Código generado por Claude Code**:

```tsx
// src/components/Button.tsx
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  onClick: () => void;
  disabled?: boolean;
}

function Button({
  label,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false
}: ButtonProps) {
  // Estilos base
  const baseStyles = 'font-semibold rounded transition-all duration-200 focus:outline-none focus:ring-2';

  // Estilos por variante
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-300',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-300'
  };

  // Estilos por tamaño
  const sizeStyles = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  // Estilo cuando está deshabilitado
  const disabledStyles = 'opacity-50 cursor-not-allowed';

  const buttonClasses = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${disabled ? disabledStyles : ''}
  `.trim();

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      type="button"
    >
      {label}
    </button>
  );
}

export default Button;
```

**Por qué este código es excelente**:
- Interface TypeScript completa con valores por defecto
- Props opcionales bien marcadas (`variant?`, `size?`)
- Uso de union types (`'primary' | 'secondary' | 'danger'`) para seguridad de tipos
- Separación clara de estilos por responsabilidad
- Accesibilidad con `aria-label`
- Componente completamente reutilizable

### Prompt 2: Refactorizar código para extraer componentes

**Tu situación**: Tienes código repetitivo mostrando información de usuarios en varios lugares. Quieres extraerlo a un componente reutilizable.

**Prompt efectivo**:
```
Analiza este código y extrae un componente UserCard reutilizable:

<div className="user-container">
  <img src={user.avatar} alt={user.name} />
  <h3>{user.name}</h3>
  <p>{user.email}</p>
  <span>{user.role}</span>
</div>

Repito este patrón en 5 lugares diferentes. Crea:
1. Interface User con las propiedades
2. Componente UserCard que reciba un user como prop
3. Estilos CSS-in-JS o className apropiadas
```

**Código generado por Claude Code**:

```tsx
// src/types/User.ts
export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

// src/components/UserCard.tsx
import { User } from '../types/User';

interface UserCardProps {
  user: User;
  onUserClick?: (userId: number) => void;
  showEmail?: boolean;
}

function UserCard({ user, onUserClick, showEmail = true }: UserCardProps) {
  const handleClick = () => {
    if (onUserClick) {
      onUserClick(user.id);
    }
  };

  return (
    <div
      className="user-card"
      onClick={handleClick}
      role={onUserClick ? 'button' : undefined}
      tabIndex={onUserClick ? 0 : undefined}
    >
      <img
        src={user.avatar}
        alt={`Avatar de ${user.name}`}
        className="user-avatar"
      />
      <div className="user-info">
        <h3 className="user-name">{user.name}</h3>
        {showEmail && <p className="user-email">{user.email}</p>}
        <span className="user-role">{user.role}</span>
      </div>
    </div>
  );
}

export default UserCard;

// Estilos sugeridos para src/index.css
/*
.user-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.user-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  flex: 1;
}

.user-name {
  margin: 0 0 5px 0;
  color: #2c3e50;
  font-size: 18px;
}

.user-email {
  margin: 0 0 5px 0;
  color: #7f8c8d;
  font-size: 14px;
}

.user-role {
  display: inline-block;
  background: #3498db;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}
*/
```

**Mejoras que Claude Code añadió**:
- Separó la interface `User` en archivo dedicado (reutilizable en toda la app)
- Añadió prop opcional `onUserClick` para interactividad
- Añadió prop `showEmail` para control de visibilidad
- Mejoró accesibilidad con `role` y `tabIndex` cuando es clickeable
- Generó estilos CSS completos y profesionales
- Texto alternativo descriptivo en la imagen

### Prompt 3: Diseñar sistema de componentes escalable

**Tu situación**: Estás empezando un proyecto grande y necesitas un sistema de componentes consistente.

**Prompt efectivo**:
```
Diseña un sistema básico de componentes UI para una biblioteca reutilizable:

Componentes necesarios:
1. Card (contenedor con header, body, footer opcionales)
2. Badge (etiqueta pequeña con variantes de color)
3. Avatar (imagen de perfil con tamaños y fallback)

Requisitos:
- TypeScript con interfaces claras
- Props opcionales bien definidas
- Estilos consistentes usando clases CSS
- Todos exportados desde un index.ts
```

**Código generado por Claude Code**:

```tsx
// src/components/ui/Card.tsx
interface CardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Card({ children, header, footer, className = '' }: CardProps) {
  return (
    <div className={`card ${className}`}>
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

// src/components/ui/Badge.tsx
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'small' | 'medium' | 'large';
}

export function Badge({ children, variant = 'default', size = 'medium' }: BadgeProps) {
  return (
    <span className={`badge badge-${variant} badge-${size}`}>
      {children}
    </span>
  );
}

// src/components/ui/Avatar.tsx
interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'small' | 'medium' | 'large';
  fallback?: string;
}

export function Avatar({ src, alt, size = 'medium', fallback }: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  const handleError = () => {
    setImageError(true);
  };

  if (imageError || !src) {
    // Fallback: muestra iniciales o texto
    const initials = fallback || alt.split(' ').map(n => n[0]).join('').substring(0, 2);
    return (
      <div className={`avatar avatar-${size} avatar-fallback`}>
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`avatar avatar-${size}`}
      onError={handleError}
    />
  );
}

// src/components/ui/index.ts
export { Card } from './Card';
export { Badge } from './Badge';
export { Avatar } from './Avatar';

// Uso del sistema:
/*
import { Card, Badge, Avatar } from './components/ui';

function UserProfile() {
  return (
    <Card
      header={
        <div className="flex items-center gap-3">
          <Avatar src="/user.jpg" alt="Juan Pérez" size="large" />
          <h2>Juan Pérez</h2>
        </div>
      }
      footer={<Badge variant="success">Activo</Badge>}
    >
      <p>Desarrollador Full Stack con 5 años de experiencia.</p>
    </Card>
  );
}
*/
```

**Ventajas del sistema generado**:
- Componentes independientes pero con API consistente
- Exportación centralizada desde `index.ts`
- Manejo de errores en Avatar con fallback automático
- Props `children` para máxima flexibilidad
- Tamaños y variantes consistentes en todos los componentes

### Workflow Completo: Crear Biblioteca de Componentes UI

Vamos a crear un conjunto completo de componentes UI para una aplicación, desde cero hasta componentes listos para producción.

**Paso 1: Planificar la estructura**

```
Crea una estructura de carpetas para una biblioteca de componentes UI:
- src/components/ui/
- Componentes: Button, Input, Card, Badge, Avatar, Alert
- Cada componente en su archivo
- Index.ts que exporte todos
- Archivo types.ts con types compartidos
```

**Paso 2: Crear types compartidos**

```tsx
// src/components/ui/types.ts
export type Size = 'small' | 'medium' | 'large';
export type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type Color = 'blue' | 'green' | 'yellow' | 'red' | 'gray';

export interface BaseComponentProps {
  className?: string;
  id?: string;
  'aria-label'?: string;
}
```

**Paso 3: Implementar componente Input con validación**

Prompt: "Crea componente Input con label, placeholder, validación y mensaje de error"

```tsx
// src/components/ui/Input.tsx
import { BaseComponentProps, Size } from './types';

interface InputProps extends BaseComponentProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number';
  size?: Size;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export function Input({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  size = 'medium',
  error,
  required = false,
  disabled = false,
  className = '',
  id,
  'aria-label': ariaLabel
}: InputProps) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s/g, '-')}`;

  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-label={ariaLabel || label}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`input input-${size} ${error ? 'input-error' : ''}`}
      />
      {error && (
        <p id={`${inputId}-error`} className="input-error-message">
          {error}
        </p>
      )}
    </div>
  );
}
```

**Paso 4: Crear componente Alert reutilizable**

```tsx
// src/components/ui/Alert.tsx
import { BaseComponentProps, Variant } from './types';

interface AlertProps extends BaseComponentProps {
  children: React.ReactNode;
  variant?: Variant;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
}

export function Alert({
  children,
  variant = 'primary',
  dismissible = false,
  onDismiss,
  icon,
  className = ''
}: AlertProps) {
  return (
    <div className={`alert alert-${variant} ${className}`} role="alert">
      <div className="alert-content">
        {icon && <span className="alert-icon">{icon}</span>}
        <div className="alert-message">{children}</div>
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          className="alert-dismiss"
          aria-label="Cerrar alerta"
        >
          ×
        </button>
      )}
    </div>
  );
}
```

**Paso 5: Exportar todo desde index.ts**

```tsx
// src/components/ui/index.ts
export { Button } from './Button';
export { Input } from './Input';
export { Card } from './Card';
export { Badge } from './Badge';
export { Avatar } from './Avatar';
export { Alert } from './Alert';

export type { Size, Variant, Color, BaseComponentProps } from './types';
```

**Paso 6: Usar la biblioteca en componentes reales**

```tsx
// src/pages/RegistroUsuario.tsx
import { useState } from 'react';
import { Card, Input, Button, Alert } from '../components/ui';

function RegistroUsuario() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validar = () => {
    const newErrors: Record<string, string> = {};

    if (nombre.length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!email.includes('@')) {
      newErrors.email = 'Email inválido';
    }

    if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validar()) {
      setShowSuccess(true);
      // Aquí enviarías los datos a una API
    }
  };

  return (
    <Card header={<h2>Registro de Usuario</h2>}>
      {showSuccess && (
        <Alert
          variant="success"
          dismissible
          onDismiss={() => setShowSuccess(false)}
        >
          ¡Usuario registrado exitosamente!
        </Alert>
      )}

      <Input
        label="Nombre completo"
        value={nombre}
        onChange={setNombre}
        error={errors.nombre}
        required
      />

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        error={errors.email}
        required
      />

      <Input
        label="Contraseña"
        type="password"
        value={password}
        onChange={setPassword}
        error={errors.password}
        required
      />

      <Button
        label="Registrarse"
        variant="primary"
        onClick={handleSubmit}
      />
    </Card>
  );
}

export default RegistroUsuario;
```

**Resultado del workflow**: Sistema completo de componentes UI con:
- 6 componentes reutilizables (Button, Input, Card, Badge, Avatar, Alert)
- Types compartidos para consistencia
- Validación integrada en Input
- Accesibilidad completa (ARIA labels, roles, estados)
- Fácil de importar y usar: `import { Button, Input } from './components/ui'`

### Comandos Slash Útiles

Si configuraste custom commands para Claude Code:

- `/crear-componente [nombre]` - Genera boilerplate de componente con props interface
- `/extraer-componente` - Analiza código seleccionado y sugiere extracción
- `/documentar-props` - Genera documentación JSDoc para props del componente

### Tres Errores Comunes que Claude Code Previene

**Error 1: Props drilling (pasar props a través de muchos niveles)**

Código problemático:
```tsx
// App.tsx
function App() {
  const user = { name: 'Ana', email: 'ana@email.com' };
  return <Layout user={user} />;
}

// Layout.tsx
function Layout({ user }) {
  return <Sidebar user={user} />;
}

// Sidebar.tsx
function Sidebar({ user }) {
  return <UserInfo user={user} />;
}

// UserInfo.tsx
function UserInfo({ user }) {
  return <p>{user.name}</p>;
}
```

**Claude Code sugiere**: "Detecté que pasas `user` a través de 3 componentes solo para usarlo en el último. Considera usar Context API o extraer UserInfo a un nivel más alto."

**Error 2: Componentes demasiado genéricos o demasiado específicos**

Código problemático (demasiado específico):
```tsx
function BotonAzulPequenoPerfil() {
  return <button className="bg-blue-500 text-sm">Ver perfil</button>;
}

function BotonRojoGrandeEliminar() {
  return <button className="bg-red-500 text-lg">Eliminar</button>;
}

function BotonVerdeMedianoGuardar() {
  return <button className="bg-green-500 text-base">Guardar</button>;
}
```

**Claude Code sugiere**: "Estos 3 componentes hacen básicamente lo mismo. Te ayudo a crear un componente Button reutilizable:"

```tsx
interface ButtonProps {
  label: string;
  variant: 'primary' | 'danger' | 'success';
  size: 'small' | 'medium' | 'large';
  onClick: () => void;
}

function Button({ label, variant, size, onClick }: ButtonProps) {
  // Implementación única, múltiples usos
}
```

**Error 3: No documentar interfaces de props**

Código sin documentación:
```tsx
interface UserCardProps {
  user: User;
  onClick: (id: number) => void;
  showEmail: boolean;
  variant: string;
}
```

**Claude Code genera**:
```tsx
/**
 * Props para el componente UserCard
 */
interface UserCardProps {
  /** Objeto usuario con información completa */
  user: User;

  /** Callback ejecutado al hacer clic en la tarjeta */
  onClick: (id: number) => void;

  /** Si true, muestra el email del usuario */
  showEmail: boolean;

  /** Variante visual: 'compact' muestra versión resumida, 'full' muestra toda la info */
  variant: 'compact' | 'full';
}
```

Claude Code añade JSDoc comments que aparecen como tooltips en VS Code cuando usas el componente.

### Tabla Comparativa: Con vs Sin Claude Code

| Aspecto | Sin Claude Code | Con Claude Code |
|---------|----------------|----------------|
| **Crear componente nuevo** | 15-20 min escribiendo interface, lógica, estilos | 2-3 min con prompt, revisar y ajustar |
| **Extraer componente de código repetido** | Identificación manual, propenso a olvidar props | Análisis automático del patrón, extracción completa |
| **Definir tipos de props** | A menudo incompletos o demasiado permisivos (`any`) | Types precisos con union types y opcionales correctos |
| **Documentación de props** | Rara vez se hace, queda en "la haré después" | JSDoc generado automáticamente con descripciones |
| **Accesibilidad (ARIA)** | Olvidada en el 80% de componentes | Claude Code incluye ARIA labels, roles automáticamente |
| **Manejo de errores** | Validación básica o inexistente | Validación completa con estados de error |
| **Estilos** | CSS inconsistente, nombres inventados | Clases bien nombradas, estilos cohesivos |
| **Sistema de componentes** | Crece orgánicamente sin plan → caos | Estructura planificada y escalable desde el inicio |

**Insight clave**: Claude Code no solo escribe código más rápido, crea componentes MÁS ROBUSTOS de los que escribirías manualmente en el doble de tiempo.

---

## Concepto 1: ¿Qué son las props?

**Props** es la abreviatura de "properties" (propiedades en inglés). Son la forma en que pasas información de un componente padre a un componente hijo.

### Visualización: Componente padre e hijo

```
┌─────────────────── App (padre) ───────────────────┐
│                                                    │
│  "Quiero mostrar una tarjeta con el nombre Ana"   │
│                                                    │
│          ↓ (pasa props)                            │
│                                                    │
│   ┌────── Tarjeta (hijo) ──────┐                  │
│   │                             │                  │
│   │  Recibe: nombre = "Ana"     │                  │
│   │  Muestra: "Hola, soy Ana"   │                  │
│   │                             │                  │
│   └─────────────────────────────┘                  │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Ejemplo: Componente sin props vs. con props

**Sin props** (información fija, no reutilizable):
```tsx
function Saludo() {
  return <h1>Hola, Ana</h1>;
}

// Solo puedes mostrar "Hola, Ana" siempre
```

**Con props** (información dinámica, súper reutilizable):
```tsx
function Saludo(props) {
  return <h1>Hola, {props.nombre}</h1>;
}

// Ahora puedes usarlo así:
<Saludo nombre="Ana" />     // Muestra: "Hola, Ana"
<Saludo nombre="Luis" />    // Muestra: "Hola, Luis"
<Saludo nombre="María" />   // Muestra: "Hola, María"
```

**Nota importante**: Ves las llaves `{}` alrededor de `{props.nombre}`? Esas llaves le dicen a JSX: "Aquí viene código JavaScript, no texto literal". Es como decir "evalúa esta variable" en lugar de escribir literalmente "props.nombre".

---

## Concepto 2: Pasar y recibir props

Vamos a ver cómo se pasan props de padre a hijo paso a paso.

### Ejemplo: Componente Tarjeta con props

**Paso 1**: Crear el componente hijo que recibe props

Crea un archivo `src/TarjetaUsuario.tsx`:

```tsx
function TarjetaUsuario(props) {
  return (
    <div className="tarjeta">
      <h2>{props.nombre}</h2>
      <p>Edad: {props.edad} años</p>
      <p>Ciudad: {props.ciudad}</p>
    </div>
  );
}

export default TarjetaUsuario;
```

**Explicación línea por línea**:

- **Línea 1** (`function TarjetaUsuario(props) {`): El componente recibe un parámetro llamado `props`. Este parámetro es un objeto que contiene todas las propiedades que le pases.

- **Línea 3** (`<h2>{props.nombre}</h2>`): Accede a la propiedad `nombre` del objeto `props` y la muestra. Las llaves `{}` indican que es JavaScript, no texto.

- **Línea 4** (`<p>Edad: {props.edad} años</p>`): Muestra la prop `edad`. Puedes mezclar texto normal ("Edad: ") con props (`{props.edad}`).

- **Línea 5** (`<p>Ciudad: {props.ciudad}</p>`): Muestra la prop `ciudad`.

**En resumen**: `props` es un objeto con todas las propiedades. Si le pasas `nombre="Ana"`, entonces `props.nombre` será `"Ana"`.

**Paso 2**: Usar el componente hijo desde el padre

En `src/App.tsx`:

```tsx
import TarjetaUsuario from './TarjetaUsuario';

function App() {
  return (
    <div>
      <h1>Listado de usuarios</h1>
      <TarjetaUsuario
        nombre="Ana García"
        edad={28}
        ciudad="Madrid"
      />
    </div>
  );
}

export default App;
```

**Explicación línea por línea**:

- **Líneas 7-11** (`<TarjetaUsuario ... />`): Usas el componente como una etiqueta HTML. Cada atributo que pones (`nombre="Ana García"`, `edad={28}`, etc.) se convierte en una propiedad dentro del objeto `props`.

- **Línea 8** (`nombre="Ana García"`): Pasas una prop llamada `nombre` con el valor `"Ana García"` (texto).

- **Línea 9** (`edad={28}`): Pasas una prop llamada `edad` con el valor numérico `28`. Nota las llaves: se usan para valores que NO son texto (números, booleanos, variables, etc.).

- **Línea 10** (`ciudad="Madrid"`): Pasas una prop llamada `ciudad` con el valor `"Madrid"`.

**Resultado**: Verás en el navegador una tarjeta que muestra "Ana García", "Edad: 28 años" y "Ciudad: Madrid".

---

## Concepto 3: TypeScript e interfaces para props

Hasta ahora usamos `props` sin especificar qué propiedades debe tener. TypeScript nos permite ser más específicos y evitar errores.

### ¿Por qué usar interfaces con props?

Sin especificar el tipo de `props`, podrías cometer errores como:
- Olvidar pasar una prop necesaria
- Pasar una prop con el tipo equivocado (texto en lugar de número)
- Tener un typo en el nombre de la prop (`nomre` en lugar de `nombre`)

**Las interfaces son como contratos**: definen exactamente qué props debe recibir el componente y de qué tipo.

### Ejemplo: TarjetaUsuario con TypeScript

**Modifica `src/TarjetaUsuario.tsx`** para usar TypeScript:

```tsx
interface TarjetaUsuarioProps {
  nombre: string;
  edad: number;
  ciudad: string;
}

function TarjetaUsuario(props: TarjetaUsuarioProps) {
  return (
    <div className="tarjeta">
      <h2>{props.nombre}</h2>
      <p>Edad: {props.edad} años</p>
      <p>Ciudad: {props.ciudad}</p>
    </div>
  );
}

export default TarjetaUsuario;
```

**Explicación línea por línea**:

- **Líneas 1-4** (`interface TarjetaUsuarioProps { ... }`): Define una interface (un contrato) que especifica qué propiedades debe tener el objeto `props`:
  - `nombre` debe ser un `string` (texto)
  - `edad` debe ser un `number` (número)
  - `ciudad` debe ser un `string` (texto)

- **Línea 7** (`function TarjetaUsuario(props: TarjetaUsuarioProps)`): Especifica que el parámetro `props` debe cumplir con la interface `TarjetaUsuarioProps`. Ahora TypeScript verificará que recibas las props correctas.

**Beneficio**: Si en `App.tsx` te olvidas de pasar una prop, o pasas un tipo incorrecto, VS Code te mostrará un error ANTES de ejecutar el código:

```tsx
// ¡Error! Falta la prop 'ciudad'
<TarjetaUsuario nombre="Ana" edad={28} />

// ¡Error! 'edad' debe ser number, no string
<TarjetaUsuario nombre="Ana" edad="28" ciudad="Madrid" />
```

### Desestructuración de props (forma más limpia)

Hay una forma más elegante de trabajar con props usando **desestructuración**:

**En lugar de esto**:
```tsx
function TarjetaUsuario(props: TarjetaUsuarioProps) {
  return <h2>{props.nombre}</h2>;
}
```

**Puedes escribir esto** (más limpio):
```tsx
function TarjetaUsuario({ nombre, edad, ciudad }: TarjetaUsuarioProps) {
  return (
    <div className="tarjeta">
      <h2>{nombre}</h2>
      <p>Edad: {edad} años</p>
      <p>Ciudad: {ciudad}</p>
    </div>
  );
}
```

**Qué cambió**: En lugar de escribir `props.nombre`, `props.edad`, etc., extraes directamente las propiedades en los parámetros de la función. Ahora usas `nombre`, `edad`, `ciudad` directamente sin el `props.` delante.

Es como abrir una caja y sacar directamente lo que necesitas, en lugar de tener que decir "la caja punto nombre", "la caja punto edad".

---

## Práctica guiada: Componente de tarjeta de producto

Vamos a crear un componente reutilizable para mostrar productos de una tienda online. Lo usaremos 3 veces con diferentes productos.

### Paso 1 de 3: Crear el componente TarjetaProducto

**Lo que harás**:
1. Crear un nuevo archivo `src/TarjetaProducto.tsx`
2. Definir la interface para las props
3. Crear el componente que muestra la información del producto

**Tu código debería verse así** (`src/TarjetaProducto.tsx`):

```tsx
interface TarjetaProductoProps {
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
}

function TarjetaProducto({ nombre, precio, descripcion, imagen }: TarjetaProductoProps) {
  return (
    <div className="tarjeta-producto">
      <img src={imagen} alt={nombre} />
      <h3>{nombre}</h3>
      <p className="descripcion">{descripcion}</p>
      <p className="precio">${precio}</p>
    </div>
  );
}

export default TarjetaProducto;
```

**Explicación**:
- **Líneas 1-5**: Interface que define las 4 props necesarias (nombre, precio, descripción, imagen).
- **Línea 8**: Función componente con desestructuración de props.
- **Línea 11**: Etiqueta `<img>` que usa la prop `imagen` como `src` y `nombre` como texto alternativo.
- **Líneas 12-14**: Muestran nombre, descripción y precio usando las props.

**Checkpoint**: El componente está creado pero aún no se usa. Vamos al siguiente paso.

### Paso 2 de 3: Usar el componente múltiples veces

**Lo que harás**:
1. Importar `TarjetaProducto` en `App.tsx`
2. Usar el componente 3 veces con diferentes productos
3. Verificar que los 3 productos se muestran

**Modifica `src/App.tsx`**:

```tsx
import TarjetaProducto from './TarjetaProducto';

function App() {
  return (
    <div className="app">
      <h1>Nuestra tienda</h1>

      <TarjetaProducto
        nombre="Laptop Pro 15"
        precio={1299}
        descripcion="Laptop potente para desarrollo"
        imagen="https://via.placeholder.com/300x200"
      />

      <TarjetaProducto
        nombre="Mouse Inalámbrico"
        precio={29}
        descripcion="Mouse ergonómico con 6 botones"
        imagen="https://via.placeholder.com/300x200"
      />

      <TarjetaProducto
        nombre="Teclado Mecánico"
        precio={149}
        descripcion="Teclado retroiluminado RGB"
        imagen="https://via.placeholder.com/300x200"
      />
    </div>
  );
}

export default App;
```

**Explicación**:
- **Líneas 8-13**: Primer uso del componente con datos de una laptop.
- **Líneas 15-20**: Segundo uso del componente con datos de un mouse.
- **Líneas 22-27**: Tercer uso del componente con datos de un teclado.
- **Nota**: Usamos `https://via.placeholder.com/300x200` como imagen temporal (es un servicio que genera imágenes placeholder).

**Checkpoint**: Guarda y mira el navegador. Deberías ver 3 tarjetas, una debajo de la otra, cada una con información diferente.

### Paso 3 de 3: Añadir estilos atractivos

**Lo que harás**:
1. Añadir CSS para que las tarjetas se vean profesionales
2. Usar un layout de cuadrícula para que estén una al lado de la otra

**Añade esto a `src/index.css`**:

```css
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.app h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.tarjeta-producto {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 15px;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.tarjeta-producto:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.tarjeta-producto img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 15px;
}

.tarjeta-producto h3 {
  color: #2c3e50;
  margin: 10px 0;
}

.tarjeta-producto .descripcion {
  color: #666;
  font-size: 14px;
  margin: 10px 0;
}

.tarjeta-producto .precio {
  color: #27ae60;
  font-size: 24px;
  font-weight: bold;
  margin-top: 15px;
}
```

**Explicación de estilos clave**:
- **`.tarjeta-producto:hover`**: Cuando pasas el mouse sobre la tarjeta, se eleva ligeramente (`transform: translateY(-5px)`). Esto crea un efecto interactivo moderno.
- **`transition: transform 0.2s`**: Hace que el efecto de elevación sea suave, no brusco.
- **`object-fit: cover`**: Asegura que las imágenes se ajusten bien al contenedor sin deformarse.

**Checkpoint**: Las tarjetas ahora tienen bordes, sombras, y un efecto de elevación cuando pasas el mouse. Se ven profesionales.

---

## ⚠️ Errores comunes (y cómo solucionarlos)

### Error #1: "Property 'nombre' does not exist on type '{}'"

**Te pasa cuando**: Defines props en TypeScript pero no especificas el tipo correctamente.

**El mensaje de error que ves**:
```
Property 'nombre' does not exist on type '{}'
```

**Por qué pasa**: TypeScript no sabe qué propiedades tiene `props` porque no definiste una interface o no la aplicaste.

**Cómo se soluciona**:
1. Define una interface con todas las props:
```tsx
interface MisProps {
  nombre: string;
  edad: number;
}
```
2. Aplica la interface al parámetro `props`:
```tsx
function MiComponente(props: MisProps) { ... }
// O con desestructuración:
function MiComponente({ nombre, edad }: MisProps) { ... }
```

### Error #2: "Type 'string' is not assignable to type 'number'"

**Te pasa cuando**: Pasas una prop con el tipo incorrecto.

**El mensaje de error que ves**:
```
Type 'string' is not assignable to type 'number'
```

**Por qué pasa**: La interface dice que la prop debe ser un `number`, pero le pasaste un `string` (texto).

**Ejemplo que causa error**:
```tsx
// La interface dice: edad: number
<TarjetaUsuario nombre="Ana" edad="28" ciudad="Madrid" />
//                                    ^^^^
// Error: "28" es string, no number
```

**Cómo se soluciona**:
Usa llaves `{}` para valores numéricos:
```tsx
<TarjetaUsuario nombre="Ana" edad={28} ciudad="Madrid" />
//                                 ^^^^
// Correcto: 28 sin comillas es un number
```

**Regla general**:
- Texto: `nombre="Ana"` (con comillas, sin llaves)
- Números: `edad={28}` (sin comillas, con llaves)
- Booleanos: `activo={true}` (con llaves)
- Variables: `nombre={nombreVariable}` (con llaves)

### Error #3: "Missing props: 'ciudad'"

**Te pasa cuando**: Olvidas pasar una prop requerida.

**El mensaje de error que ves**:
```
Type '{ nombre: string; edad: number; }' is missing the following properties from type 'TarjetaUsuarioProps': ciudad
```

**Por qué pasa**: La interface dice que `ciudad` es obligatoria, pero no la pasaste.

**Cómo se soluciona**:

**Opción 1**: Pasa la prop que falta:
```tsx
<TarjetaUsuario nombre="Ana" edad={28} ciudad="Madrid" />
```

**Opción 2**: Si la prop es opcional, márcala como tal en la interface:
```tsx
interface TarjetaUsuarioProps {
  nombre: string;
  edad: number;
  ciudad?: string;  // El signo ? la hace opcional
}
```

Ahora puedes usarla sin esa prop:
```tsx
<TarjetaUsuario nombre="Ana" edad={28} />
```

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: Al principio es común confundir cuándo usar comillas y cuándo usar llaves. Memoriza esto: texto entre comillas sin llaves (`nombre="Ana"`), todo lo demás con llaves (`edad={28}`, `activo={true}`, `datos={miVariable}`).

> **Otro tip importante**: Las props fluyen en UNA sola dirección: de padre a hijo. Un componente hijo NO puede modificar las props que recibe. Las props son como un mensaje de solo lectura. Si necesitas que el hijo afecte al padre, lo veremos en lecciones futuras con funciones callback.

> **Sobre los nombres de interfaces**: Es convención nombrar las interfaces de props con el patrón `NombreComponenteProps`. Por ejemplo: `TarjetaUsuarioProps`, `BotonProps`, `ListaProductosProps`. Esto hace que sea obvio para qué sirve cada interface.

> **Desestructuración vs props**: Ambas formas funcionan igual. `props.nombre` es más explícito (ves claramente que viene de props). `{ nombre }` es más conciso (menos texto). En proyectos profesionales se usa más la desestructuración porque es más limpio.

---

## Tu turno: Ejercicio guiado

**Objetivo simple**: Crear un componente `TarjetaPelicula` que muestre información de películas y usarlo para crear una lista de 4 películas.

**Tiempo**: 25-30 minutos (15-20 min con Claude Code)

**Lo que necesitas antes de empezar**:
- [ ] Proyecto React funcionando (`npm run dev`)
- [ ] VS Code abierto
- [ ] Conocimiento de props y interfaces de la lección

### Instrucciones paso a paso

**Parte 1: Crear el componente** (10 min)

1. Crea un archivo `src/TarjetaPelicula.tsx`
2. Define una interface `TarjetaPeliculaProps` con estas propiedades:
   - `titulo` (string): Título de la película
   - `director` (string): Nombre del director
   - `año` (number): Año de estreno
   - `genero` (string): Género de la película
   - `calificacion` (number): Calificación de 1 a 10
3. Crea el componente `TarjetaPelicula` que:
   - Use desestructuración de props
   - Muestre toda la información en un `<div>` con clase `tarjeta-pelicula`
   - Incluya un `<h3>` para el título
   - Muestre el resto de información en párrafos `<p>`
   - La calificación debe mostrarse como "Calificación: 8.5/10"
4. Exporta el componente

**Parte 2: Usar el componente** (8 min)

1. Abre `src/App.tsx`
2. Importa `TarjetaPelicula`
3. Crea un `<div>` con clase `galeria-peliculas`
4. Dentro, usa el componente 4 veces con estas películas (o inventa las tuyas):
   - Inception (Christopher Nolan, 2010, Ciencia ficción, 8.8)
   - El Padrino (Francis Ford Coppola, 1972, Drama, 9.2)
   - Parasite (Bong Joon-ho, 2019, Thriller, 8.5)
   - Toy Story (John Lasseter, 1995, Animación, 8.3)

**Parte 3: Estilizar** (10 min)

1. Abre `src/index.css`
2. Añade estilos para `.galeria-peliculas` que:
   - Use `display: flex` y `flex-wrap: wrap` para crear un grid
   - Tenga `gap: 20px` para separar las tarjetas
   - Tenga `padding: 20px`
3. Añade estilos para `.tarjeta-pelicula` que:
   - Tenga `border`, `border-radius`, `padding` y `background-color`
   - Tenga `width: calc(50% - 10px)` para que quepan 2 por fila
   - Tenga un efecto hover que cambie el color de fondo
4. Estiliza el `.tarjeta-pelicula h3` con un color distintivo
5. Estiliza los elementos para que la calificación se vea destacada (color verde, negrita)

**Criterio de éxito**:
- [ ] Se muestran 4 tarjetas de películas en el navegador
- [ ] Cada tarjeta muestra título, director, año, género y calificación
- [ ] Las tarjetas están organizadas en 2 columnas
- [ ] Al pasar el mouse sobre una tarjeta, cambia visualmente
- [ ] La calificación se ve destacada (color verde y negrita)
- [ ] No hay errores en la consola ni errores de TypeScript en VS Code

**Desafío extra** (opcional):
1. Añade una prop `poster` (string con URL de imagen) a la interface
2. Muestra una imagen del poster en cada tarjeta (usa `https://via.placeholder.com/200x300` como placeholder)
3. Añade una prop opcional `visto` (boolean) que, si es `true`, muestre una etiqueta "Ya vista" en la esquina de la tarjeta

### Hazlo con Claude Code

Claude Code puede ayudarte a completar este ejercicio de forma más rápida y profesional. Aquí está cómo:

**Paso 1: Genera el componente completo**

Usa este prompt:
```
Crea un componente TarjetaPelicula en TypeScript React con:
- Props: titulo, director, año (number), genero, calificacion (number), poster (url string), visto (boolean opcional)
- Muestra toda la información en una tarjeta
- Si visto es true, muestra badge "Ya vista"
- Calificación como "X/10" destacada
- Estilos CSS con clase "tarjeta-pelicula"
- Export default
```

**Paso 2: Genera el App.tsx con las 4 películas**

```
Modifica App.tsx para usar TarjetaPelicula 4 veces con estas películas:
1. Inception (Christopher Nolan, 2010, Ciencia ficción, 8.8, visto: true)
2. El Padrino (Francis Ford Coppola, 1972, Drama, 9.2, visto: false)
3. Parasite (Bong Joon-ho, 2019, Thriller, 8.5, visto: true)
4. Toy Story (John Lasseter, 1995, Animación, 8.3, visto: false)

Usa flexbox con flex-wrap para grid responsive
```

**Paso 3: Genera los estilos CSS**

```
Crea estilos CSS para .tarjeta-pelicula con:
- Borde, border-radius, padding, sombra
- Width: 48% para 2 columnas
- Hover effect que eleva la tarjeta
- Calificación destacada en verde
- Badge "Ya vista" en esquina superior derecha si aplica
- Poster con height fija y object-fit cover
```

**Ventaja de Claude Code**: En 5-10 minutos tienes componente completo con TypeScript correcto, estilos profesionales, y accesibilidad incluida. Puedes dedicar el resto del tiempo a personalizar y aprender del código generado.

---

## Ejercicio Extra: Workflow con Claude Code

**Objetivo**: Crear un sistema de filtrado de películas por género usando los conceptos de props.

**Tiempo**: 20-25 minutos con Claude Code

**Instrucciones**:

1. Amplía tu componente `TarjetaPelicula` para que acepte una prop `onGeneroClick` que se ejecute al hacer clic en el género

2. Crea un componente `FiltroPeliculas` que:
   - Reciba un array de géneros disponibles como prop
   - Muestre botones para cada género
   - Tenga un prop `onFiltroSeleccionado` que se ejecute cuando se hace clic en un género

3. Modifica `App.tsx` para:
   - Mantener estado del género seleccionado
   - Filtrar las películas según el género activo
   - Pasar el callback de filtrado a los componentes hijos

**Prompt sugerido para Claude Code**:
```
Crea un sistema de filtrado de películas:

1. Componente FiltroPeliculas con props:
   - generos: string[]
   - generoActivo: string | null
   - onFiltroSeleccionado: (genero: string | null) => void
   - Muestra botones para cada género + botón "Todos"
   - Destaca visualmente el género activo

2. Modifica App.tsx para:
   - Estado: const [generoActivo, setGeneroActivo] = useState<string | null>(null)
   - Extraer géneros únicos del array de películas
   - Filtrar películas: const peliculasFiltradas = generoActivo ? peliculas.filter(p => p.genero === generoActivo) : peliculas
   - Mostrar FiltroPeliculas arriba del grid
   - Pasar callbacks apropiados

Usa TypeScript, estilos inline básicos
```

**Resultado esperado**:
- Sistema funcional de filtrado
- Props bien tipadas
- Comunicación padre-hijo mediante callbacks
- Demostración práctica de cómo las props permiten comunicación entre componentes

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **Las props son datos que pasas a componentes**: Las props permiten que un componente sea reutilizable con diferentes datos. Son como ingredientes que le pasas a una receta. El componente padre pasa props al hijo, y el hijo las recibe como un objeto.

2. **TypeScript hace las props más seguras**: Usando interfaces, defines exactamente qué props debe recibir un componente y de qué tipo. TypeScript te avisa si olvidas una prop o pasas el tipo incorrecto, evitando errores antes de ejecutar el código.

3. **Un componente, mil usos**: Con props, escribes un componente una sola vez y lo usas cuantas veces quieras con datos diferentes. Esto es el corazón de React: reutilización eficiente de código. Netflix usa un solo componente de tarjeta de película para mostrar miles de películas diferentes.

**Bonus - Claude Code**: Aprendiste cómo Claude Code acelera el desarrollo de componentes reutilizables generando interfaces TypeScript completas, extrayendo componentes de código repetitivo, y creando sistemas de componentes escalables con mejores prácticas de accesibilidad y documentación automáticamente incluidas.

---

## Siguiente paso

En la próxima lección: **"Estado y hooks en React"**. Aprenderás a hacer que tus componentes sean interactivos y puedan "recordar" información. Crearás botones que responden a clics, contadores que aumentan y disminuyen, y formularios que actualizan su contenido mientras escribes. Es cuando tus componentes cobran vida y dejan de ser estáticos.

---

**¿Dudas?** Las props son uno de los conceptos más importantes de React, así que es normal que tome tiempo dominarlas completamente. Si algo no te quedó claro, crea componentes simples y practica pasándoles diferentes props. Cambia los valores, añade nuevas props, experimenta. La mejor forma de aprender props es usándolas en la práctica. En unos días te parecerá tan natural como respirar.
