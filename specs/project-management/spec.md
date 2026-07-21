# Specification: Software Testing

## 1. Información del Módulo

**Módulo:** Pruebas y Aseguramiento de Calidad

**Identificador:** TEST-001

**Estado:** Implementado ✅

**Descripción:**

El módulo de pruebas define las estrategias utilizadas para validar el correcto funcionamiento de TaskFlow, verificando la calidad del software mediante pruebas funcionales y técnicas de automatización.


---

# 2. Objetivo

Garantizar que los componentes principales del sistema cumplan con los requerimientos definidos, reduciendo errores y asegurando la confiabilidad de la aplicación.


---

# 3. Estrategia de Pruebas

El sistema contempla diferentes niveles de validación:

## Pruebas funcionales

Permiten verificar que las funcionalidades principales cumplan con los requisitos establecidos.

Ejemplos:

- Inicio de sesión.
- Gestión de proyectos.
- Gestión de tareas.
- Navegación del sistema.


## Pruebas de API

Permiten validar la comunicación entre frontend y backend.

Se verifican:

- Respuestas HTTP.
- Parámetros enviados.
- Manejo de errores.
- Acceso autorizado.


## Pruebas automatizadas

Se utilizan herramientas para ejecutar validaciones repetibles sobre los servicios backend.


---

# 4. Herramientas Utilizadas

## Jest

Framework utilizado para la ejecución de pruebas automatizadas en el backend.


## Supertest

Biblioteca utilizada para realizar pruebas sobre endpoints HTTP.


## Postman

Herramienta utilizada para validar manualmente los servicios REST.


---

# 5. Casos de Prueba Principales

| ID | Caso de prueba | Resultado esperado |
|---|---|---|
| CP-01 | Login con credenciales válidas | Usuario autenticado correctamente |
| CP-02 | Login con credenciales incorrectas | Sistema rechaza acceso |
| CP-03 | Consulta de proyectos | Retorna proyectos registrados |
| CP-04 | Creación de proyecto | Proyecto almacenado correctamente |
| CP-05 | Consulta de tareas | Retorna tareas asociadas |
| CP-06 | Acceso sin token JWT | Solicitud rechazada |


---

# 6. Criterios de Aceptación

| ID | Criterio |
|---|---|
| CA-01 | Los endpoints responden correctamente |
| CA-02 | Las rutas protegidas requieren autenticación |
| CA-03 | Las operaciones CRUD funcionan correctamente |
| CA-04 | Los errores son controlados adecuadamente |
| CA-05 | Las pruebas automatizadas se ejecutan sin fallos críticos |


---

# 7. Flujo de Validación


Especificación del requerimiento
|
v
Diseño del módulo
|
v
Implementación
|
v
Ejecución de pruebas
|
v
Validación de resultados



---

# 8. Relación con Spec-Driven Development

Las pruebas se encuentran relacionadas con las especificaciones funcionales de cada módulo.

La trazabilidad permite verificar:


Requerimiento
|
v
Criterio de aceptación
|
v
Caso de prueba
|
v
Resultado obtenido



---

# 9. Trazabilidad


TEST-001
|
├── Pruebas Backend
|
├── Validación API REST
|
├── Pruebas funcionales
|
└── Reportes de calidad