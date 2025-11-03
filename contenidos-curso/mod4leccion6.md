<p><strong><em>Proyecto integrador: Dashboard interactivo completo</em></strong></p>

## Introducción: Todo se une aquí

Has recorrido un camino increíble en este módulo. Empezaste sin saber qué era React, y ahora conoces componentes, props, estado, hooks, APIs y Tailwind CSS. Pero hasta ahora has trabajado con piezas separadas: un componente aquí, una petición a API allá, estilos de Tailwind por otro lado.

En esta lección final del módulo, vas a unir todas las piezas para construir algo real y completo: un **dashboard administrativo interactivo**. No será un ejercicio inventado; crearás una aplicación que podría usarse en producción con pequeños ajustes. Tendrá estadísticas, gráficos visuales, listas de datos en tiempo real, filtros, búsqueda, y un diseño responsive profesional.

Este es tu momento de brillar. Al terminar esta lección, tendrás un proyecto completo para añadir a tu portafolio y mostrar con orgullo. Vamos a construirlo paso a paso, sin prisa, asegurándonos de que entiendas cada parte.

---

## 🎯 Lo que aprenderás hoy

Al terminar esta lección, podrás:

1. **Planificar un proyecto completo**: Aprenderás a descomponer una aplicación compleja en componentes pequeños y manejables.
2. **Integrar múltiples fuentes de datos**: Combinarás datos de diferentes endpoints de API en una sola aplicación coherente.
3. **Crear componentes reutilizables complejos**: Construirás componentes más sofisticados que los anteriores, con múltiples estados y lógica de negocio.
4. **Implementar funcionalidades avanzadas**: Añadirás búsqueda en tiempo real, filtros, ordenamiento, y navegación entre vistas.

---

## ¿Por qué es importante construir proyectos completos?

Imagina que estás aprendiendo a cocinar. Puedes dominar técnicas individuales: cortar cebolla, freír huevo, hacer arroz. Pero no eres verdaderamente un cocinero hasta que puedes planificar un menú completo de tres tiempos, coordinar los tiempos de cocción, y servir todo caliente al mismo tiempo.

**Desarrollar software es igual**: conocer componentes, estado y APIs es importante, pero lo que realmente importa es saber combinarlos para crear algo útil y funcional. Los proyectos completos te enseñan:

- Cómo estructurar código a medida que crece
- Cómo manejar la complejidad sin perderte
- Cómo tomar decisiones de diseño cuando no hay una respuesta obvia
- Cómo depurar problemas en un sistema con muchas partes móviles

### 📊 Un dato interesante

Según reclutadores de tecnología, un portafolio con 2-3 proyectos completos vale más que 100 ejercicios de tutorial. Las empresas quieren ver que puedes construir algo de principio a fin, no solo seguir instrucciones paso a paso. Este dashboard será una de esas piezas para tu portafolio.

---

## El proyecto: Dashboard de gestión de usuarios y tareas

Vas a construir un dashboard administrativo con estas características:

### Funcionalidades principales

1. **Panel de estadísticas**: Muestra métricas clave (total usuarios, tareas completadas, tareas pendientes).
2. **Lista de usuarios**: Tabla con información de usuarios de la API, con búsqueda y filtros.
3. **Lista de tareas**: Muestra tareas (todos) de la API, con filtro por estado (completadas/pendientes).
4. **Navegación**: Pestañas para cambiar entre vistas (Inicio, Usuarios, Tareas).
5. **Diseño responsive**: Funciona perfectamente en móvil, tablet y desktop.
6. **Indicadores de carga**: Muestra spinners mientras carga datos.
7. **Manejo de errores**: Mensajes claros si algo falla.

### Tecnologías que usarás

- **React**: Estructura de componentes
- **TypeScript**: Tipado de datos
- **Hooks**: `useState`, `useEffect`
- **Fetch API**: Obtener datos de JSONPlaceholder
- **Tailwind CSS**: Diseño responsive profesional

### APIs que consumirás

- `https://jsonplaceholder.typicode.com/users` (10 usuarios)
- `https://jsonplaceholder.typicode.com/todos` (200 tareas, usaremos las primeras 20)

---

## Paso 1: Planificación y estructura

Antes de escribir código, planifiquemos la estructura de componentes.

### Arquitectura de componentes

