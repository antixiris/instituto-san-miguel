<p><strong><em>Integración con APIs: Conectando con el mundo real</em></strong></p>

## Introducción: De datos inventados a datos reales

Hasta ahora has trabajado con datos que tú mismo escribiste en el código: nombres, edades, productos inventados. Pero en el mundo real, las aplicaciones obtienen información de servicios externos a través de internet. Cuando abres Instagram, no tiene tus fotos guardadas en el código de la app; las pide a un servidor. Cuando buscas en Google, los resultados vienen de una base de datos gigante, no del código de la página.

En esta lección aprenderás a conectar tu aplicación React con APIs (servicios que proveen datos a través de internet). Usarás el hook `useEffect` para cargar datos cuando el componente se monta en la pantalla, mostrarás un mensaje de "Cargando..." mientras esperas la respuesta, y manejarás errores si algo sale mal.

Es el momento en que tu aplicación deja de ser un proyecto de práctica y empieza a comportarse como una aplicación real que consume datos en vivo.

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Entender qué es una API**: Comprenderás el concepto de API REST y cómo las aplicaciones web se comunican con servidores para obtener datos.
2. **Usar el hook useEffect**: Aprenderás a ejecutar código cuando el componente se monta, ideal para cargar datos al inicio.
3. **Hacer peticiones HTTP con fetch**: Sabrás cómo pedir datos a una API usando la función `fetch` de JavaScript.
4. **Manejar estados de carga y error**: Mostrarás indicadores de carga mientras esperas datos y mensajes de error si algo falla.

---

## ¿Por qué es importante trabajar con APIs?

Imagina que tienes un restaurante. Tú cocinas (tu frontend React), pero los ingredientes no los produces tú; los pides a proveedores (APIs). Cuando necesitas tomates, llamas al proveedor, esperas la entrega, y cuando llegan, cocinas con ellos.

**Las APIs funcionan igual**: tu app React es la cocina, las APIs son los proveedores de ingredientes (datos). Tu app hace pedidos (peticiones HTTP), espera la respuesta, y cuando llegan los datos, los muestra en la interfaz.

### La analogía del restaurante y el menú

Piensa en una API como el menú de un restaurante:
- **Menú (API)**: Lista de platos (endpoints) disponibles
- **Pedir un plato (HTTP request)**: Haces un pedido específico
- **Esperar (loading)**: El chef cocina (el servidor procesa)
- **Recibir el plato (response)**: Te traen la comida (los datos)
- **Si falta un ingrediente (error)**: Te avisan que no pueden prepararlo

```
Tu app React → Hace pedido: "Dame la lista de usuarios"
     ↓
API (servidor) → "Ok, aquí está la lista"
     ↓
Tu app React → Recibe datos y los muestra en pantalla
```

### 📊 Un dato interesante

El 99% de las aplicaciones web modernas consumen APIs. Ninguna app almacena todos sus datos en el código frontend; sería imposible de mantener y actualizar. Las APIs permiten que miles de apps (web, móvil, smartwatches) accedan a los mismos datos actualizados en tiempo real. Netflix tiene una sola API que sirve datos a su app web, sus apps de iOS/Android, sus apps de Smart TV, etc.

---

## Concepto 1: ¿Qué es una API?

**API significa "Application Programming Interface"** (Interfaz de Programación de Aplicaciones). En términos simples: es un servicio que provee datos en un formato que las computadoras pueden entender.

### Tipos de datos que proveen las APIs

Las APIs pueden dar cualquier tipo de información:
- Usuarios (nombres, emails, fotos)
- Productos (precios, descripciones, stock)
- Posts de redes sociales
- Clima actual
- Información de películas
- Noticias
- Datos financieros

### API REST y endpoints

La mayoría de APIs modernas son **REST APIs**. Esto significa que tienes diferentes URLs (llamadas endpoints) para diferentes tipos de datos.

**Ejemplo con una API de tienda online**:
```
https://api.mitienda.com/productos       → Lista de todos los productos
https://api.mitienda.com/productos/5     → Producto con ID 5
https://api.mitienda.com/usuarios        → Lista de usuarios
https://api.mitienda.com/usuarios/10     → Usuario con ID 10
```

Cada URL es un endpoint que retorna datos diferentes.

### Formato JSON

Las APIs retornan datos en formato **JSON** (JavaScript Object Notation). Es como un objeto de JavaScript pero en formato de texto.

**Ejemplo de respuesta JSON**:
```json
{
  "id": 1,
  "nombre": "Ana García",
  "email": "ana@email.com",
  "edad": 28
}
```

Parece familiar, ¿verdad? Es prácticamente un objeto JavaScript. Por eso JavaScript y las APIs se llevan tan bien.

---

## Concepto 2: El hook useEffect

Cuando quieres que algo suceda cuando el componente aparece en pantalla por primera vez (como cargar datos), usas el hook **useEffect**.

### ¿Qué es useEffect?

**`useEffect` ejecuta código en momentos específicos del ciclo de vida del componente**:
- Cuando el componente se monta (aparece) en la pantalla
- Cuando ciertos datos cambian
- Cuando el componente se desmonta (desaparece)

### Sintaxis básica de useEffect

```tsx
useEffect(() => {
  // Código que se ejecuta
}, []);
```

**Partes del useEffect**:

1. **Primer argumento**: Una función que contiene el código a ejecutar
2. **Segundo argumento**: Un array de dependencias (si está vacío `[]`, se ejecuta solo UNA VEZ al montar el componente)

