<p><strong><em>Estado y hooks: Haciendo componentes interactivos</em></strong></p>

## Introducción: De estático a dinámico

Hasta ahora has creado componentes que muestran información, pero son completamente estáticos. Es como tener una revista impresa: puedes leerla, pero no puedes interactuar con ella. ¿Qué pasaría si quisieras crear un contador que aumenta al hacer clic en un botón? ¿O un formulario donde el texto que escribes aparece en tiempo real en otro lugar? ¿O un botón que cambia de color al presionarlo?

Aquí es donde entra el **estado** (state en inglés). El estado es la memoria de tu componente, la forma en que React recuerda información que puede cambiar con el tiempo. Y para manejar el estado, usaremos nuestro primer **hook**: `useState`.

En esta lección transformarás tus componentes estáticos en aplicaciones interactivas que responden a las acciones del usuario. Es el momento en que tus componentes cobran vida.

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Entender qué es el estado**: Comprenderás el concepto de estado como la "memoria" de un componente que puede cambiar con el tiempo.
2. **Usar el hook useState**: Aprenderás a declarar estado en tus componentes usando el hook `useState` de React.
3. **Actualizar el estado**: Sabrás cómo modificar el estado en respuesta a eventos del usuario (clics, cambios en inputs, etc.).
4. **Crear componentes interactivos**: Construirás contadores, toggles y formularios simples que reaccionan a las acciones del usuario.

---

## ¿Por qué es importante el estado?

Imagina que estás jugando un videojuego. El juego necesita recordar tu puntuación, tu nivel, tu vida restante, qué items tienes en el inventario. Si el juego no pudiera recordar nada, cada vez que tocaras un botón todo volvería a cero. ¡Sería imposible jugar!

**El estado en React funciona igual**: es la memoria del componente. Le permite recordar información importante y actualizar la interfaz cuando esa información cambia.

### La analogía del semáforo

Piensa en un semáforo:
- **Estado actual**: Verde, amarillo o rojo
- **Evento**: Pasa el tiempo
- **Cambio de estado**: Verde → Amarillo → Rojo → Verde

El semáforo necesita "recordar" en qué color está para saber cuál mostrar a continuación. Esa memoria es el estado.

```
Estado: "verde"  →  Usuario hace clic  →  Estado: "amarillo"  →  La interfaz se actualiza
```

### 📊 Un dato interesante

El hook `useState` se introdujo en React en 2019 con los "Hooks". Antes de eso, manejar estado era mucho más complicado y requería clases en lugar de funciones. Los hooks revolucionaron React haciéndolo más simple y accesible. Hoy, el 95% de los desarrolladores React usan hooks en lugar del sistema antiguo.

---

## 🤖 Claude Code en Acción: Domina el Estado y los Hooks

El manejo de estado es donde los componentes React cobran vida y se vuelven interactivos. Claude Code es excepcionalmente bueno ayudándote con useState, useEffect y custom hooks porque puede analizar el flujo de datos de tu aplicación y sugerir la estructura de estado óptima.

### Por qué Claude Code brilla con hooks

Trabajar con estado requiere:
- **Decidir QUÉ estado necesitas** (ni demasiado ni poco)
- **Estructurar el estado eficientemente** (¿un objeto o varios estados?)
- **Actualizar estado correctamente** (inmutabilidad, actualizaciones basadas en valor previo)
- **Manejar efectos secundarios** (useEffect con dependencias correctas)
- **Evitar re-renders innecesarios**

Claude Code puede analizar tus componentes y sugerir la mejor arquitectura de estado, identificar problemas como dependencias faltantes en useEffect, y generar custom hooks reutilizables.

### Prompt 1: Implementar useState para formularios complejos

**Tu situación**: Necesitas un formulario de registro con múltiples campos y validación.

**Prompt efectivo**:
```
Crea un componente FormularioRegistro con useState para manejar:
- Campos: nombre, email, password, confirmPassword, aceptaTerminos
- Validación en tiempo real:
  * Nombre: mínimo 3 caracteres
  * Email: formato válido
  * Password: mínimo 6 caracteres, debe coincidir con confirmPassword
  * Términos: debe aceptarlos
- Muestra errores debajo de cada campo
- Botón deshabilitado si hay errores
- TypeScript con interfaces
```

**Código generado por Claude Code**:

```tsx
import { useState } from 'react';

interface FormData {
  nombre: string;
  email: string;
  password: string;
  confirmPassword: string;
  aceptaTerminos: boolean;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terminos?: string;
}

function FormularioRegistro() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    aceptaTerminos: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  // Validación
  const validar = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (formData.nombre.length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.aceptaTerminos) {
      newErrors.terminos = 'Debes aceptar los términos y condiciones';
    }

    return newErrors;
  };

  // Actualizar campo del formulario
  const handleChange = (campo: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const valor = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setFormData(prev => ({
      ...prev,
      [campo]: valor
    }));

    // Marcar como tocado
    setTouched(prev => new Set(prev).add(campo));
  };

  // Validar en cada cambio
  useState(() => {
    const newErrors = validar();
    setErrors(newErrors);
  });

  // Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validar();
    if (Object.keys(newErrors).length === 0) {
      console.log('Formulario válido:', formData);
      // Aquí enviarías los datos a una API
    } else {
      setErrors(newErrors);
      // Marcar todos como tocados para mostrar errores
      setTouched(new Set(Object.keys(formData)));
    }
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <form onSubmit={handleSubmit} className="formulario-registro">
      <h2>Registro de Usuario</h2>

      <div className="campo">
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          type="text"
          value={formData.nombre}
          onChange={handleChange('nombre')}
          className={errors.nombre && touched.has('nombre') ? 'error' : ''}
        />
        {errors.nombre && touched.has('nombre') && (
          <span className="error-message">{errors.nombre}</span>
        )}
      </div>

      <div className="campo">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          className={errors.email && touched.has('email') ? 'error' : ''}
        />
        {errors.email && touched.has('email') && (
          <span className="error-message">{errors.email}</span>
        )}
      </div>

      <div className="campo">
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange('password')}
          className={errors.password && touched.has('password') ? 'error' : ''}
        />
        {errors.password && touched.has('password') && (
          <span className="error-message">{errors.password}</span>
        )}
      </div>

      <div className="campo">
        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
        <input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          className={errors.confirmPassword && touched.has('confirmPassword') ? 'error' : ''}
        />
        {errors.confirmPassword && touched.has('confirmPassword') && (
          <span className="error-message">{errors.confirmPassword}</span>
        )}
      </div>

      <div className="campo">
        <label>
          <input
            type="checkbox"
            checked={formData.aceptaTerminos}
            onChange={handleChange('aceptaTerminos')}
          />
          Acepto los términos y condiciones
        </label>
        {errors.terminos && touched.has('aceptaTerminos') && (
          <span className="error-message">{errors.terminos}</span>
        )}
      </div>

      <button type="submit" disabled={!isValid}>
        Registrarse
      </button>
    </form>
  );
}

export default FormularioRegistro;
```

