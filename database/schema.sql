IF DB_ID('TaskFlowDB') IS NULL
BEGIN
    CREATE DATABASE TaskFlowDB;
END
GO

USE TaskFlowDB;
GO

IF OBJECT_ID('dbo.tareas', 'U') IS NOT NULL DROP TABLE dbo.tareas;
IF OBJECT_ID('dbo.proyectos', 'U') IS NOT NULL DROP TABLE dbo.proyectos;
IF OBJECT_ID('dbo.usuarios', 'U') IS NOT NULL DROP TABLE dbo.usuarios;
GO

CREATE TABLE usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(30) NOT NULL DEFAULT 'usuario',
    fecha_creacion DATETIME NOT NULL DEFAULT GETDATE()
);
GO

CREATE TABLE proyectos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255) NULL,
    fecha_inicio DATE NULL,
    fecha_fin DATE NULL,
    estado VARCHAR(30) NOT NULL DEFAULT 'Activo',
    usuario_id INT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_proyectos_usuarios
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
GO

CREATE TABLE tareas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255) NULL,
    estado VARCHAR(30) NOT NULL,
    prioridad VARCHAR(20) NOT NULL,
    fecha_limite DATE NULL,
    proyecto_id INT NOT NULL,
    usuario_id INT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_tareas_proyectos
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id),

    CONSTRAINT FK_tareas_usuarios
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
GO