**Analogía**: Piensa en `useEffect` como instrucciones que le das a tu componente sobre "cuándo hacer algo especial":
- Array vacío `[]`: "Hazlo solo cuando naces (te montas)"
- Con dependencias `[contador]`: "Hazlo cuando naces Y cada vez que `contador` cambie"
- Sin array: "Hazlo en cada render" (rara vez se usa así)

### Ejemplo simple: Mensaje al montar

```tsx
import { useEffect } from 'react';

function Saludo() {
  useEffect(() => {
    console.log('¡El componente se montó!');
  }, []);

  return <h1>Hola Mundo</h1>;
}
```

**Explicación**:
- **Línea 1**: Importa `useEffect` de React.
- **Líneas 4-6**: Define un efecto que imprime un mensaje en la consola.
- **Línea 6** (`[]`): Array vacío significa "ejecuta esto SOLO una vez, cuando el componente se monte".

Cuando este componente aparece en pantalla, verás el mensaje en la consola del navegador.

---

## Concepto 3: Fetch - Pedir datos a una API

**`fetch` es la función de JavaScript que usamos para hacer peticiones HTTP** (pedir datos a una API).

### Sintaxis básica de fetch

```tsx
fetch('https://api.ejemplo.com/datos')
  .then(response => response.json())
  .then(datos => console.log(datos))
  .catch(error => console.error(error));
```

**Explicación paso a paso**:

1. **`fetch('URL')`**: Inicia la petición a la URL especificada. Retorna una **Promise** (promesa).

2. **`.then(response => response.json())`**: Cuando llega la respuesta, la convierte de JSON (texto) a un objeto JavaScript.

3. **`.then(datos => console.log(datos))`**: Cuando la conversión termina, hace algo con los datos (en este caso, imprimirlos).

4. **`.catch(error => ...)`**: Si algo sale mal en cualquier paso, captura el error.

### Usando async/await (forma más moderna y legible)

En lugar de `.then`, puedes usar `async/await`, que es más fácil de leer:

```tsx
async function obtenerDatos() {
  try {
    const response = await fetch('https://api.ejemplo.com/datos');
    const datos = await response.json();
    console.log(datos);
  } catch (error) {
    console.error(error);
  }
}
```

**Por qué es más fácil**: Se lee de arriba a abajo, como código normal. `await` significa "espera a que esto termine antes de continuar".

---

## Concepto 4: Cargar datos de una API real

Vamos a usar **JSONPlaceholder**, una API pública gratuita para practicar. Provee datos falsos de usuarios, posts, comentarios, etc.

**URL de ejemplo**: `https://jsonplaceholder.typicode.com/users`

### Ejemplo completo: Lista de usuarios

Crea un archivo `src/ListaUsuarios.tsx`:

```tsx
import { useState, useEffect } from 'react';

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(datos => {
        setUsuarios(datos);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p>Cargando usuarios...</p>;
  }

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>{usuario.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListaUsuarios;
```

**Explicación línea por línea**:

- **Línea 4** (`const [usuarios, setUsuarios] = useState([]);`): Estado para guardar la lista de usuarios. Empieza como array vacío.

- **Línea 5** (`const [cargando, setCargando] = useState(true);`): Estado booleano para saber si estamos esperando datos. Empieza en `true`.

- **Líneas 7-14** (`useEffect(...)`): Cuando el componente se monta:
  - **Línea 8**: Hace la petición a la API.
  - **Línea 9**: Convierte la respuesta a JSON.
  - **Líneas 10-13**: Cuando llegan los datos, actualiza el estado `usuarios` y pone `cargando` en `false`.

- **Líneas 16-18** (renderizado condicional): Si está cargando, muestra "Cargando usuarios...". Esto se llama "early return": sales de la función antes de llegar al final.

- **Líneas 20-28**: Si NO está cargando, muestra la lista. Usa `.map()` para convertir cada usuario en un `<li>`.

- **Línea 25** (`key={usuario.id}`): React requiere una prop `key` única para cada elemento de una lista. Ayuda a React a identificar qué elementos cambiaron.

**Resultado**: Al cargar el componente, verás "Cargando usuarios..." por un momento, y luego aparecerá una lista con 10 nombres.

---

## 🤖 Claude Code en Acción: Tu asistente para integración con APIs

Ahora que entiendes los fundamentos de las APIs, `useEffect`, y `fetch`, es momento de acelerar tu desarrollo con Claude Code. Integrar APIs puede ser repetitivo y propenso a errores: estados de carga, manejo de errores, tipado TypeScript, cancelación de requests. Claude Code automatiza estos patrones comunes y te ayuda a escribir código robusto y profesional en minutos.

### ¿Por qué usar Claude Code para APIs?

**El problema sin Claude Code**:
- Escribir manualmente estados de loading, error, y data para cada API
- Recordar la sintaxis exacta de `useEffect` y sus dependencias
- Configurar correctamente tipos TypeScript para respuestas de API
- Implementar manejo de errores consistente
- Recordar limpiar (cleanup) requests cuando el componente se desmonta

**Con Claude Code**:
- Generas custom hooks completos con manejo de estados en segundos
- Obtienes código con TypeScript correctamente tipado
- Implementas cancelación de requests automáticamente
- Sigues mejores prácticas de la industria sin memorizarlas

---

### Prompt 1: Configurar cliente HTTP con axios

**Contexto**: `fetch` es suficiente para casos simples, pero aplicaciones profesionales usan bibliotecas como `axios` que ofrecen interceptores, mejor manejo de errores, y cancelación de requests más simple.

**Prompt para Claude Code**:
```
Instala axios en mi proyecto React y crea un archivo src/api/client.ts
que configure una instancia de axios con:
- baseURL hacia JSONPlaceholder API
- timeout de 10 segundos
- interceptor para logging de requests en desarrollo
- manejo de errores centralizado
```