**Por qué este código es excelente**:
- Estado organizado en un objeto `FormData` (más fácil de manejar que 5 estados separados)
- Sistema de validación reutilizable con la función `validar()`
- Estado `touched` para mostrar errores solo después de que el usuario interactuó con el campo
- Función `handleChange` genérica que funciona para todos los campos
- Maneja correctamente inputs de texto y checkboxes
- Botón submit deshabilitado si hay errores
- TypeScript con interfaces claras

### Prompt 2: Usar useEffect para side effects

**Tu situación**: Quieres guardar el estado del formulario en localStorage automáticamente.

**Prompt efectivo**:
```
Modifica FormularioRegistro para:
1. Cargar datos desde localStorage al montar (useEffect)
2. Guardar cambios en localStorage automáticamente (useEffect que escucha formData)
3. Añadir botón "Limpiar" que borre formulario y localStorage
4. Mostrar mensaje "Autoguardado" cuando se guarda

Usa useEffect correctamente con dependencias
```

**Código generado por Claude Code**:

```tsx
import { useState, useEffect } from 'react';

function FormularioRegistro() {
  // ... estados anteriores ...

  const [autoguardado, setAutoguardado] = useState(false);

  // Efecto 1: Cargar desde localStorage al montar
  useEffect(() => {
    const datosGuardados = localStorage.getItem('formulario-registro');
    if (datosGuardados) {
      try {
        const parsed = JSON.parse(datosGuardados);
        setFormData(parsed);
      } catch (error) {
        console.error('Error al cargar datos guardados:', error);
      }
    }
  }, []); // Array vacío: se ejecuta solo al montar

  // Efecto 2: Guardar en localStorage cuando cambia formData
  useEffect(() => {
    // No guardar si el formulario está vacío (estado inicial)
    const estaVacio = Object.values(formData).every(v => !v);
    if (estaVacio) return;

    localStorage.setItem('formulario-registro', JSON.stringify(formData));

    // Mostrar mensaje de autoguardado
    setAutoguardado(true);
    const timer = setTimeout(() => setAutoguardado(false), 2000);

    // Cleanup: limpiar timeout si el componente se desmonta
    return () => clearTimeout(timer);
  }, [formData]); // Se ejecuta cuando formData cambia

  // Función para limpiar formulario y localStorage
  const limpiarFormulario = () => {
    setFormData({
      nombre: '',
      email: '',
      password: '',
      confirmPassword: '',
      aceptaTerminos: false
    });
    setErrors({});
    setTouched(new Set());
    localStorage.removeItem('formulario-registro');
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-registro">
      <div className="header">
        <h2>Registro de Usuario</h2>
        {autoguardado && (
          <span className="autoguardado">✓ Autoguardado</span>
        )}
      </div>

      {/* ... campos del formulario ... */}

      <div className="acciones">
        <button type="submit" disabled={!isValid}>
          Registrarse
        </button>
        <button
          type="button"
          onClick={limpiarFormulario}
          className="btn-secundario"
        >
          Limpiar
        </button>
      </div>
    </form>
  );
}

export default FormularioRegistro;
```

**Mejoras que Claude Code añadió**:
- `useEffect` con array vacío para cargar datos solo una vez
- `useEffect` con `formData` como dependencia para autoguardar
- Cleanup function en useEffect (limpiar timeout)
- Validación para no guardar formulario vacío
- Indicador visual de autoguardado con timeout
- Try-catch para manejar errores de JSON.parse

### Prompt 3: Crear custom hook reutilizable

**Tu situación**: Quieres reutilizar la lógica de formulario en múltiples componentes.

**Prompt efectivo**:
```
Extrae la lógica del formulario a un custom hook useForm que:
- Reciba valores iniciales y función de validación
- Retorne: values, errors, handleChange, handleSubmit, reset
- Maneje touched state automáticamente
- Sea reutilizable en cualquier formulario
- TypeScript genérico

Luego refactoriza FormularioRegistro para usarlo
```

**Código generado por Claude Code**:

```tsx
// hooks/useForm.ts
import { useState, useCallback } from 'react';

interface UseFormOptions<T> {
  initialValues: T;
  validate: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => void;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Set<keyof T>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Actualizar valor de campo
  const handleChange = useCallback((campo: keyof T) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const valor = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setValues(prev => ({
      ...prev,
      [campo]: valor
    }));

    setTouched(prev => new Set(prev).add(campo));

    // Validar después del cambio
    const newErrors = validate({
      ...values,
      [campo]: valor
    });
    setErrors(newErrors);
  }, [values, validate]);

  // Submit
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    // Marcar todos como touched
    setTouched(new Set(Object.keys(values) as (keyof T)[]));

    const newErrors = validate(values);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, validate, onSubmit]);

  // Reset
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched(new Set());
    setIsSubmitting(false);
  }, [initialValues]);

  // Helpers
  const getFieldProps = (campo: keyof T) => ({
    value: values[campo],
    onChange: handleChange(campo),
    className: errors[campo] && touched.has(campo) ? 'error' : ''
  });

  const getFieldError = (campo: keyof T) => {
    return touched.has(campo) ? errors[campo] : undefined;
  };

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleSubmit,
    reset,
    getFieldProps,
    getFieldError
  };
}

// Uso en FormularioRegistro.tsx
import { useForm } from './hooks/useForm';

interface RegistroData {
  nombre: string;
  email: string;
  password: string;
  confirmPassword: string;
  aceptaTerminos: boolean;
}

function FormularioRegistro() {
  const {
    values,
    errors,
    touched,
    isValid,
    handleSubmit,
    reset,
    getFieldProps,
    getFieldError
  } = useForm<RegistroData>({
    initialValues: {
      nombre: '',
      email: '',
      password: '',
      confirmPassword: '',
      aceptaTerminos: false
    },
    validate: (values) => {
      const errors: Partial<Record<keyof RegistroData, string>> = {};

      if (values.nombre.length < 3) {
        errors.nombre = 'El nombre debe tener al menos 3 caracteres';
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Email inválido';
      }

      if (values.password.length < 6) {
        errors.password = 'La contraseña debe tener al menos 6 caracteres';
      }

      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Las contraseñas no coinciden';
      }

      if (!values.aceptaTerminos) {
        errors.aceptaTerminos = 'Debes aceptar los términos';
      }

      return errors;
    },
    onSubmit: (values) => {
      console.log('Formulario enviado:', values);
      // Aquí enviarías a API
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro de Usuario</h2>

      <div className="campo">
        <label>Nombre</label>
        <input type="text" {...getFieldProps('nombre')} />
        {getFieldError('nombre') && (
          <span className="error-message">{getFieldError('nombre')}</span>
        )}
      </div>

      <div className="campo">
        <label>Email</label>
        <input type="email" {...getFieldProps('email')} />
        {getFieldError('email') && (
          <span className="error-message">{getFieldError('email')}</span>
        )}
      </div>

      <div className="campo">
        <label>Contraseña</label>
        <input type="password" {...getFieldProps('password')} />
        {getFieldError('password') && (
          <span className="error-message">{getFieldError('password')}</span>
        )}
      </div>

      <div className="campo">
        <label>Confirmar Contraseña</label>
        <input type="password" {...getFieldProps('confirmPassword')} />
        {getFieldError('confirmPassword') && (
          <span className="error-message">{getFieldError('confirmPassword')}</span>
        )}
      </div>

      <div className="campo">
        <label>
          <input
            type="checkbox"
            checked={values.aceptaTerminos}
            onChange={(e) => handleChange('aceptaTerminos')(e)}
          />
          Acepto los términos
        </label>
        {getFieldError('aceptaTerminos') && (
          <span className="error-message">{getFieldError('aceptaTerminos')}</span>
        )}
      </div>

      <button type="submit" disabled={!isValid}>
        Registrarse
      </button>
      <button type="button" onClick={reset}>
        Limpiar
      </button>
    </form>
  );
}
```

**Ventajas del custom hook**:
- Lógica de formulario 100% reutilizable
- TypeScript genérico (funciona con cualquier tipo de formulario)
- API limpia con helpers como `getFieldProps` y `getFieldError`
- Maneja automáticamente touched state y validación
- Puedes crear múltiples formularios diferentes usando el mismo hook

### Workflow Completo: Crear Gestor de Tareas con Estado Complejo

Vamos a crear una aplicación de gestión de tareas usando múltiples hooks para manejar estado complejo.

**Paso 1: Planificar el estado**

Prompt: "Necesito una app de tareas. Qué estado necesito?"

Claude Code sugiere:
```tsx
- tareas: Tarea[]  // Lista de tareas
- filtro: 'todas' | 'activas' | 'completadas'  // Filtro actual
- ordenPor: 'fecha' | 'prioridad'  // Ordenamiento
- busqueda: string  // Término de búsqueda
```

**Paso 2: Definir tipo Tarea**

```tsx
interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  completada: boolean;
  prioridad: 'baja' | 'media' | 'alta';
  fechaCreacion: Date;
  fechaVencimiento?: Date;
}
```

**Paso 3: Crear el componente principal**

Prompt: "Crea GestorTareas con estado para tareas, filtro, orden y búsqueda. Funciones para añadir, toggle completada, eliminar. useEffect para localStorage"

