# Specification: Task Management

## 1. Información del Módulo

**Módulo:** Gestión de Tareas

**Identificador:** TASK-001

**Estado:** Implementado ✅

**Descripción:**

El módulo de gestión de tareas permite registrar, organizar y realizar seguimiento de actividades asociadas a proyectos, facilitando el control del avance mediante estados y prioridades.


---

# 2. Objetivo

Permitir a los usuarios administrar las actividades de un proyecto mediante la creación, actualización, eliminación y seguimiento visual de tareas.


---

# 3. Requerimientos Funcionales

## RF-TASK-01: Crear tarea

El sistema debe permitir registrar nuevas tareas asociadas a un proyecto existente.


## RF-TASK-02: Visualizar tareas

El sistema debe mostrar las tareas pertenecientes a un proyecto seleccionado.


## RF-TASK-03: Actualizar tarea

El usuario debe poder modificar la información de una tarea registrada.


## RF-TASK-04: Eliminar tarea

El sistema debe permitir eliminar tareas que ya no sean necesarias.


## RF-TASK-05: Gestión de estados

El sistema debe permitir controlar el estado de las tareas mediante diferentes etapas:

- Pendiente.
- En progreso.
- Completada.


## RF-TASK-06: Gestión de prioridades

Cada tarea debe permitir definir un nivel de prioridad:

- Alta.
- Media.
- Baja.


## RF-TASK-07: Asociación con proyectos

Cada tarea debe pertenecer a un proyecto específico dentro del sistema.


---

# 4. Modelo de Datos

Entidad principal:

## Tarea

Atributos principales:

| Campo | Descripción |
|---|---|
| id_tarea | Identificador único |
| titulo | Nombre de la tarea |
| descripcion | Detalle de la actividad |
| estado | Estado actual |
| prioridad | Nivel de importancia |
| fecha_limite | Fecha de cumplimiento |
| id_proyecto | Proyecto asociado |


Relación:


Proyecto
|
| 1:N
|
Tarea



---

# 5. Consideraciones Técnicas

## Backend

Responsabilidades:

- Gestión de endpoints REST.
- Validación de información.
- Aplicación de reglas de negocio.
- Persistencia en SQL Server.


Operaciones principales:

- Crear tarea.
- Consultar tareas.
- Actualizar tarea.
- Eliminar tarea.


## Frontend

Tecnologías:

- React.
- Axios.
- Componentes reutilizables.


Funcionalidades:

- Lista de tareas.
- Formularios de gestión.
- Organización visual mediante Kanban.
- Actualización dinámica del estado.


---

# 6. Criterios de Aceptación

| ID | Criterio |
|---|---|
| CA-01 | El usuario puede crear tareas dentro de un proyecto |
| CA-02 | Las tareas se muestran correctamente |
| CA-03 | El usuario puede modificar una tarea |
| CA-04 | El usuario puede eliminar una tarea |
| CA-05 | Las tareas mantienen relación con su proyecto |
| CA-06 | El estado de una tarea puede actualizarse |
| CA-07 | La prioridad permite clasificar actividades |


---

# 7. Flujo del Módulo


Usuario
|
v
Selecciona proyecto
|
v
Gestiona tareas
|
v
Frontend React
|
v
API REST
|
v
Backend Node.js
|
v
SQL Server



---

# 8. Tablero Kanban

El módulo incorpora una representación visual de las tareas mediante columnas según su estado:


+-------------+-------------+-------------+
| Pendiente | En progreso | Completada |
+-------------+-------------+-------------+
| Tarea 1 | Tarea 3 | Tarea 5 |
| Tarea 2 | Tarea 4 | |
+-------------+-------------+-------------+



---

# 9. Relación con Otros Módulos

Este módulo se integra con:

- Project Management:
  - Las tareas pertenecen a proyectos existentes.

- Dashboard:
  - Proporciona información estadística sobre avance y pendientes.

- Testing:
  - Permite validar operaciones CRUD.


---

# 10. Trazabilidad


TASK-001
|
├── Modelo Tarea
|
├── API de tareas
|
├── Interfaz Kanban
|
└── Pruebas funcionales