**Lo que Claude Code hará por ti**:
1. Ejecutará `npm install axios` automáticamente
2. Creará la estructura de carpetas `src/api/`
3. Generará `client.ts` con configuración profesional
4. Añadirá tipos TypeScript apropiados
5. Implementará interceptores para debugging

**Código generado** (`src/api/client.ts`):
```typescript
import axios, { AxiosError, AxiosResponse } from 'axios';

// Configurar instancia base de axios
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de request (logging en desarrollo)
apiClient.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 Request:', config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de response (logging y manejo de errores)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Response:', response.status, response.config.url);
    }
    return response;
  },
  (error: AxiosError) => {
    // Manejo centralizado de errores
    if (error.response) {
      // Error de respuesta del servidor (4xx, 5xx)
      console.error('❌ Server Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request enviado pero sin respuesta (timeout, network error)
      console.error('❌ Network Error:', error.message);
    } else {
      // Error al configurar el request
      console.error('❌ Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

**Por qué es mejor**:
- Configuración centralizada: cambias la `baseURL` en un solo lugar
- Debugging automático: ves todos los requests en consola durante desarrollo
- Manejo de errores consistente: todos los errores se procesan igual
- Timeout automático: previene requests colgados indefinidamente

---

### Prompt 2: Crear custom hook useApi con gestión completa de estados

**Contexto**: Repetir el patrón de estados `loading`, `error`, y `data` en cada componente es tedioso y propenso a errores. Un custom hook reutilizable centraliza esta lógica.

**Prompt para Claude Code**:
```
Crea un custom hook src/hooks/useApi.ts que:
- Reciba una función que retorna una Promise
- Maneje estados de loading, error, data
- Ejecute la función automáticamente al montar
- Permita refetch manual
- Incluya cleanup para cancelar requests
- Esté completamente tipado con TypeScript generics
```

**Lo que Claude Code generará**:

**Código generado** (`src/hooks/useApi.ts`):
```typescript
import { useState, useEffect, useCallback } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  refetch: () => void;
}

/**
 * Hook personalizado para consumir APIs con gestión automática de estados
 * @param apiFn Función que retorna una Promise con los datos de la API
 * @returns Estado (data, loading, error) y función refetch para recargar
 */
function useApi<T>(apiFn: () => Promise<T>): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState({ data: null, loading: true, error: null });

    try {
      const result = await apiFn();
      setState({ data: result, loading: false, error: null });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setState({ data: null, loading: false, error: errorMessage });
    }
  }, [apiFn]);

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        const result = await apiFn();
        if (!cancelled) {
          setState({ data: result, loading: false, error: null });
        }
      } catch (err) {
        if (!cancelled) {
          const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
          setState({ data: null, loading: false, error: errorMessage });
        }
      }
    };

    loadData();

    // Cleanup: marca como cancelado si el componente se desmonta
    return () => {
      cancelled = true;
    };
  }, [apiFn]);

  return {
    ...state,
    refetch: fetchData,
  };
}

export default useApi;
```

**Ejemplo de uso**:
```typescript
import useApi from './hooks/useApi';
import apiClient from './api/client';

interface User {
  id: number;
  name: string;
  email: string;
}

function ListaUsuarios() {
  const { data, loading, error, refetch } = useApi<User[]>(
    () => apiClient.get('/users').then(res => res.data)
  );

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <button onClick={refetch}>Recargar</button>
      <ul>
        {data?.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  );
}
```

**Ventajas**:
- Reutilizable: Funciona con cualquier función que retorne Promise
- TypeScript seguro: `<User[]>` garantiza tipado correcto
- Cancelación integrada: Evita actualizaciones de estado en componentes desmontados
- Refetch fácil: Botón de recarga implementado con una función

---

### Prompt 3: Implementar custom hook para paginación

**Contexto**: Muchas APIs retornan datos paginados. Implementar controles de paginación manualmente es repetitivo.

**Prompt para Claude Code**:
```
Crea un custom hook src/hooks/usePagination.ts que:
- Maneje página actual y tamaño de página
- Provea funciones nextPage, prevPage, goToPage
- Calcule páginas totales basado en totalItems
- Incluya validación para no ir a páginas inválidas
- Esté tipado con TypeScript
```

**Código generado** (`src/hooks/usePagination.ts`):
```typescript
import { useState, useMemo } from 'react';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  startIndex: number;
  endIndex: number;
}

function usePagination({
  totalItems,
  itemsPerPage = 10,
  initialPage = 1,
}: UsePaginationProps): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Calcular páginas totales
  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / itemsPerPage);
  }, [totalItems, itemsPerPage]);

  // Calcular índices para slice del array
  const startIndex = useMemo(() => {
    return (currentPage - 1) * itemsPerPage;
  }, [currentPage, itemsPerPage]);

  const endIndex = useMemo(() => {
    return startIndex + itemsPerPage;
  }, [startIndex, itemsPerPage]);

  // Funciones de navegación con validación
  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  // Flags de disponibilidad
  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;

  return {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    canGoNext,
    canGoPrev,
    startIndex,
    endIndex,
  };
}

export default usePagination;
```

**Ejemplo de uso combinado** (useApi + usePagination):
```typescript
import useApi from './hooks/useApi';
import usePagination from './hooks/usePagination';
import apiClient from './api/client';

interface Post {
  id: number;
  title: string;
  body: string;
}