```tsx
import { useState, useEffect, useMemo } from 'react';

function GestorTareas() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [filtro, setFiltro] = useState<'todas' | 'activas' | 'completadas'>('todas');
  const [ordenPor, setOrdenPor] = useState<'fecha' | 'prioridad'>('fecha');
  const [busqueda, setBusqueda] = useState('');

  // Cargar tareas de localStorage
  useEffect(() => {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
      setTareas(JSON.parse(tareasGuardadas));
    }
  }, []);

  // Guardar tareas en localStorage
  useEffect(() => {
    if (tareas.length > 0) {
      localStorage.setItem('tareas', JSON.stringify(tareas));
    }
  }, [tareas]);

  // Añadir tarea
  const añadirTarea = (titulo: string, prioridad: Tarea['prioridad']) => {
    const nuevaTarea: Tarea = {
      id: crypto.randomUUID(),
      titulo,
      descripcion: '',
      completada: false,
      prioridad,
      fechaCreacion: new Date()
    };

    setTareas(prev => [...prev, nuevaTarea]);
  };

  // Toggle completada
  const toggleCompletada = (id: string) => {
    setTareas(prev =>
      prev.map(tarea =>
        tarea.id === id
          ? { ...tarea, completada: !tarea.completada }
          : tarea
      )
    );
  };

  // Eliminar tarea
  const eliminarTarea = (id: string) => {
    setTareas(prev => prev.filter(tarea => tarea.id !== id));
  };

  // Tareas filtradas y ordenadas (memoizadas)
  const tareasFiltradas = useMemo(() => {
    let resultado = tareas;

    // Filtrar por completadas/activas
    if (filtro === 'activas') {
      resultado = resultado.filter(t => !t.completada);
    } else if (filtro === 'completadas') {
      resultado = resultado.filter(t => t.completada);
    }

    // Filtrar por búsqueda
    if (busqueda) {
      resultado = resultado.filter(t =>
        t.titulo.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Ordenar
    if (ordenPor === 'fecha') {
      resultado.sort((a, b) =>
        b.fechaCreacion.getTime() - a.fechaCreacion.getTime()
      );
    } else {
      const prioridadValor = { alta: 3, media: 2, baja: 1 };
      resultado.sort((a, b) =>
        prioridadValor[b.prioridad] - prioridadValor[a.prioridad]
      );
    }

    return resultado;
  }, [tareas, filtro, busqueda, ordenPor]);

  return (
    <div className="gestor-tareas">
      <h1>Gestor de Tareas</h1>

      {/* Controles */}
      <div className="controles">
        <input
          type="text"
          placeholder="Buscar tareas..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select value={filtro} onChange={(e) => setFiltro(e.target.value as any)}>
          <option value="todas">Todas</option>
          <option value="activas">Activas</option>
          <option value="completadas">Completadas</option>
        </select>

        <select value={ordenPor} onChange={(e) => setOrdenPor(e.target.value as any)}>
          <option value="fecha">Por fecha</option>
          <option value="prioridad">Por prioridad</option>
        </select>
      </div>

      {/* Lista de tareas */}
      <div className="lista-tareas">
        {tareasFiltradas.map(tarea => (
          <div key={tarea.id} className="tarea-item">
            <input
              type="checkbox"
              checked={tarea.completada}
              onChange={() => toggleCompletada(tarea.id)}
            />
            <span className={tarea.completada ? 'completada' : ''}>
              {tarea.titulo}
            </span>
            <span className={`prioridad-${tarea.prioridad}`}>
              {tarea.prioridad}
            </span>
            <button onClick={() => eliminarTarea(tarea.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {/* Estadísticas */}
      <div className="estadisticas">
        <p>Total: {tareas.length}</p>
        <p>Activas: {tareas.filter(t => !t.completada).length}</p>
        <p>Completadas: {tareas.filter(t => t.completada).length}</p>
      </div>
    </div>
  );
}

export default GestorTareas;
```

**Paso 4: Extraer custom hook useLocalStorage**

Claude Code puede sugerir extraer la lógica de localStorage a un custom hook:

```tsx
// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// Uso simplificado:
const [tareas, setTareas] = useLocalStorage<Tarea[]>('tareas', []);
// Ya no necesitas useEffect manualmente
```

**Resultado del workflow**: Aplicación completa de gestión de tareas con:
- Estado complejo con múltiples useState
- useEffect para persistencia
- useMemo para optimización
- Custom hook useLocalStorage reutilizable
- Filtrado, ordenamiento y búsqueda funcionando

### Comandos Slash Útiles

- `/crear-hook [nombre]` - Genera boilerplate para custom hook
- `/analizar-estado` - Analiza componente y sugiere mejoras en estructura de estado
- `/agregar-useEffect` - Añade useEffect con dependencias correctas

### Tres Errores Comunes que Claude Code Previene

**Error 1: Dependencias incorrectas en useEffect**

Código problemático:
```tsx
function Component() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log('El contador es:', contador);
  }, []); // ❌ ERROR: falta 'contador' en dependencias
}
```

**Claude Code detecta**: "Detecté que usas `contador` dentro de useEffect pero no está en el array de dependencias. Esto puede causar valores obsoletos. Agrego `contador` a las dependencias."

Código corregido:
```tsx
useEffect(() => {
  console.log('El contador es:', contador);
}, [contador]); // ✅ CORRECTO
```

**Error 2: Actualizar estado basándose en valor previo incorrectamente**

Código problemático:
```tsx
function Contador() {
  const [count, setCount] = useState(0);

  const incrementar = () => {
    setCount(count + 1); // ❌ Puede causar problemas
    setCount(count + 1); // ❌ Ambas usan el mismo valor de count
  };
}
```

**Claude Code sugiere**: "Detecté múltiples actualizaciones de estado que dependen del valor anterior. Usa la forma funcional:"

```tsx
const incrementar = () => {
  setCount(prev => prev + 1); // ✅ CORRECTO
  setCount(prev => prev + 1); // ✅ Ahora sí suma 2
};
```

**Error 3: Crear demasiados estados cuando uno compuesto bastaría**

Código problemático:
```tsx
function UserProfile() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  // ❌ 7 estados separados, difícil de manejar
}
```

**Claude Code sugiere**: "Detecté múltiples estados relacionados. Consolídalos en un objeto:"

```tsx
interface UserData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
}

function UserProfile() {
  const [userData, setUserData] = useState<UserData>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: ''
  });

  const handleChange = (campo: keyof UserData) => (valor: string) => {
    setUserData(prev => ({ ...prev, [campo]: valor }));
  };
  // ✅ Mucho más limpio y fácil de manejar
}
```

### Tabla Comparativa: Con vs Sin Claude Code

