BEGIN TRANSACTION;

-- 
-- Tokens
-- Tabla para almacenar los api-key de la aplicación
-- 
DROP TABLE IF EXISTS tokens CASCADE;
CREATE TABLE tokens (
    pk bigserial NOT NULL,
    rut int NOT NULL,
    password varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    api_key varchar(255) NOT NULL,
    role varchar(255) NOT NULL DEFAULT 'Estudiante',
    UNIQUE (rut),
    UNIQUE (api_key),
    PRIMARY KEY (pk)
);



--
-- Teachers
-- Tabla para almacenar los profesores
--
DROP TABLE IF EXISTS teachers CASCADE;
CREATE TABLE teachers (
    pk bigserial NOT NULL,
    rut int NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    gender int NOT NULL DEFAULT '0',
    birthdate date NOT NULL,
    UNIQUE (rut),
    PRIMARY KEY (pk)
);



--
-- Students
-- Tabla para almacenar los estudiantes
-- 
DROP TABLE IF EXISTS students CASCADE;
CREATE TABLE students (
    pk bigserial NOT NULL,
    rut int NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    gender int NOT NULL DEFAULT '0',
    birthdate date NOT NULL,
    UNIQUE (rut),
    PRIMARY KEY (pk)
);



--
-- Subjects
-- Tabla de las asignaturas
--
DROP TABLE IF EXISTS subjects CASCADE;
CREATE TABLE subjects (
    pk bigserial NOT NULL,
    code varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    created date NOT NULL DEFAULT NOW(),
    UNIQUE (code),
    PRIMARY KEY (pk)
);


--
-- courses
-- Cursos existentes
--
DROP TABLE IF EXISTS courses CASCADE;
CREATE TABLE courses (
    pk bigserial NOT NULL,
    code bigint NOT NULL, -- Código Dirdoc
    ordinal int DEFAULT '1',
    year int NOT NULL,
    subject_fk bigint NOT NULL REFERENCES subjects(pk) ON UPDATE CASCADE ON DELETE CASCADE,
    teacher_fk bigint NOT NULL REFERENCES teachers(pk) ON UPDATE CASCADE ON DELETE CASCADE,
    section int NOT NULL DEFAULT '1',
    UNIQUE (code),
    PRIMARY KEY (pk)
);



--
-- finished_courses
-- Cursos Terminados con notas
--
DROP TABLE IF EXISTS finished_courses CASCADE;
CREATE TABLE finished_courses (
    pk bigserial NOT NULL,
    course_fk bigint NOT NULL REFERENCES courses(pk) ON UPDATE CASCADE ON DELETE CASCADE,
    student_fk bigint NOT NULL REFERENCES students(pk) ON UPDATE CASCADE ON DELETE CASCADE,
    grade numeric(2,1) NOT NULL,
    status int NOT NULL DEFAULT '0',
    UNIQUE (course_fk, student_fk),
    PRIMARY KEY (pk)
);


COMMIT;