function PostsPaginados() {
  const { data: posts, loading, error } = useApi<Post[]>(
    () => apiClient.get('/posts').then(res => res.data)
  );

  const {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    canGoNext,
    canGoPrev,
    startIndex,
    endIndex,
  } = usePagination({
    totalItems: posts?.length || 0,
    itemsPerPage: 10,
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  const postsPaginados = posts?.slice(startIndex, endIndex);

  return (
    <div>
      <h2>Posts (Página {currentPage} de {totalPages})</h2>

      {postsPaginados?.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}

      <div>
        <button onClick={prevPage} disabled={!canGoPrev}>
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={nextPage} disabled={!canGoNext}>
          Siguiente
        </button>
      </div>
    </div>
  );
}
```

---

### Workflow Completo: App de gestión de usuarios con API real

Ahora vamos a crear una aplicación completa que consume JSONPlaceholder API, con todas las características profesionales: cliente HTTP configurado, custom hooks, paginación, búsqueda, y manejo de errores.

**Prompt para Claude Code**:
```
Crea una aplicación completa de gestión de usuarios que:
1. Use axios con cliente HTTP configurado
2. Implemente useApi para cargar usuarios
3. Incluya barra de búsqueda en tiempo real (filtro local)
4. Tenga paginación funcional con 6 usuarios por página
5. Muestre detalles de usuario en modal al hacer clic
6. Use TypeScript para todo
7. Tenga manejo completo de loading y errores
8. Incluya botón de refetch

Estructura:
- src/api/client.ts (cliente axios)
- src/hooks/useApi.ts (hook de API)
- src/hooks/usePagination.ts (hook de paginación)
- src/types/User.ts (tipos)
- src/components/UserCard.tsx (tarjeta de usuario)
- src/components/UserModal.tsx (modal de detalles)
- src/components/UserList.tsx (lista principal)
- src/App.tsx (app principal)
```

**Claude Code generará todos los archivos automáticamente**. Aquí están los archivos principales:

**Archivo: `src/types/User.ts`**
```typescript
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
```

**Archivo: `src/components/UserCard.tsx`**
```typescript
import { User } from '../types/User';

interface UserCardProps {
  user: User;
  onClick: () => void;
}

function UserCard({ user, onClick }: UserCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
          {user.name.charAt(0)}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
          <p className="text-sm text-gray-500">@{user.username}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <p className="text-gray-600">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Ciudad:</span> {user.address.city}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Empresa:</span> {user.company.name}
        </p>
      </div>
    </div>
  );
}

export default UserCard;
```

**Archivo: `src/components/UserModal.tsx`**
```typescript
import { User } from '../types/User';

interface UserModalProps {
  user: User | null;
  onClose: () => void;
}

function UserModal({ user, onClose }: UserModalProps) {
  if (!user) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Información de contacto</h3>
            <p className="text-gray-800">Usuario: @{user.username}</p>
            <p className="text-gray-800">Email: {user.email}</p>
            <p className="text-gray-800">Teléfono: {user.phone}</p>
            <p className="text-gray-800">Sitio web: {user.website}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Dirección</h3>
            <p className="text-gray-800">{user.address.street}, {user.address.suite}</p>
            <p className="text-gray-800">{user.address.city} - {user.address.zipcode}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Empresa</h3>
            <p className="text-gray-800 font-semibold">{user.company.name}</p>
            <p className="text-gray-600 italic">"{user.company.catchPhrase}"</p>
            <p className="text-gray-600 text-sm">{user.company.bs}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserModal;
```

**Archivo: `src/components/UserList.tsx`**
```typescript
import { useState, useMemo } from 'react';
import useApi from '../hooks/useApi';
import usePagination from '../hooks/usePagination';
import apiClient from '../api/client';
import { User } from '../types/User';
import UserCard from './UserCard';
import UserModal from './UserModal';

function UserList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Cargar usuarios de la API
  const { data: users, loading, error, refetch } = useApi<User[]>(
    () => apiClient.get('/users').then(res => res.data)
  );

  // Filtrar usuarios según término de búsqueda
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    if (!searchTerm) return users;

    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // Paginación
  const {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    canGoNext,
    canGoPrev,
    startIndex,
    endIndex,
  } = usePagination({
    totalItems: filteredUsers.length,
    itemsPerPage: 6,
  });

  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Estados de carga y error
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-20 bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
        <h3 className="text-red-800 font-bold text-lg mb-2">Error al cargar usuarios</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={refetch}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header con búsqueda */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold text-gray-800">Gestión de Usuarios</h1>
          <button
            onClick={refetch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
          >
            ↻ Recargar
          </button>
        </div>

        <input
          type="text"
          placeholder="Buscar por nombre, email o empresa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <p className="text-gray-600 mt-2">
          Mostrando {paginatedUsers.length} de {filteredUsers.length} usuarios
        </p>
      </div>

      {/* Grid de usuarios */}
      {paginatedUsers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No se encontraron usuarios</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedUsers.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onClick={() => setSelectedUser(user)}
            />
          ))}
        </div>
      )}

      {/* Controles de paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={prevPage}
            disabled={!canGoPrev}
            className="bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed px-4 py-2 rounded"
          >
            ← Anterior
          </button>
          <span className="text-gray-700">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={!canGoNext}
            className="bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed px-4 py-2 rounded"
          >
            Siguiente →
          </button>
        </div>
      )}

      {/* Modal de detalles */}
      <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
}

export default UserList;
```

**Archivo: `src/App.tsx`**
```typescript
import UserList from './components/UserList';

function App() {
  return <UserList />;
}