| Aspecto | Sin Claude Code | Con Claude Code |
|---------|----------------|----------------|
| **Diseñar estructura de estado** | 10-15 min pensando qué estados necesitas | 2 min: Claude analiza requisitos y sugiere estructura óptima |
| **Implementar formulario con validación** | 30-40 min codificando validaciones manualmente | 5-10 min con prompt, validaciones completas generadas |
| **Crear custom hook** | 20-25 min extrayendo lógica, propenso a errores | 5 min con prompt, hook genérico y reutilizable |
| **Dependencias de useEffect** | Advertencias de ESLint que ignoras o arreglas mal | Claude añade dependencias correctas automáticamente |
| **Optimización con useMemo** | Raramente lo usas (no sabes dónde aplicarlo) | Claude identifica cálculos costosos y sugiere useMemo |
| **Manejo de formularios** | Código repetitivo en cada formulario | Custom hook useForm reutilizable en todos |
| **localStorage sync** | Olvidas guardar o cargar, bugs difíciles de detectar | useEffect configurado correctamente con cleanup |
| **Inmutabilidad en updates** | Mutaciones accidentales (ej: `state.push()`) | Siempre usa spread operator correctamente |

**Insight clave**: Claude Code no solo escribe hooks más rápido, diseña MEJOR arquitectura de estado que la mayoría de desarrolladores escribirían manualmente.

---

## Concepto 1: ¿Qué es el estado?

**El estado es información que un componente recuerda y que puede cambiar con el tiempo**. Cuando el estado cambia, React automáticamente vuelve a renderizar (redibujar) el componente para reflejar el nuevo estado en la pantalla.

### Estado vs. Props: ¿Cuál es la diferencia?

Es importante entender la diferencia:

| **Props** | **Estado** |
|-----------|-----------|
| Vienen del componente padre | Viven dentro del componente |
| Son de solo lectura (no se pueden modificar) | Se pueden modificar |
| Como argumentos de una función | Como variables que puedes cambiar |
| Ejemplo: `<Saludo nombre="Ana" />` | Ejemplo: Contador que aumenta |

**Analogía simple**:
- **Props**: Son como los ingredientes que te dan para cocinar (no los puedes cambiar, solo usarlos).
- **Estado**: Es como el progreso de tu receta (va cambiando conforme cocinas).

### Visualización: Componente con estado

```
┌──────── Componente Contador ────────┐
│                                      │
│  Estado: contador = 5                │  ← Memoria del componente
│                                      │
│  Interfaz: "Has hecho clic 5 veces"  │  ← Lo que se muestra
│                                      │
│  [Botón: Incrementar]                │  ← Usuario hace clic
│                                      │
│         ↓ (evento clic)              │
│                                      │
│  Estado: contador = 6                │  ← Estado actualizado
│  Interfaz se actualiza automática-   │
│  mente a: "Has hecho clic 6 veces"   │
│                                      │
└──────────────────────────────────────┘
```

---

## Concepto 2: El hook useState

**Un hook es una función especial de React que te da superpoderes**. El hook `useState` es el más básico y te permite añadir estado a tus componentes.

### ¿Por qué se llama "hook"?

En inglés, "hook" significa gancho. Los hooks "enganchan" funcionalidades de React a tus componentes. `useState` engancha la capacidad de recordar información.

**Todos los hooks empiezan con "use"**: `useState`, `useEffect`, `useContext`, etc. Es fácil identificarlos.

### Sintaxis básica de useState

```tsx
const [variable, setVariable] = useState(valorInicial);
```

Esto puede verse raro al principio. Vamos a desglosarlo:

**Ejemplo concreto**:
```tsx
const [contador, setContador] = useState(0);
```

**Explicación parte por parte**:

1. **`useState(0)`**: Llamas a la función `useState` con el valor inicial (en este caso `0`). Este es el valor que tendrá la variable al inicio.

2. **`[contador, setContador]`**: `useState` retorna un array con DOS cosas:
   - **Posición 0** (`contador`): La variable que contiene el valor actual del estado.
   - **Posición 1** (`setContador`): Una función que usas para actualizar el estado.

3. **`const [contador, setContador] =`**: Esto es "desestructuración de array". Extraes las dos cosas que retorna `useState` y les das nombres.

**Analogía del cajón con candado**:
- `contador`: Es mirar dentro del cajón para ver qué hay.
- `setContador`: Es la ÚNICA llave que puede abrir el cajón y cambiar su contenido.
- `useState(0)`: Crea el cajón con un valor inicial de `0` dentro.

### Ejemplo completo: Contador simple

Crea un archivo `src/Contador.tsx`:

```tsx
import { useState } from 'react';

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <p>Has hecho clic {contador} veces</p>
      <button onClick={() => setContador(contador + 1)}>
        Incrementar
      </button>
    </div>
  );
}

export default Contador;
```

**Explicación línea por línea**:

- **Línea 1** (`import { useState } from 'react';`): Importa el hook `useState` desde React. Las llaves `{}` indican que importas una exportación nombrada (no es el export default).

- **Línea 4** (`const [contador, setContador] = useState(0);`): Crea una variable de estado llamada `contador` con valor inicial `0`, y una función `setContador` para actualizarla.

- **Línea 8** (`<p>Has hecho clic {contador} veces</p>`): Muestra el valor actual de `contador`.

- **Línea 9** (`onClick={() => setContador(contador + 1)}`): Cuando se hace clic en el botón:
  - `onClick`: Prop especial que ejecuta una función cuando se hace clic.
  - `() => ...`: Arrow function (función flecha) que se ejecuta al hacer clic.
  - `setContador(contador + 1)`: Actualiza el estado sumándole 1 al valor actual.

**Resultado**: Cada vez que haces clic en el botón, el número aumenta en 1. React automáticamente actualiza la interfaz.

---

## Concepto 3: Actualizar el estado correctamente

Hay reglas importantes al actualizar el estado. Romper estas reglas puede causar bugs difíciles de encontrar.

### Regla #1: NUNCA modifiques el estado directamente

**INCORRECTO** (esto NO funciona):
```tsx
const [contador, setContador] = useState(0);

// ❌ MAL: Intentar cambiar el estado directamente
contador = contador + 1;  // ¡No funciona! React no se entera del cambio
```