```
App
├── Header (logo, título)
├── Navegacion (pestañas: Inicio, Usuarios, Tareas)
└── Contenido (cambia según pestaña activa)
    ├── Inicio
    │   ├── TarjetaEstadistica (x3: usuarios, tareas completadas, pendientes)
    │   └── ResumenActividad
    ├── Usuarios
    │   ├── BarraBusqueda
    │   └── TablaUsuarios
    └── Tareas
        ├── FiltrosTareas (botones: Todas, Completadas, Pendientes)
        └── ListaTareas
```

### Estructura de carpetas

```
src/
├── components/
│   ├── Header.tsx
│   ├── Navegacion.tsx
│   ├── TarjetaEstadistica.tsx
│   ├── TablaUsuarios.tsx
│   ├── ListaTareas.tsx
│   └── BarraBusqueda.tsx
├── types/
│   └── index.ts (interfaces TypeScript)
├── App.tsx
└── index.css
```

---

## Paso 2: Definir tipos TypeScript

Primero, definamos las interfaces para tener tipos claros.

**Crea `src/types/index.ts`**:

```typescript
export interface Usuario {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

export interface Tarea {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export type VistaDashboard = 'inicio' | 'usuarios' | 'tareas';

export type FiltroTarea = 'todas' | 'completadas' | 'pendientes';
```

**Explicación**:
- **`Usuario`**: Estructura de un usuario de la API (solo incluimos campos que usaremos).
- **`Tarea`**: Estructura de una tarea (todo).
- **`VistaDashboard`**: Tipo literal para las vistas posibles (inicio, usuarios, tareas).
- **`FiltroTarea`**: Tipo literal para los filtros de tareas.

---

## Paso 3: Componente Header

**Crea `src/components/Header.tsx`**:

```tsx
function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
        <p className="text-blue-100 mt-1">Panel de gestión de usuarios y tareas</p>
      </div>
    </header>
  );
}

export default Header;
```

**Explicación**:
- **Línea 3** (`bg-gradient-to-r from-blue-600 to-blue-800`): Gradiente horizontal de azul.
- **Línea 4** (`max-w-7xl mx-auto`): Contenedor centrado con ancho máximo.
- Simple pero profesional.

---

## Paso 4: Componente de navegación

**Crea `src/components/Navegacion.tsx`**:

```tsx
import { VistaDashboard } from '../types';

interface NavegacionProps {
  vistaActual: VistaDashboard;
  cambiarVista: (vista: VistaDashboard) => void;
}

function Navegacion({ vistaActual, cambiarVista }: NavegacionProps) {
  const vistas: { id: VistaDashboard; nombre: string }[] = [
    { id: 'inicio', nombre: 'Inicio' },
    { id: 'usuarios', nombre: 'Usuarios' },
    { id: 'tareas', nombre: 'Tareas' }
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-8">
          {vistas.map(vista => (
            <button
              key={vista.id}
              onClick={() => cambiarVista(vista.id)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                vistaActual === vista.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {vista.nombre}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navegacion;
```

**Explicación**:
- **Línea 4** (`cambiarVista`): Función callback que el padre pasa para cambiar de vista.
- **Líneas 9-13**: Array de vistas con sus datos.
- **Líneas 19-32**: Mapea las vistas para crear botones.
- **Líneas 23-27** (clases condicionales): Si la vista está activa, usa estilos azules; si no, gris.
- **Template literal** (línea 23): Permite interpolar JavaScript en strings de clases.

---

## Paso 5: Componente TarjetaEstadistica

**Crea `src/components/TarjetaEstadistica.tsx`**:

```tsx
interface TarjetaEstadisticaProps {
  titulo: string;
  valor: number;
  icono: string;
  color: 'blue' | 'green' | 'purple';
}

function TarjetaEstadistica({
  titulo,
  valor,
  icono,
  color
}: TarjetaEstadisticaProps) {
  const colores = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{titulo}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{valor}</p>
        </div>
        <div className={`${colores[color]} w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl`}>
          {icono}
        </div>
      </div>
    </div>
  );
}

export default TarjetaEstadistica;
```

**Explicación**:
- **Líneas 14-18** (objeto `colores`): Mapea nombres de color a clases de Tailwind.
- **Línea 27** (`colores[color]`): Selecciona el color basado en la prop.
- **Línea 28** (`icono`): Usaremos emojis como iconos simples (👥, ✅, ⏳).

---

## Paso 6: Componente TablaUsuarios

