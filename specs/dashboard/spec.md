# Specification: Dashboard

## 1. Información del Módulo

**Módulo:** Dashboard y Visualización de Métricas

**Identificador:** DASH-001

**Estado:** Implementado ✅

**Descripción:**

El módulo Dashboard proporciona una vista general del estado de los proyectos y tareas del usuario mediante indicadores, gráficos y elementos visuales que facilitan el seguimiento del trabajo.


---

# 2. Objetivo

Mostrar información resumida y relevante del sistema para permitir al usuario conocer el progreso de sus proyectos y el estado actual de sus actividades.


---

# 3. Requerimientos Funcionales

## RF-DASH-01: Vista general del sistema

El sistema debe mostrar un panel principal con información resumida de los proyectos y tareas registrados.


## RF-DASH-02: Indicadores estadísticos

El sistema debe presentar métricas relacionadas con:

- Cantidad de proyectos.
- Cantidad de tareas.
- Tareas pendientes.
- Tareas completadas.


## RF-DASH-03: Visualización gráfica

El sistema debe representar información mediante componentes visuales como gráficos y tarjetas estadísticas.


## RF-DASH-04: Actividad reciente

El dashboard debe mostrar información relacionada con las últimas acciones realizadas dentro del sistema.


## RF-DASH-05: Personalización visual

El sistema debe permitir cambiar la apariencia de la interfaz mediante modo claro y modo oscuro.


---

# 4. Componentes Principales

## Tarjetas estadísticas

Permiten mostrar información rápida:

- Total de proyectos.
- Total de tareas.
- Tareas completadas.
- Tareas pendientes.


## Gráficos

Permiten interpretar visualmente el estado de las actividades mediante representaciones estadísticas.


## Panel de actividades

Muestra eventos recientes relacionados con el trabajo del usuario.


---

# 5. Consideraciones Técnicas

## Frontend

Tecnologías:

- React.
- Recharts.
- CSS.
- Lucide Icons.


Responsabilidades:

- Renderización de datos.
- Actualización dinámica de información.
- Interacción con componentes visuales.


## Backend

Responsabilidades:

- Proporcionar información estadística.
- Consultar datos agregados.
- Entregar información mediante API REST.


---

# 6. Criterios de Aceptación

| ID | Criterio |
|---|---|
| CA-01 | El usuario puede acceder al dashboard después de autenticarse |
| CA-02 | Se muestran correctamente los indicadores principales |
| CA-03 | Los gráficos representan información real del sistema |
| CA-04 | La información se actualiza según los datos registrados |
| CA-05 | El usuario puede cambiar entre modo claro y oscuro |


---

# 7. Flujo del Módulo


Usuario autenticado
|
v
Acceso al Dashboard
|
v
Solicitud de información
|
v
API REST Backend
|
v
Consulta SQL Server
|
v
Procesamiento de datos
|
v
Visualización en React



---

# 8. Relación con Otros Módulos

Este módulo utiliza información proveniente de:

- User Authentication:
  - Identificación del usuario actual.

- Project Management:
  - Cantidad y estado de proyectos.

- Task Management:
  - Información de tareas y progreso.


---

# 9. Trazabilidad


DASH-001
|
├── Componentes React
|
├── Servicios API
|
├── Visualizaciones estadísticas
|
└── Validaciones funcionales