export default App;
```

**Características implementadas**:
- ✅ Cliente HTTP configurado con axios
- ✅ Custom hook useApi con loading/error/data
- ✅ Búsqueda en tiempo real (filtrado local)
- ✅ Paginación funcional con custom hook
- ✅ Modal de detalles de usuario
- ✅ TypeScript completo con interfaces
- ✅ Manejo de estados de carga y error
- ✅ Botón de refetch
- ✅ UI responsive con grid adaptativo
- ✅ Indicador visual de resultados

**Tiempo de desarrollo**:
- Sin Claude Code: 3-4 horas (escribir todo manualmente, debuggear, tipar)
- Con Claude Code: 10-15 minutos (prompt + ajustes menores)

---

### Errores comunes al trabajar con APIs (y cómo Claude Code los previene)

#### Error #1: No manejar estados de carga

**Código problemático**:
```typescript
// ❌ Sin estado de carga
function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('https://api.example.com/users')
      .then(res => res.json())
      .then(data => setUsuarios(data));
  }, []);

  return (
    <ul>
      {usuarios.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
```

**Problemas**:
- La lista aparece vacía inicialmente sin indicación de que está cargando
- Los usuarios no saben si la app funciona o está rota
- Mala experiencia de usuario

**Con Claude Code** (generado automáticamente):
```typescript
// ✅ Con estado de carga
function Usuarios() {
  const { data: usuarios, loading, error } = useApi<User[]>(
    () => apiClient.get('/users').then(res => res.data)
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-4">Cargando usuarios...</p>
      </div>
    );
  }

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <ul>
      {usuarios?.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
```

**Por qué es mejor**:
- Feedback visual inmediato con spinner animado
- Manejo de errores incluido
- Experiencia de usuario profesional

---

#### Error #2: Memory leaks por no cancelar requests

**Código problemático**:
```typescript
// ❌ Sin cancelación de requests
function Perfil({ userId }: { userId: number }) {
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    fetch(`https://api.example.com/users/${userId}`)
      .then(res => res.json())
      .then(data => setPerfil(data));
  }, [userId]);

  return <div>{perfil?.name}</div>;
}

// Si el componente se desmonta antes de que termine el fetch,
// intentará actualizar el estado de un componente desmontado → Warning!
```

**Problemas**:
- Warning en consola: "Can't perform a React state update on an unmounted component"
- Memory leak si hay muchos requests cancelados
- Comportamiento impredecible

**Con Claude Code** (cleanup automático):
```typescript
// ✅ Con cancelación de requests
function useApi<T>(apiFn: () => Promise<T>) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;  // ← Flag de cancelación

    const loadData = async () => {
      try {
        const result = await apiFn();
        if (!cancelled) {  // ← Solo actualiza si NO está cancelado
          setState({ data: result, loading: false, error: null });
        }
      } catch (err) {
        if (!cancelled) {
          setState({ data: null, loading: false, error: err.message });
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;  // ← Cleanup: marca como cancelado
    };
  }, [apiFn]);

  return state;
}
```

**Por qué es mejor**:
- No intenta actualizar estado de componentes desmontados
- Previene warnings y memory leaks
- Patrón estándar de la industria

---

#### Error #3: Hacer fetch directamente en el render (bucle infinito)

**Código problemático**:
```typescript
// ❌ BUCLE INFINITO - NO HAGAS ESTO
function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  // ¡ERROR! Fetch en el render crea un bucle infinito
  fetch('https://api.example.com/users')
    .then(res => res.json())
    .then(data => setUsuarios(data));  // setState → re-render → fetch → setState → ...

  return <ul>{usuarios.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

**Problemas**:
- Fetch se ejecuta en cada render
- Cada fetch actualiza el estado
- Cada actualización de estado causa un re-render
- Bucle infinito → navegador se congela

**Con Claude Code** (useEffect automático):
```typescript
// ✅ Fetch en useEffect (se ejecuta solo al montar)
function Usuarios() {
  const { data: usuarios, loading, error } = useApi<User[]>(
    () => apiClient.get('/users').then(res => res.data)
  );

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return <ul>{usuarios?.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

**Por qué es mejor**:
- El hook `useApi` usa `useEffect` internamente con dependencias correctas
- Fetch se ejecuta solo una vez al montar
- No hay bucles infinitos

---

#### Error #4: No tipar respuestas de API con TypeScript

**Código problemático**:
```typescript
// ❌ Sin tipos - propenso a errores
function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);  // any[]

  useEffect(() => {
    fetch('https://api.example.com/users')
      .then(res => res.json())
      .then(data => setUsuarios(data));  // ¿Qué contiene data?
  }, []);

  return (
    <ul>
      {usuarios.map(u => (
        <li key={u.id}>
          {u.nombre}  {/* ¿Es 'nombre' o 'name'? TypeScript no lo sabe */}
        </li>
      ))}
    </ul>
  );
}
```

**Problemas**:
- No hay autocompletado
- Errores solo se descubren en runtime
- Refactorizar es peligroso

**Con Claude Code** (tipado completo):
```typescript
// ✅ Completamente tipado
interface User {
  id: number;
  name: string;  // ← TypeScript sabe que es 'name', no 'nombre'
  email: string;
}