**Crea `src/components/TablaUsuarios.tsx`**:

```tsx
import { Usuario } from '../types';

interface TablaUsuariosProps {
  usuarios: Usuario[];
  busqueda: string;
}

function TablaUsuarios({ usuarios, busqueda }: TablaUsuariosProps) {
  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario.name.toLowerCase().includes(busqueda.toLowerCase()) ||
    usuario.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Teléfono
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Empresa
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {usuariosFiltrados.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                No se encontraron usuarios
              </td>
            </tr>
          ) : (
            usuariosFiltrados.map(usuario => (
              <tr key={usuario.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {usuario.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {usuario.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        @{usuario.username}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {usuario.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {usuario.phone.split(' ')[0]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {usuario.company.name}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TablaUsuarios;
```

**Explicación**:
- **Líneas 9-12** (filtrado): Busca en nombre y email (case-insensitive).
- **Líneas 34-39**: Si no hay resultados, muestra mensaje.
- **Líneas 45-47**: Avatar circular con inicial del nombre.
- **Línea 63** (`phone.split(' ')[0]`): Solo muestra la primera parte del teléfono (la API da números raros).
- **Estructura de tabla profesional** con clases de Tailwind.

---

## Paso 7: Componente ListaTareas

**Crea `src/components/ListaTareas.tsx`**:

```tsx
import { Tarea, FiltroTarea } from '../types';

interface ListaTareasProps {
  tareas: Tarea[];
  filtro: FiltroTarea;
}

function ListaTareas({ tareas, filtro }: ListaTareasProps) {
  const tareasFiltradas = tareas.filter(tarea => {
    if (filtro === 'completadas') return tarea.completed;
    if (filtro === 'pendientes') return !tarea.completed;
    return true; // 'todas'
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tareasFiltradas.map(tarea => (
        <div
          key={tarea.id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className={`text-sm ${tarea.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {tarea.title}
              </p>
            </div>
            <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
              tarea.completed
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {tarea.completed ? '✓ Completada' : '⏳ Pendiente'}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Usuario #{tarea.userId}
          </p>
        </div>
      ))}
      {tareasFiltradas.length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-500">
          No hay tareas {filtro === 'todas' ? '' : filtro}
        </div>
      )}
    </div>
  );
}

export default ListaTareas;
```

**Explicación**:
- **Líneas 9-13**: Filtra tareas según el filtro activo.
- **Línea 24** (`line-through`): Tacha el texto si está completada.
- **Líneas 28-32**: Badge condicional (verde si completada, amarillo si pendiente).
- **Líneas 41-45**: Mensaje si no hay tareas con ese filtro.

---

## Paso 8: Componente BarraBusqueda

**Crea `src/components/BarraBusqueda.tsx`**:

```tsx
interface BarraBusquedaProps {
  busqueda: string;
  setBusqueda: (busqueda: string) => void;
}

function BarraBusqueda({ busqueda, setBusqueda }: BarraBusquedaProps) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Buscar por nombre o email..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
      />
    </div>
  );
}

export default BarraBusqueda;
```

**Explicación**:
- Input controlado simple.
- **Línea 14** (`focus:ring-2 focus:ring-blue-500`): Efecto de foco azul alrededor del input.

---

## Paso 9: App.tsx - Integrar todo

**Modifica `src/App.tsx`**:

```tsx
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Navegacion from './components/Navegacion';
import TarjetaEstadistica from './components/TarjetaEstadistica';
import TablaUsuarios from './components/TablaUsuarios';
import ListaTareas from './components/ListaTareas';
import BarraBusqueda from './components/BarraBusqueda';
import { Usuario, Tarea, VistaDashboard, FiltroTarea } from './types';

