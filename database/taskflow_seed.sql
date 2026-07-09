USE TaskFlowDB;
GO

-- Proyectos demo
INSERT INTO proyectos (nombre, descripcion, fecha_inicio, fecha_fin, estado, usuario_id)
VALUES
('Desarrollo TaskFlow', 'Sistema web para gestión de proyectos y tareas', '2026-07-08', '2026-08-05', 'Activo', 1),
('Sistema de Inventario', 'Control de productos, stock y reportes', '2026-07-10', '2026-08-10', 'Activo', 1),
('Plataforma E-learning', 'Gestión de cursos, estudiantes y certificados', '2026-07-12', '2026-08-15', 'Activo', 1),
('Startup Nova', 'Landing page y panel administrativo', '2026-07-14', '2026-08-20', 'En progreso', 1),
('Tienda Virtual', 'Catálogo, carrito y pagos en línea', '2026-07-16', '2026-08-25', 'Activo', 1),
('Clínica San Miguel', 'Sistema para pacientes, citas e historial clínico', '2026-07-18', '2026-09-01', 'Activo', 1),
('Gestión Documental', 'Subida, versionado y firma digital de archivos', '2026-07-20', '2026-09-05', 'En progreso', 1),
('App Delivery', 'Gestión de pedidos, rutas y repartidores', '2026-07-22', '2026-09-10', 'Activo', 1),
('Portal Universitario', 'Matrícula, horarios, pagos y consultas académicas', '2026-07-24', '2026-09-15', 'Activo', 1),
('Sistema Bancario', 'Gestión de clientes, transferencias y auditoría', '2026-07-26', '2026-09-20', 'Activo', 1);
GO

DECLARE @TaskFlow INT = (SELECT id FROM proyectos WHERE nombre = 'Desarrollo TaskFlow' AND usuario_id = 1);
DECLARE @Inventario INT = (SELECT id FROM proyectos WHERE nombre = 'Sistema de Inventario' AND usuario_id = 1);
DECLARE @ELearning INT = (SELECT id FROM proyectos WHERE nombre = 'Plataforma E-learning' AND usuario_id = 1);
DECLARE @Nova INT = (SELECT id FROM proyectos WHERE nombre = 'Startup Nova' AND usuario_id = 1);
DECLARE @Tienda INT = (SELECT id FROM proyectos WHERE nombre = 'Tienda Virtual' AND usuario_id = 1);
DECLARE @Clinica INT = (SELECT id FROM proyectos WHERE nombre = 'Clínica San Miguel' AND usuario_id = 1);
DECLARE @Documental INT = (SELECT id FROM proyectos WHERE nombre = 'Gestión Documental' AND usuario_id = 1);
DECLARE @Delivery INT = (SELECT id FROM proyectos WHERE nombre = 'App Delivery' AND usuario_id = 1);
DECLARE @Portal INT = (SELECT id FROM proyectos WHERE nombre = 'Portal Universitario' AND usuario_id = 1);
DECLARE @Banco INT = (SELECT id FROM proyectos WHERE nombre = 'Sistema Bancario' AND usuario_id = 1);

-- Tareas demo
INSERT INTO tareas (titulo, descripcion, estado, prioridad, fecha_limite, proyecto_id, usuario_id)
VALUES
('Implementar Login JWT', 'Autenticación segura con token JWT', 'Completada', 'Alta', '2026-07-12', @TaskFlow, 1),
('CRUD de Proyectos', 'Crear, listar, actualizar y eliminar proyectos', 'En progreso', 'Alta', '2026-07-16', @TaskFlow, 1),
('Dashboard dinámico', 'Mostrar estadísticas reales desde la API', 'Pendiente', 'Media', '2026-07-20', @TaskFlow, 1),

('Crear base de datos', 'Diseñar tablas principales del inventario', 'Completada', 'Alta', '2026-07-13', @Inventario, 1),
('Gestión de productos', 'CRUD de productos y categorías', 'En progreso', 'Media', '2026-07-21', @Inventario, 1),
('Reportes de stock', 'Generar reportes por bajo inventario', 'Pendiente', 'Baja', '2026-07-28', @Inventario, 1),

('Registro de alumnos', 'Formulario y validación de estudiantes', 'Completada', 'Alta', '2026-07-15', @ELearning, 1),
('Carga de cursos', 'Crear módulos para subir cursos', 'En progreso', 'Media', '2026-07-24', @ELearning, 1),
('Certificados PDF', 'Generar certificados descargables', 'Pendiente', 'Baja', '2026-08-01', @ELearning, 1),

('Diseñar landing page', 'Página principal de presentación', 'Completada', 'Media', '2026-07-17', @Nova, 1),
('Panel administrativo', 'Dashboard interno para administradores', 'En progreso', 'Alta', '2026-07-27', @Nova, 1),
('Integración de pagos', 'Conectar pasarela de pagos', 'Pendiente', 'Alta', '2026-08-05', @Nova, 1),

('Catálogo de productos', 'Listado visual de productos', 'Completada', 'Media', '2026-07-18', @Tienda, 1),
('Carrito de compras', 'Agregar productos y calcular total', 'En progreso', 'Alta', '2026-07-29', @Tienda, 1),
('Checkout', 'Proceso final de compra', 'Pendiente', 'Alta', '2026-08-08', @Tienda, 1),

('Gestión de pacientes', 'Registrar y actualizar datos de pacientes', 'Completada', 'Alta', '2026-07-19', @Clinica, 1),
('Agenda de citas', 'Programar citas médicas', 'En progreso', 'Media', '2026-07-30', @Clinica, 1),
('Historial clínico', 'Consultar antecedentes médicos', 'Pendiente', 'Alta', '2026-08-10', @Clinica, 1),

('Subida de archivos', 'Carga segura de documentos', 'Completada', 'Baja', '2026-07-21', @Documental, 1),
('Versionado documental', 'Control de versiones por archivo', 'En progreso', 'Media', '2026-08-02', @Documental, 1),
('Firma digital', 'Validación de documentos firmados', 'Pendiente', 'Alta', '2026-08-12', @Documental, 1),

('Login de repartidores', 'Acceso seguro para usuarios delivery', 'Completada', 'Alta', '2026-07-22', @Delivery, 1),
('Gestión de pedidos', 'Seguimiento de pedidos en tiempo real', 'En progreso', 'Alta', '2026-08-04', @Delivery, 1),
('Geolocalización', 'Mapa con ubicación del repartidor', 'Pendiente', 'Media', '2026-08-14', @Delivery, 1),

('Módulo de matrícula', 'Registro de matrícula académica', 'Completada', 'Alta', '2026-07-23', @Portal, 1),
('Gestión de horarios', 'Visualización de horarios por estudiante', 'En progreso', 'Baja', '2026-08-06', @Portal, 1),
('Pagos académicos', 'Registro de pagos universitarios', 'Pendiente', 'Alta', '2026-08-16', @Portal, 1),

('Gestión de clientes', 'Registrar clientes bancarios', 'Completada', 'Alta', '2026-07-24', @Banco, 1),
('Transferencias', 'Operaciones entre cuentas', 'En progreso', 'Alta', '2026-08-08', @Banco, 1),
('Auditoría de operaciones', 'Registro y trazabilidad de transacciones', 'Pendiente', 'Alta', '2026-08-18', @Banco, 1);
GO

SELECT * FROM proyectos WHERE usuario_id = 1;
SELECT * FROM tareas WHERE usuario_id = 1;