function Usuarios() {
  const { data: usuarios, loading, error } = useApi<User[]>(  // ← Tipado genérico
    () => apiClient.get<User[]>('/users').then(res => res.data)
  );

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {usuarios?.map(u => (
        <li key={u.id}>
          {u.name}  {/* ✅ Autocompletado correcto, error si escribes u.nombre */}
        </li>
      ))}
    </ul>
  );
}
```

**Por qué es mejor**:
- Autocompletado inteligente en VS Code
- Errores de tipos detectados antes de ejecutar
- Refactorización segura

---

### Tabla comparativa: Con vs. Sin Claude Code

| Aspecto | Sin Claude Code | Con Claude Code |
|---------|-----------------|-----------------|
| **Tiempo setup API** | 30-45 min (instalar axios, configurar cliente, crear interceptores) | 2 min (prompt → código generado) |
| **Custom hooks** | 1-2 horas (escribir, debuggear, tipar correctamente) | 5 min (prompt → hook completo con tipos) |
| **Manejo de errores** | Implementar manualmente en cada componente | Centralizado automáticamente en interceptores |
| **Cancelación de requests** | Fácil de olvidar → memory leaks | Incluido por defecto en custom hooks |
| **TypeScript** | Escribir interfaces manualmente, fácil cometer errores | Interfaces generadas correctamente |
| **Paginación** | Calcular índices manualmente, validar límites | Hook completo con validación integrada |
| **Estados de carga** | Repetir patrón loading/error/data en cada componente | Hook reutilizable en todos los componentes |
| **Búsqueda/filtrado** | Implementar lógica de filtrado desde cero | Generado con useMemo para rendimiento |
| **Debugging** | Console.log manual en cada request | Interceptores con logging automático |
| **Código duplicado** | Alto (lógica de API repetida en múltiples archivos) | Mínimo (hooks reutilizables) |
| **Consistencia** | Cada desarrollador implementa diferente | Patrones estándar en todo el código |
| **Curva de aprendizaje** | Memorizar sintaxis de fetch, useEffect, cleanup | Describir lo que necesitas en lenguaje natural |

**Tiempo total desarrollo app completa**:
- Sin Claude Code: 4-5 horas
- Con Claude Code: 15-20 minutos (80-85% más rápido)

---

### Mejores prácticas al trabajar con APIs usando Claude Code

1. **Siempre pide tipado TypeScript completo**: Incluye "con TypeScript" en tus prompts para obtener interfaces correctas.

2. **Solicita manejo de errores centralizado**: Pide interceptores de axios para logging y manejo de errores consistente.

3. **Usa custom hooks para lógica reutilizable**: En lugar de repetir código, pide hooks como `useApi`, `usePagination`, `useSearch`.

4. **Implementa loading skeletons profesionales**: En lugar de "Cargando...", pide spinners animados o skeleton screens.

5. **Añade capacidades de refetch**: Siempre útil para recargar datos sin recargar la página.

6. **Considera optimistic updates**: Para operaciones como crear/editar, actualiza la UI antes de que la API responda (mejor UX).

7. **Implementa debouncing en búsquedas**: Si buscas contra una API real (no filtrado local), usa debounce para no hacer requests en cada tecla.

**Prompt avanzado ejemplo**:
```
Crea un sistema completo de búsqueda de productos con:
- Debouncing de 500ms en el input de búsqueda
- Request a la API solo cuando el usuario deja de escribir
- Skeleton loading mientras busca
- Infinite scroll para cargar más resultados
- Caché de resultados previos con React Query
- Cancelación de requests anteriores si hay uno nuevo
```

---

## Práctica guiada: Galería de posts de blog

Vamos a crear un componente que muestre posts de un blog, con título, autor y contenido. Incluiremos manejo de carga y errores.

### Paso 1 de 3: Estructura básica y carga de datos

**Lo que harás**:
1. Crear el componente con estados para posts, cargando y error
2. Usar `useEffect` para cargar los posts al montar
3. Mostrar estado de carga

**Crea `src/GaleriaPosts.tsx`**:

```tsx
import { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function GaleriaPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(datos => {
        setPosts(datos.slice(0, 6));
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <div className="cargando">
        <p>Cargando posts...</p>
      </div>
    );
  }

  return (
    <div className="galeria">
      <h1>Posts del Blog</h1>
      {posts.map(post => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default GaleriaPosts;
```

**Explicación**:

- **Líneas 3-8**: Interface TypeScript que define la estructura de un post. Esto ayuda a VS Code a autocompletar y detectar errores.

- **Línea 11** (`useState<Post[]>([])`): Estado tipado como array de `Post`. El `<Post[]>` es sintaxis de TypeScript para especificar el tipo.

- **Línea 18** (`datos.slice(0, 6)`): Solo toma los primeros 6 posts (la API retorna 100, que es demasiado para este ejemplo).

**Checkpoint**: Importa este componente en `App.tsx`. Deberías ver "Cargando posts..." brevemente, luego 6 posts con títulos y contenido.

### Paso 2 de 3: Añadir manejo de errores

**Lo que harás**:
1. Añadir estado para errores
2. Usar try/catch para capturar errores
3. Mostrar mensaje si algo falla

**Modifica el componente**:

```tsx
function GaleriaPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar');
        return res.json();
      })
      .then(datos => {
        setPosts(datos.slice(0, 6));
        setCargando(false);
      })
      .catch(err => {
        setError('No se pudieron cargar los posts');
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <div className="cargando">Cargando...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    // ... resto del código
  );
}
```

**Explicación de lo nuevo**:

- **Línea 4** (`const [error, setError] = useState('');`): Estado para guardar mensajes de error.

- **Líneas 9-10**: Verifica que la respuesta sea exitosa (`res.ok`). Si no, lanza un error.

- **Líneas 16-19** (`.catch`): Captura cualquier error que ocurra en la cadena de promesas y actualiza el estado de error.

- **Líneas 26-28**: Si hay un error, muestra el mensaje de error.

**Checkpoint**: El componente ahora maneja errores. Para probarlo, cambia temporalmente la URL a una inválida y verás el mensaje de error.

### Paso 3 de 3: Mejorar la interfaz

**Lo que harás**:
1. Añadir información del autor (nombre de usuario)
2. Limitar la longitud del contenido
3. Estilizar las tarjetas de posts

**Modifica el JSX del return**:

```tsx
return (
  <div className="galeria">
    <h1>Posts Recientes del Blog</h1>
    <div className="posts-grid">
      {posts.map(post => (
        <div key={post.id} className="post-card">
          <h3>{post.title}</h3>
          <p className="post-body">
            {post.body.substring(0, 100)}...
          </p>
          <p className="post-info">
            Autor: Usuario #{post.userId}
          </p>
        </div>
      ))}
    </div>
  </div>
);
```

**Añade estilos en `src/index.css`**:

```css
.galeria {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.galeria h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.post-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.post-card h3 {
  color: #3498db;
  margin-bottom: 10px;
  font-size: 18px;
}

.post-body {
  color: #555;
  line-height: 1.6;
  margin-bottom: 15px;
}

.post-info {
  color: #7f8c8d;
  font-size: 14px;
  font-style: italic;
}

.cargando {
  text-align: center;
  padding: 50px;
  font-size: 18px;
  color: #3498db;
}

.error {
  text-align: center;
  padding: 50px;
  font-size: 18px;
  color: #e74c3c;
  background-color: #fadbd8;
  border-radius: 8px;
  margin: 20px;
}
```

**Explicación de estilos clave**:

- **`.posts-grid`**: Usa CSS Grid para crear una cuadrícula responsive. `repeat(auto-fill, minmax(300px, 1fr))` significa: "crea tantas columnas como quepan, cada una de mínimo 300px".

- **`.post-card:hover`**: Efecto de elevación al pasar el mouse, igual que en lecciones anteriores.

- **`.cargando` y `.error`**: Estilos específicos para los estados de carga y error.

**Checkpoint**: Los posts ahora se muestran en una cuadrícula responsive (2-3 columnas dependiendo del ancho de pantalla), con efectos hover y estilos profesionales.

---

## ⚠️ Errores comunes (y cómo solucionarlos)

### Error #1: "useEffect Hook has missing dependency"

**Te pasa cuando**: ESLint (el linter) detecta que usas una variable dentro de `useEffect` pero no la incluyes en el array de dependencias.

**El mensaje de error que ves**:
```
React Hook useEffect has a missing dependency: 'algo'. Either include it or remove the dependency array
```

**Por qué pasa**: React quiere asegurarse de que el efecto se re-ejecute si cambian las variables que usa.

**Cómo se soluciona**:

**Opción 1**: Si realmente solo quieres que se ejecute al montar, ignora el warning (en este curso está bien):
```tsx
useEffect(() => {
  // código
}, []); // eslint-disable-line react-hooks/exhaustive-deps
```

**Opción 2**: Añade las dependencias que faltan:
```tsx
useEffect(() => {
  // usa 'contador'
}, [contador]); // Ahora se ejecuta cuando 'contador' cambia
```

### Error #2: "Cannot read property 'map' of undefined"

**Te pasa cuando**: Intentas usar `.map()` en un array que aún no se ha cargado.

**El mensaje de error que ves**:
```
Cannot read property 'map' of undefined
```

**Por qué pasa**: Al inicio, `usuarios` es `undefined` (antes de que se cargue), y `undefined.map()` causa error.

**Cómo se soluciona**:

**Opción 1**: Inicializa el estado como array vacío:
```tsx
const [usuarios, setUsuarios] = useState([]); // ✅ Empieza como []
```

**Opción 2**: Verifica antes de mapear:
```tsx
{usuarios && usuarios.map(...)}
// O
{usuarios?.map(...)}  // Optional chaining
```

### Error #3: "Warning: Each child in a list should have a unique 'key' prop"

**Te pasa cuando**: Usas `.map()` para renderizar una lista pero olvidas añadir la prop `key`.

**El mensaje de error que ves**:
```
Warning: Each child in a list should have a unique "key" prop
```

**Por qué pasa**: React usa `key` para identificar elementos en listas y optimizar el renderizado.

**Cómo se soluciona**:
Añade una prop `key` única a cada elemento:
```tsx
{usuarios.map(usuario => (
  <li key={usuario.id}>{usuario.name}</li>
  //  ^^^^^^^^^^ Usa un ID único
))}
```

**IMPORTANTE**: No uses el índice del array como key si la lista puede cambiar de orden. Usa un ID único de los datos.

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: El error más común es olvidar inicializar el estado como array vacío y luego intentar usar `.map()`. Recuerda: si vas a mapear sobre algo, ese algo debe ser un array desde el inicio, no `undefined` o `null`.

> **Otro tip importante**: Siempre muestra un estado de carga. Los usuarios odian ver pantallas en blanco sin saber si la app está funcionando. Un simple "Cargando..." mejora muchísimo la experiencia de usuario. Es mejor ser explícito sobre lo que está pasando.

> **Sobre async/await vs .then**: Ambas formas funcionan igual. `.then()` es más tradicional, `async/await` es más moderna y legible. Cuando te sientas cómodo con `.then()`, investiga `async/await` para escribir código más limpio.

> **Debugging de APIs**: Si una petición no funciona, abre la consola del navegador (F12) y ve a la pestaña "Network". Ahí verás todas las peticiones HTTP que hace tu app, sus respuestas, y cualquier error. Es invaluable para debugging.

> **JSONPlaceholder es tu amigo**: Mientras aprendes, usa JSONPlaceholder para practicar. Tiene endpoints para usuarios, posts, comentarios, fotos, todos, y más. Es perfecto para aprender sin tener que configurar tu propio backend.

---

## Tu turno: Ejercicio guiado

**Objetivo simple**: Crear un componente "GaleriaFotos" que muestre fotos de la API JSONPlaceholder en una cuadrícula, con título y thumbnail.

**Tiempo**: 25-30 minutos

**Lo que necesitas antes de empezar**:
- [ ] Proyecto React funcionando
- [ ] Conocimiento de `useState` y `useEffect`
- [ ] Conocimiento de fetch y manejo de APIs

**Endpoint a usar**: `https://jsonplaceholder.typicode.com/photos`

**Estructura de cada foto en la API**:
```json
{
  "albumId": 1,
  "id": 1,
  "title": "accusamus beatae ad facilis cum similique qui sunt",
  "url": "https://via.placeholder.com/600/92c952",
  "thumbnailUrl": "https://via.placeholder.com/150/92c952"
}
```

### Instrucciones paso a paso

**Parte 1: Crear el componente base** (10 min)

1. Crea `src/GaleriaFotos.tsx`
2. Define una interface `Foto` con las propiedades: `id`, `title`, `thumbnailUrl`
3. Crea tres estados:
   - `fotos`: Array de `Foto` (vacío al inicio)
   - `cargando`: Boolean (`true` al inicio)
   - `error`: String (vacío al inicio)
4. Usa `useEffect` para:
   - Hacer fetch a `https://jsonplaceholder.typicode.com/photos`
   - Convertir a JSON
   - Guardar solo las primeras 12 fotos (`.slice(0, 12)`)
   - Poner `cargando` en `false`
   - Manejar errores con `.catch()`
5. Renderiza condicionalmente:
   - Si `cargando`: Mostrar "Cargando fotos..."
   - Si `error`: Mostrar el mensaje de error
   - Si todo ok: Mostrar las fotos (próximo paso)

**Parte 2: Mostrar las fotos** (8 min)

1. En el return (cuando no hay error ni carga), crea:
   - Un `<div>` con clase `galeria-fotos`
   - Un `<h1>` con título "Galería de Fotos"
   - Un `<div>` con clase `fotos-grid`
2. Dentro de `fotos-grid`, mapea el array `fotos`:
   - Por cada foto, renderiza un `<div>` con clase `foto-card`
   - Dentro, una `<img>` con `src={foto.thumbnailUrl}` y `alt={foto.title}`
   - Debajo, un `<p>` con el título (limitado a 50 caracteres: `foto.title.substring(0, 50) + '...'`)
3. No olvides la prop `key={foto.id}` en el div de cada foto

**Parte 3: Estilizar la galería** (10 min)

1. Abre `src/index.css` y añade:
```css
.galeria-fotos {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.galeria-fotos h1 {
  text-align: center;
  margin-bottom: 30px;
}

.fotos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.foto-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  transition: transform 0.2s;
}

.foto-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.foto-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 10px;
}

.foto-card p {
  font-size: 14px;
  color: #555;
  margin: 0;
}
```

**Criterio de éxito**:
- [ ] Se cargan 12 fotos de la API JSONPlaceholder
- [ ] Las fotos se muestran en una cuadrícula responsive (3-4 columnas)
- [ ] Cada foto muestra su thumbnail y título (limitado a 50 caracteres)
- [ ] Hay un efecto hover que agranda ligeramente la tarjeta
- [ ] Se muestra "Cargando fotos..." mientras se cargan los datos
- [ ] Si hay un error, se muestra un mensaje apropiado

**Desafío extra** (opcional):
1. Añade un botón "Cargar más" que cargue 12 fotos adicionales cada vez que se presiona
2. Añade filtros: botones para filtrar por `albumId` (mostrar solo fotos del álbum 1, 2, o 3)
3. Implementa un modal: al hacer clic en una foto, muestra la imagen completa (`url` en lugar de `thumbnailUrl`) en un overlay grande
4. Añade un input de búsqueda que filtre las fotos por título en tiempo real

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **Las APIs son proveedores de datos externos**: En lugar de escribir todos los datos en tu código, las aplicaciones reales piden información a APIs (servidores) a través de internet. Las APIs retornan datos en formato JSON que puedes usar en tu app.

2. **useEffect ejecuta código en momentos específicos**: Con `useEffect` y un array de dependencias vacío `[]`, ejecutas código una vez cuando el componente se monta. Es ideal para cargar datos al inicio. Sin `useEffect`, intentar hacer fetch directamente en el componente causaría bucles infinitos.

3. **Siempre maneja estados de carga y error**: Las peticiones HTTP toman tiempo y pueden fallar. Usa estados separados para `cargando` y `error`, y muestra mensajes apropiados en cada caso. Esto hace que tu app se sienta profesional y comunique claramente qué está pasando al usuario.

---

## Siguiente paso

En la próxima lección: **"Diseño responsive con Tailwind CSS"**. Aprenderás a usar Tailwind CSS, un framework de CSS moderno que te permite diseñar interfaces hermosas sin salir del HTML. Verás cómo hacer que tus componentes se vean bien en móviles, tablets y escritorio usando clases de utilidad. Es cuando tus apps pasan de funcionales a visualmente impresionantes.

---

**¿Dudas?** Trabajar con APIs puede parecer mágico al principio: haces una petición y aparecen datos de internet. Es normal confundirse con Promises, `.then()`, async/await, y los estados de carga. No te preocupes, con práctica se vuelve segunda naturaleza. Crea componentes que consuman diferentes endpoints de JSONPlaceholder (users, posts, photos, todos, comments) para ganar confianza. Cada petición que hagas te hará sentir más cómodo con el proceso.