function App() {
  // Estados de datos
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [tareas, setTareas] = useState<Tarea[]>([]);

  // Estados de UI
  const [vistaActual, setVistaActual] = useState<VistaDashboard>('inicio');
  const [busqueda, setBusqueda] = useState('');
  const [filtroTarea, setFiltroTarea] = useState<FiltroTarea>('todas');

  // Estados de carga y error
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Cargar datos al montar
  useEffect(() => {
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()),
      fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json())
    ])
      .then(([usuariosData, tareasData]) => {
        setUsuarios(usuariosData);
        setTareas(tareasData.slice(0, 20)); // Solo primeras 20
        setCargando(false);
      })
      .catch(() => {
        setError('Error al cargar los datos');
        setCargando(false);
      });
  }, []);

  // Calcular estadísticas
  const tareasCompletadas = tareas.filter(t => t.completed).length;
  const tareasPendientes = tareas.filter(t => !t.completed).length;

  // Renderizado de carga
  if (cargando) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  // Renderizado de error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <h3 className="text-red-800 font-bold text-lg mb-2">Error</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Navegacion vistaActual={vistaActual} cambiarVista={setVistaActual} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Vista Inicio */}
        {vistaActual === 'inicio' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Resumen general</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <TarjetaEstadistica
                titulo="Total Usuarios"
                valor={usuarios.length}
                icono="👥"
                color="blue"
              />
              <TarjetaEstadistica
                titulo="Tareas Completadas"
                valor={tareasCompletadas}
                icono="✅"
                color="green"
              />
              <TarjetaEstadistica
                titulo="Tareas Pendientes"
                valor={tareasPendientes}
                icono="⏳"
                color="purple"
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Actividad reciente
              </h3>
              <p className="text-gray-600">
                El sistema está gestionando {usuarios.length} usuarios y {tareas.length} tareas.
                {tareasCompletadas > 0 && ` ${((tareasCompletadas / tareas.length) * 100).toFixed(0)}% de las tareas están completadas.`}
              </p>
            </div>
          </div>
        )}

        {/* Vista Usuarios */}
        {vistaActual === 'usuarios' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Gestión de usuarios ({usuarios.length})
            </h2>
            <BarraBusqueda busqueda={busqueda} setBusqueda={setBusqueda} />
            <TablaUsuarios usuarios={usuarios} busqueda={busqueda} />
          </div>
        )}

        {/* Vista Tareas */}
        {vistaActual === 'tareas' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Gestión de tareas ({tareas.length})
              </h2>
              <div className="flex space-x-2">
                {(['todas', 'completadas', 'pendientes'] as FiltroTarea[]).map(filtro => (
                  <button
                    key={filtro}
                    onClick={() => setFiltroTarea(filtro)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      filtroTarea === filtro
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {filtro.charAt(0).toUpperCase() + filtro.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <ListaTareas tareas={tareas} filtro={filtroTarea} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
```

**Explicación de secciones clave**:

- **Líneas 12-22**: Todos los estados necesarios organizados por categoría.
- **Líneas 25-39** (`useEffect` con `Promise.all`): Carga ambas APIs en paralelo.
- **Líneas 42-43**: Calcula estadísticas dinámicamente.
- **Líneas 47-56**: Estado de carga con spinner.
- **Líneas 59-67**: Estado de error.
- **Líneas 74-108**: Vista de inicio con tarjetas de estadísticas.
- **Líneas 111-118**: Vista de usuarios con búsqueda.
- **Líneas 121-146**: Vista de tareas con filtros.

---

## Paso 10: Toques finales y optimizaciones

### Mejora 1: Añadir transiciones entre vistas

Las vistas cambian abruptamente. Vamos a añadir una animación de fade.

**Añade a `src/index.css`** (después de las directivas de Tailwind):

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}
```

**Modifica las secciones de vista en App.tsx**, añadiendo `className="fade-in"`:

```tsx
{vistaActual === 'inicio' && (
  <div className="fade-in">
    {/* ... contenido ... */}
  </div>
)}

{vistaActual === 'usuarios' && (
  <div className="fade-in">
    {/* ... contenido ... */}
  </div>
)}

{vistaActual === 'tareas' && (
  <div className="fade-in">
    {/* ... contenido ... */}
  </div>
)}
```

### Mejora 2: Indicador de cantidad en navegación

Muestra cuántos elementos hay en cada vista.

**Modifica `Navegacion.tsx`**:

```tsx
interface NavegacionProps {
  vistaActual: VistaDashboard;
  cambiarVista: (vista: VistaDashboard) => void;
  contadores?: {  // Prop opcional
    usuarios: number;
    tareas: number;
  };
}

function Navegacion({ vistaActual, cambiarVista, contadores }: NavegacionProps) {
  const vistas: { id: VistaDashboard; nombre: string; contador?: number }[] = [
    { id: 'inicio', nombre: 'Inicio' },
    { id: 'usuarios', nombre: 'Usuarios', contador: contadores?.usuarios },
    { id: 'tareas', nombre: 'Tareas', contador: contadores?.tareas }
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-8">
          {vistas.map(vista => (
            <button
              key={vista.id}
              onClick={() => cambiarVista(vista.id)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors flex items-center ${
                vistaActual === vista.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {vista.nombre}
              {vista.contador !== undefined && (
                <span className="ml-2 bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
                  {vista.contador}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

**Actualiza el uso en App.tsx**:

```tsx
<Navegacion
  vistaActual={vistaActual}
  cambiarVista={setVistaActual}
  contadores={{
    usuarios: usuarios.length,
    tareas: tareas.length
  }}
/>
```

---

## ⚠️ Errores comunes (y cómo solucionarlos)

### Error #1: "Type 'string' is not assignable to type 'VistaDashboard'"

**Te pasa cuando**: Intentas asignar un string genérico a un tipo literal.

**Ejemplo que causa error**:
```tsx
const vista = 'inicio';  // tipo: string
setVistaActual(vista);   // Error: string no es VistaDashboard
```

**Cómo se soluciona**:
Usa `as const` o especifica el tipo:
```tsx
const vista: VistaDashboard = 'inicio';
// O
const vista = 'inicio' as const;
```

### Error #2: "Cannot read properties of undefined (reading 'length')"

**Te pasa cuando**: Intentas acceder a `.length` de un array que aún no se cargó.

**Por qué pasa**: El estado inicial es `[]`, pero si hay un error, podría ser `undefined`.

**Cómo se soluciona**:
Usa optional chaining:
```tsx
const total = usuarios?.length || 0;
```

O asegúrate de que el estado inicial siempre sea un array:
```tsx
const [usuarios, setUsuarios] = useState<Usuario[]>([]);  // ✅ Siempre array
```

### Error #3: "Each child in a list should have a unique 'key' prop"

**Te pasa cuando**: Mapeas un array pero olvidas la prop `key`.

**Cómo se soluciona**:
Siempre añade `key` al elemento raíz del `.map()`:
```tsx
{usuarios.map(usuario => (
  <div key={usuario.id}>  {/* ✅ Key presente */}
    {/* ... */}
  </div>
))}
```

---

## 💡 Tips del profesor

> **De mi experiencia enseñando**: Los proyectos grandes asustan al principio. La clave es descomponerlos en piezas pequeñas. No intentes construir todo el dashboard de una vez. Construye un componente, verifica que funciona, luego pasa al siguiente. Metodología: componente por componente, vista por vista.

> **Otro tip importante**: Usa `console.log` generosamente mientras desarrollas. Loguea los datos de la API cuando llegan, loguea el estado cuando cambia, loguea las props que llegan a los componentes. Es la forma más rápida de entender qué está pasando y encontrar bugs.

> **Sobre la organización del código**: Cuando un componente llega a 150-200 líneas, considera dividirlo en componentes más pequeños. `App.tsx` con 300+ líneas está bien para un proyecto de aprendizaje, pero en producción lo dividirías más. No hay regla estricta, usa tu juicio.

> **Estado vs props, recordatorio**: Si solo un componente necesita el dato, ponlo en el estado de ese componente. Si varios componentes necesitan el dato, sube el estado al componente padre común más cercano. Este patrón se llama "lifting state up" (elevar el estado).

> **Debugging de renders**: Si tu app se vuelve lenta, probablemente estés re-renderizando demasiado. Usa React Developer Tools (extensión de navegador) para ver qué componentes se re-renderizan y cuándo. Es invaluable.

---

## Tu turno: Mejoras adicionales

Has construido un dashboard funcional. Ahora es tu turno de llevarlo al siguiente nivel con estas mejoras opcionales.

### Mejora 1: Persistencia de vista (15 min)

**Objetivo**: Recordar qué vista estaba viendo el usuario aunque recargue la página.

**Pistas**:
1. Usa `localStorage` para guardar la vista actual
2. En `useEffect`, lee `localStorage` al montar y establece la vista
3. Cada vez que cambie `vistaActual`, guárdalo en `localStorage`

**Código inicial**:
```tsx
useEffect(() => {
  const vistaGuardada = localStorage.getItem('vistaActual');
  if (vistaGuardada) {
    setVistaActual(vistaGuardada as VistaDashboard);
  }
}, []);

useEffect(() => {
  localStorage.setItem('vistaActual', vistaActual);
}, [vistaActual]);
```

### Mejora 2: Ordenamiento de tabla de usuarios (20 min)

**Objetivo**: Permitir ordenar usuarios por nombre, email, o empresa al hacer clic en los encabezados.

**Pistas**:
1. Añade un estado `ordenPor: 'nombre' | 'email' | 'empresa'`
2. Añade un estado `ordenAsc: boolean` (ascendente o descendente)
3. Haz que los `<th>` sean clickeables
4. Ordena el array antes de mostrarlo usando `.sort()`

### Mejora 3: Paginación de tareas (25 min)

**Objetivo**: Mostrar 9 tareas por página con botones de navegación.

**Pistas**:
1. Añade estados `paginaActual` y `tareasPorPagina`
2. Calcula `tareasMostrar` usando `.slice()`:
```tsx
const inicio = (paginaActual - 1) * tareasPorPagina;
const fin = inicio + tareasPorPagina;
const tareasMostrar = tareasFiltradas.slice(inicio, fin);
```
3. Crea botones "Anterior" y "Siguiente"
4. Muestra "Página X de Y"

### Mejora 4: Modal de detalles de usuario (30 min)

**Objetivo**: Al hacer clic en un usuario de la tabla, mostrar un modal con toda su información completa.

**Pistas**:
1. Añade estado `usuarioSeleccionado: Usuario | null`
2. Crea un componente `ModalUsuario` que se muestre solo si `usuarioSeleccionado !== null`
3. El modal debe tener fondo oscuro semi-transparente
4. Debe mostrar toda la info del usuario (dirección, sitio web, etc.)
5. Debe cerrarse al hacer clic fuera o en un botón "Cerrar"

### Mejora 5: Gráfico de progreso (avanzado, 40 min)

**Objetivo**: Mostrar una barra de progreso visual del porcentaje de tareas completadas.

**Pistas**:
1. Calcula el porcentaje: `(tareasCompletadas / tareas.length) * 100`
2. Crea un componente `BarraProgreso` que reciba el porcentaje
3. Usa un `<div>` con ancho dinámico: `style={{ width: `${porcentaje}%` }}`
4. Añade animación de llenado usando transitions de Tailwind
5. Muestra el número dentro de la barra

---

## Resumen en 3 puntos

Hoy aprendiste:

1. **Planificar antes de codear**: Descomponer una aplicación compleja en componentes pequeños y manejables es la clave del éxito. Antes de escribir código, dibuja la estructura de componentes y define las interfaces TypeScript. Esto ahorra horas de refactorización después.

2. **Integrar múltiples conceptos**: Combinaste componentes, props, estado, hooks, APIs y Tailwind en una aplicación coherente. Viste cómo el estado fluye de padres a hijos mediante props, cómo los eventos fluyen de hijos a padres mediante callbacks, y cómo los datos de APIs se transforman en interfaces interactivas.

3. **Construir proyectos completos es diferente a hacer ejercicios**: En ejercicios simples, todo está claro. En proyectos reales, tomas decisiones constantemente: dónde poner el estado, cómo nombrar componentes, cuándo crear un componente nuevo vs. ampliar uno existente. Estas decisiones vienen con la práctica. Cada proyecto que construyas te hace mejor en tomar estas decisiones.

---

## Siguiente paso

**¡Felicidades por completar el Módulo 4!** Has pasado de cero conocimiento de React a construir un dashboard completo con componentes reutilizables, manejo de estado, integración con APIs y diseño responsive profesional.

En el **Módulo 5: Desarrollo Backend con Claude**, aprenderás a crear tu propia API REST con Node.js y Express, conectarla a bases de datos, implementar autenticación, y finalmente conectar tu frontend React con tu propio backend. Es cuando tendrás el stack completo (frontend + backend) y podrás construir aplicaciones web de principio a fin.

---

**Reflexión final**: Has construido algo real y funcional. Este dashboard no es un ejercicio de juguete; es una aplicación que, con pequeños ajustes, podría usarse en un contexto real. Míralo funcionando en tu navegador. Cambia entre vistas. Busca usuarios. Filtra tareas. Todo eso lo construiste tú, línea por línea, componente por componente.

Guarda este proyecto en GitHub, toma capturas de pantalla, añádelo a tu portafolio. Cuando en una entrevista te pregunten "¿Has trabajado con React?", tendrás un proyecto completo que mostrar, no solo teoría.

Estás listo para el siguiente nivel. Nos vemos en el Módulo 5.