**CORRECTO**:
```tsx
const [contador, setContador] = useState(0);

// ✅ BIEN: Usar la función set para actualizar
setContador(contador + 1);  // React detecta el cambio y actualiza la interfaz
```

**Por qué**: React necesita que uses la función `set` para saber que el estado cambió. Si modificas la variable directamente, React no se entera y no actualiza la pantalla.

### Regla #2: El estado es asíncrono

Cuando actualizas el estado, el cambio no es inmediato. React lo programa para después.

**Ejemplo que confunde**:
```tsx
const [contador, setContador] = useState(0);

function incrementar() {
  setContador(contador + 1);
  console.log(contador);  // ¡Todavía muestra el valor VIEJO!
}
```

**Por qué**: `console.log` se ejecuta inmediatamente después de llamar `setContador`, pero React aún no ha actualizado el valor. El nuevo valor estará disponible en el siguiente renderizado.

**No te preocupes por esto ahora**: Solo recuerda que el estado se actualiza "eventualmente", no al instante.

### Regla #3: Usa la forma funcional para actualizar basándote en el valor anterior

Si el nuevo estado depende del estado anterior, usa una función:

**Forma básica** (funciona en casos simples):
```tsx
setContador(contador + 1);
```

**Forma funcional** (más segura, especialmente para múltiples actualizaciones):
```tsx
setContador(prevContador => prevContador + 1);
```

La forma funcional recibe el valor anterior como parámetro y retorna el nuevo valor.

**Cuándo usar cuál**: Para este curso, la forma básica es suficiente. La forma funcional es importante en casos avanzados que veremos más adelante.

---

## Práctica guiada: Componentes interactivos

Vamos a crear tres componentes interactivos diferentes para practicar `useState` en distintas situaciones.

### Paso 1 de 3: Contador con incremento y decremento

**Lo que harás**:
1. Crear un componente que tenga un contador
2. Añadir botones para incrementar, decrementar y resetear
3. Verificar que funciona correctamente

**Crea el archivo `src/ContadorCompleto.tsx`**:

```tsx
import { useState } from 'react';

function ContadorCompleto() {
  const [contador, setContador] = useState(0);

  return (
    <div className="contador">
      <h2>Contador: {contador}</h2>
      <button onClick={() => setContador(contador + 1)}>
        + Incrementar
      </button>
      <button onClick={() => setContador(contador - 1)}>
        - Decrementar
      </button>
      <button onClick={() => setContador(0)}>
        Resetear
      </button>
    </div>
  );
}

export default ContadorCompleto;
```

**Explicación**:
- **Línea 4**: Estado inicial en `0`.
- **Línea 8**: Muestra el valor actual del contador.
- **Líneas 9-11**: Botón que suma 1.
- **Líneas 12-14**: Botón que resta 1.
- **Líneas 15-17**: Botón que resetea a 0.

**Checkpoint**: Importa este componente en `App.tsx` y úsalo. Los tres botones deben funcionar correctamente.

### Paso 2 de 3: Toggle (mostrar/ocultar contenido)

**Lo que harás**:
1. Crear un componente con un estado booleano (verdadero/falso)
2. Un botón que alterna entre mostrar y ocultar contenido
3. Usar renderizado condicional

**Crea el archivo `src/Toggle.tsx`**:

```tsx
import { useState } from 'react';

function Toggle() {
  const [mostrar, setMostrar] = useState(false);

  return (
    <div className="toggle">
      <button onClick={() => setMostrar(!mostrar)}>
        {mostrar ? 'Ocultar' : 'Mostrar'} contenido
      </button>

      {mostrar && (
        <div className="contenido">
          <p>¡Este contenido se puede mostrar y ocultar!</p>
          <p>Presiona el botón de nuevo para ocultarme.</p>
        </div>
      )}
    </div>
  );
}

export default Toggle;
```

**Explicación línea por línea**:

- **Línea 4** (`const [mostrar, setMostrar] = useState(false);`): Estado booleano que empieza en `false` (oculto).

- **Línea 8** (`onClick={() => setMostrar(!mostrar)}`): Al hacer clic, invierte el valor. Si era `true` se vuelve `false`, y viceversa. El operador `!` significa "NOT" (lo contrario).

- **Línea 9** (`{mostrar ? 'Ocultar' : 'Mostrar'}`): Operador ternario. Si `mostrar` es `true`, muestra "Ocultar", si no, muestra "Mostrar".

- **Líneas 12-17** (`{mostrar && ( ... )}`): Renderizado condicional. Solo renderiza el contenido si `mostrar` es `true`. El operador `&&` significa "Y": si `mostrar` es verdadero, renderiza lo que sigue.

**Checkpoint**: El botón debe cambiar su texto entre "Mostrar" y "Ocultar", y el contenido debe aparecer/desaparecer al hacer clic.

### Paso 3 de 3: Input controlado (formulario simple)

**Lo que harás**:
1. Crear un input donde el usuario puede escribir
2. El estado guarda lo que el usuario escribe
3. Mostrar el texto en tiempo real en otro lugar

**Crea el archivo `src/Formulario.tsx`**:

```tsx
import { useState } from 'react';

function Formulario() {
  const [nombre, setNombre] = useState('');

  return (
    <div className="formulario">
      <h3>Escribe tu nombre:</h3>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Escribe aquí..."
      />
      <p>Hola, {nombre || 'desconocido'}!</p>
    </div>
  );
}

export default Formulario;
```

**Explicación línea por línea**:

- **Línea 4** (`const [nombre, setNombre] = useState('');`): Estado inicial es una cadena vacía `''`.

- **Línea 11** (`value={nombre}`): El valor del input está controlado por el estado. Esto lo convierte en un "componente controlado".

- **Línea 12** (`onChange={(e) => setNombre(e.target.value)}`):
  - `onChange`: Se ejecuta cada vez que el usuario escribe algo.
  - `e`: Objeto evento que contiene información sobre el cambio.
  - `e.target.value`: El nuevo valor del input (lo que el usuario escribió).
  - `setNombre(e.target.value)`: Actualiza el estado con el nuevo valor.

