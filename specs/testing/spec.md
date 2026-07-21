# Specification: Project Management

## 1. Información del Módulo

**Módulo:** Gestión de Proyectos

**Identificador:** PROJ-001

**Estado:** Implementado ✅

**Descripción:**

El módulo de gestión de proyectos permite a los usuarios crear, consultar, actualizar y eliminar proyectos dentro de la plataforma TaskFlow, facilitando la organización de actividades colaborativas.


---

# 2. Objetivo

Permitir la administración eficiente de proyectos mediante operaciones CRUD, manteniendo la información organizada y relacionada con los usuarios responsables.


---

# 3. Requerimientos Funcionales

## RF-PROJ-01: Crear proyecto

El sistema debe permitir a un usuario autenticado registrar nuevos proyectos proporcionando la información necesaria.


## RF-PROJ-02: Visualizar proyectos

El sistema debe mostrar al usuario los proyectos asociados a su cuenta.


## RF-PROJ-03: Actualizar proyecto

El usuario debe poder modificar la información de un proyecto existente.


## RF-PROJ-04: Eliminar proyecto

El sistema debe permitir eliminar proyectos registrados cuando el usuario tenga permisos.


## RF-PROJ-05: Buscar proyectos

El sistema debe permitir realizar búsquedas para facilitar la ubicación de proyectos.


## RF-PROJ-06: Asociación usuario-proyecto

Cada proyecto debe estar asociado al usuario que lo creó.


---

# 4. Modelo de Datos

Entidad principal:

## Proyecto

Atributos principales:

| Campo | Descripción |
|---|---|
| id_proyecto | Identificador único |
| nombre | Nombre del proyecto |
| descripcion | Información del proyecto |
| fecha_creacion | Fecha de registro |
| id_usuario | Usuario propietario |


Relación:


Usuario
|
| 1:N
|
Proyecto



---

# 5. Consideraciones Técnicas

## Backend

Tecnologías:

- Node.js.
- Express.
- API REST.
- SQL Server.

Responsabilidades:

- Gestión de endpoints.
- Validación de datos.
- Comunicación con base de datos.


## Frontend

Tecnologías:

- React.
- Axios.
- React Router.

Funcionalidades:

- Vista de proyectos.
- Formularios de creación y edición.
- Tarjetas visuales.
- Acciones CRUD.


---

# 6. Criterios de Aceptación

| ID | Criterio |
|---|---|
| CA-01 | El usuario puede crear un proyecto |
| CA-02 | Los proyectos registrados se muestran correctamente |
| CA-03 | El usuario puede editar proyectos existentes |
| CA-04 | El usuario puede eliminar proyectos |
| CA-05 | Los proyectos pertenecen al usuario autenticado |
| CA-06 | La búsqueda permite encontrar proyectos registrados |


---

# 7. Flujo del Módulo


Usuario autenticado
|
v
Dashboard / Gestión de proyectos
|
v
Solicitud HTTP
|
v
API REST Backend
|
v
Validación y lógica de negocio
|
v
SQL Server
|
v
Respuesta al usuario



---

# 8. Relación con Otros Módulos

Este módulo se integra con:

- User Authentication:
  - Identificación del usuario propietario.

- Task Management:
  - Asociación de tareas a proyectos.

- Dashboard:
  - Visualización de métricas de proyectos.


---

# 9. Trazabilidad


PROJ-001
|
├── Modelo Proyecto
|
├── API CRUD Proyectos
|
├── Interfaz React
|
└── Pruebas funcionales