- **Línea 15** (`{nombre || 'desconocido'}`): Si `nombre` está vacío, muestra "desconocido". El operador `||` significa "O": usa `nombre` si existe, si no usa `'desconocido'`.

**Checkpoint**: Mientras escribes en el input, el texto "Hola, [tu nombre]!" debe actualizarse en tiempo real.

**Añade estilos en `src/index.css`**:

```css
.contador, .toggle, .formulario {
  border: 2px solid #3498db;
  border-radius: 8px;
  padding: 20px;
  margin: 20px;
  max-width: 400px;
}

.contador h2 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.contador button, .toggle button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.contador button:hover, .toggle button:hover {
  background-color: #2980b9;
}

.toggle .contenido {
  margin-top: 15px;
  padding: 15px;
  background-color: #ecf0f1;
  border-radius: 5px;
}

.formulario input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #bdc3c7;
  border-radius: 5px;
  margin: 10px 0;
}

.formulario input:focus {
  outline: none;
  border-color: #3498db;
}

.formulario p {
  font-size: 18px;
  color: #27ae60;
  font-weight: bold;
}
```

---

## ⚠️ Errores comunes (y cómo solucionarlos)

### Error #1: "Too many re-renders. React limits the number of renders to prevent an infinite loop"

**Te pasa cuando**: Llamas a la función de actualización del estado directamente en el render (sin un evento).

**El mensaje de error que ves**:
```
Too many re-renders. React limits the number of renders to prevent an infinite loop
```

**Ejemplo que causa error**:
```tsx
function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <button onClick={setContador(contador + 1)}>
        {/* ❌ ERROR: Esto ejecuta setContador inmediatamente */}
        Incrementar
      </button>
    </div>
  );
}
```

**Por qué pasa**: Estás llamando a `setContador(contador + 1)` inmediatamente, no cuando se hace clic. Esto crea un bucle infinito: actualiza estado → componente se re-renderiza → actualiza estado → componente se re-renderiza → infinitamente.

**Cómo se soluciona**:
Envuelve la actualización en una función:
```tsx
<button onClick={() => setContador(contador + 1)}>
  {/* ✅ CORRECTO: Arrow function que se ejecuta al hacer clic */}
  Incrementar
</button>
```

### Error #2: "Cannot read property 'value' of undefined"

**Te pasa cuando**: Intentas acceder a `e.target.value` pero el evento no existe o está mal escrito.

**El mensaje de error que ves**:
```
Cannot read property 'value' of undefined
```

**Ejemplo que causa error**:
```tsx
<input onChange={(event) => setNombre(e.target.value)} />
{/* ❌ ERROR: El parámetro se llama 'event' pero usas 'e' */}
```

**Cómo se soluciona**:
Asegúrate de que el nombre del parámetro coincide:
```tsx
<input onChange={(e) => setNombre(e.target.value)} />
{/* ✅ CORRECTO: Usas el mismo nombre 'e' */}
```

### Error #3: "React Hook 'useState' is called conditionally"

**Te pasa cuando**: Usas `useState` dentro de un `if`, loop, o función anidada.

**El mensaje de error que ves**:
```
React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every component render
```

**Ejemplo que causa error**:
```tsx
function MiComponente() {
  if (algunaCondicion) {
    const [estado, setEstado] = useState(0);  // ❌ ERROR
  }
}
```

**Por qué pasa**: Los hooks DEBEN llamarse siempre en el mismo orden en cada render. No pueden estar dentro de condiciones o loops.

**Cómo se soluciona**:
Llama a los hooks en el nivel superior de la función:
```tsx
function MiComponente() {
  const [estado, setEstado] = useState(0);  // ✅ CORRECTO

  if (algunaCondicion) {
    // Usa el estado aquí si es necesario
  }
}
```

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: El error más común es escribir `onClick={setContador(contador + 1)}` sin las llaves de arrow function. Recuerda: `onClick` espera una FUNCIÓN, no el resultado de ejecutar una función. Usa `onClick={() => setContador(contador + 1)}` para darle una función que se ejecutará después, no ahora.

> **Otro tip importante**: Nombra tus funciones `set` de forma consistente. Si el estado se llama `contador`, la función debe ser `setContador`. Si el estado es `nombre`, la función es `setNombre`. Esta convención hace que el código sea más fácil de leer.

> **Sobre inputs controlados**: Un input controlado (donde `value={estado}`) siempre refleja el estado de React, no el DOM del navegador. Esto te da control total sobre el input. Si no pones `onChange`, el input será de solo lectura porque el estado nunca cambia.

> **Debugging del estado**: Si no sabes por qué el estado no se actualiza, añade un `console.log` justo después de llamar la función set, pero recuerda que el valor NO habrá cambiado aún (es asíncrono). Para ver el nuevo valor, usa `console.log(nuevoValor)` antes de pasarlo a la función set.

---

## Tu turno: Ejercicio guiado

**Objetivo simple**: Crear un componente "ListaTareas" donde puedas añadir tareas a una lista, marcarlas como completadas y eliminarlas.

**Tiempo**: 30-35 minutos (15-20 min con Claude Code)

**Lo que necesitas antes de empezar**:
- [ ] Proyecto React funcionando
- [ ] Conocimiento de `useState` de esta lección
- [ ] Conocimiento de arrays en JavaScript (módulo 2)

### Instrucciones paso a paso

**Parte 1: Estructura básica** (12 min)

1. Crea un archivo `src/ListaTareas.tsx`
2. Importa `useState`
3. Define DOS estados:
   - `tareas`: Un array de strings (empieza vacío: `[]`)
   - `nuevaTarea`: Un string (empieza vacío: `''`)
4. Crea un formulario con:
   - Un input controlado conectado a `nuevaTarea`
   - Un botón que añada la tarea al array `tareas` (usa `setTareas([...tareas, nuevaTarea])`)
   - Después de añadir, resetea `nuevaTarea` a cadena vacía
5. Muestra la lista de tareas usando `.map()`:
```tsx
<ul>
  {tareas.map((tarea, index) => (
    <li key={index}>{tarea}</li>
  ))}
</ul>
```

**Parte 2: Funcionalidad de eliminar** (10 min)

1. Añade un botón "Eliminar" al lado de cada tarea
2. Cuando se haga clic, elimina esa tarea del array
3. Pista: Usa `filter` para crear un nuevo array sin ese elemento:
```tsx
const eliminarTarea = (indexEliminar) => {
  setTareas(tareas.filter((_, index) => index !== indexEliminar));
};
```
4. Conecta el botón: `onClick={() => eliminarTarea(index)}`

**Parte 3: Mejorar UX** (10 min)

1. Evita que se añadan tareas vacías (usa un `if` para verificar que `nuevaTarea.trim() !== ''`)
2. Añade un mensaje cuando no hay tareas: "No hay tareas. ¡Añade una!"
3. Cambia el botón "Añadir" por un formulario real que funcione con Enter:
```tsx
<form onSubmit={(e) => { e.preventDefault(); añadirTarea(); }}>
  {/* input y botón aquí */}
</form>
```
4. Estiliza la lista para que se vea bien (bordes, padding, colores)

**Criterio de éxito**:
- [ ] Puedes escribir una tarea y añadirla a la lista (con botón o Enter)
- [ ] Las tareas aparecen en una lista
- [ ] Cada tarea tiene un botón "Eliminar" que funciona
- [ ] No se pueden añadir tareas vacías
- [ ] Muestra un mensaje cuando la lista está vacía
- [ ] La interfaz se ve limpia y ordenada

**Desafío extra** (opcional):
1. Añade una tercera variable de estado para llevar la cuenta de cuántas tareas has completado en total (no solo las actuales)
2. Cambia el array de strings por un array de objetos: `{ texto: string, completada: boolean }`
3. Añade un checkbox que marque la tarea como completada (y cambie el estilo del texto a tachado)
4. Muestra contadores: "X tareas pendientes, Y tareas completadas"

### Hazlo con Claude Code

**Prompt para crear el componente completo**:
```
Crea componente ListaTareas en React TypeScript con:
- Estado: tareas (array de objetos {id: string, texto: string, completada: boolean}), nuevaTarea (string)
- Funciones: añadirTarea (valida que no esté vacía), toggleCompletada, eliminarTarea
- Input controlado para nueva tarea con botón Añadir
- Lista renderizada con .map(), checkbox para completar, botón eliminar
- Estilos: texto tachado si completada
- Muestra mensaje "No hay tareas" si array vacío
- Evita tareas vacías con trim()
- Form con onSubmit para añadir con Enter
```

**Prompt para el desafío extra**:
```
Mejora ListaTareas agregando:
1. Estado contadorTotal para tareas completadas en total (persiste aunque se eliminen)
2. Cuando se marca como completada, incrementa contadorTotal
3. Muestra al final: "Tareas activas: X | Completadas: Y | Total completadas históricas: Z"
4. useEffect para guardar en localStorage: tareas y contadorTotal
5. useEffect para cargar desde localStorage al montar
```

---

## Ejercicio Extra: Custom Hook useTaskManager

**Objetivo**: Extraer toda la lógica de gestión de tareas a un custom hook reutilizable.

**Prompt para Claude Code**:
```
Crea custom hook useTaskManager que:
- Reciba initialTasks (opcional)
- Retorne: { tasks, addTask, toggleTask, deleteTask, stats }
- stats incluya: total, active, completed
- Maneje localStorage automáticamente
- TypeScript con interface Task
- Use useCallback para funciones

Luego refactoriza ListaTareas para usar el hook
```

**Resultado esperado**: Hook reutilizable que puedas usar en cualquier componente que necesite gestión de tareas.

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **El estado es la memoria del componente**: Con `useState` puedes hacer que tus componentes recuerden información que cambia con el tiempo. El estado permite crear interfaces interactivas que responden a las acciones del usuario.

2. **useState retorna un par: [valor, setValor]**: La primera posición es el valor actual del estado, la segunda es la función para actualizarlo. NUNCA modifiques el estado directamente, siempre usa la función `set`. React detecta los cambios y actualiza automáticamente la interfaz.

3. **Eventos conectan acciones del usuario con cambios de estado**: Usas `onClick`, `onChange`, `onSubmit` para responder a acciones del usuario. Estos eventos ejecutan funciones que actualizan el estado, lo que hace que la interfaz se actualice. Es el ciclo básico de interactividad en React.

**Bonus - Claude Code**: Aprendiste cómo Claude Code acelera el desarrollo con hooks generando formularios completos con validación, creando custom hooks reutilizables, configurando useEffect con dependencias correctas automáticamente, y diseñando estructuras de estado óptimas que previenen errores comunes como dependencias faltantes o actualizaciones de estado incorrectas.

---

## Siguiente paso

En la próxima lección: **"Integración con APIs"**. Aprenderás a conectar tu aplicación React con servicios externos para obtener datos reales (usuarios, productos, posts, etc.). Usarás el hook `useEffect` para cargar datos cuando el componente se monta, y mostrarás estados de carga mientras esperas la respuesta. Es cuando tu app pasa de usar datos inventados a datos reales de internet.

---

**¿Dudas?** El estado es uno de los conceptos más importantes de React, y `useState` es el primer hook que todo desarrollador React debe dominar. Es normal que al principio te confundas con cuándo usar llaves, cómo actualizar el estado correctamente, o por qué el estado no cambia inmediatamente. La práctica es clave: crea componentes simples con estado (contadores, formularios, toggles) hasta que te sientas cómodo. En una semana, usar `useState` será tan natural como declarar variables.

