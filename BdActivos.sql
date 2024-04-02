/*==============================================================*/
/* DBMS name:      PostgreSQL 8                                 */
/* Created on:     4/1/2024 5:54:07 PM                          */
/*==============================================================*/


drop index if exists ES_PARTE_DE_FK;

drop index if exists CATEGORIA_PK;

drop index if exists ACTIVOS_PK;

drop index if exists REALIZA_FK;

drop index if exists NUEVA_FK;

drop index if exists ANTERIOR_FK;

drop index if exists MOVIMIENTO_PK;

drop table if exists MOVIMIENTO;

drop table if exists ACTIVOS;

drop table if exists CATEGORIA;

drop index if exists ALBERGA_FK;

drop index if exists FORMA_PARTE_FK;

drop table if exists USUARIO_UBICACION;

drop index if exists UBICACION_PK;

drop table if exists UBICACION;

drop index if exists LOG_BD_PK;

drop table if exists LOG_BD;

drop index if exists PERTENECE_FK;

drop index if exists TIENE_FK;

drop table if exists USUARIO_ROL;

drop index if exists ROL_PK;

drop table if exists ROL;

drop index if exists USUARIO_PK;

drop table if exists USUARIO;

/*==============================================================*/
/* Table: ACTIVOS                                               */
/*==============================================================*/
create table ACTIVOS (
   ACTIVE_ID            SERIAL               not null,
   CATEGORY_ID          INT4                 not null,
   ACTIVE_NAME          VARCHAR(50)          not null,
   ACTIVE_DESCRIPTION   VARCHAR(100)         not null,
   ACTIVE_STOCK         INT4                 not null,
   ACTIVE_FLAG          BOOL                 not null,
   constraint PK_ACTIVOS primary key (ACTIVE_ID)
);

/*==============================================================*/
/* Index: ACTIVOS_PK                                            */
/*==============================================================*/
create unique index ACTIVOS_PK on ACTIVOS (
ACTIVE_ID
);

/*==============================================================*/
/* Index: ES_PARTE_DE_FK                                        */
/*==============================================================*/
create  index ES_PARTE_DE_FK on ACTIVOS (
CATEGORY_ID
);

/*==============================================================*/
/* Table: CATEGORIA                                             */
/*==============================================================*/
create table CATEGORIA (
   CATEGORY_ID          SERIAL               not null,
   CATEGORY_NAME        VARCHAR(50)          not null,
   CATEGORY_FLAG        BOOL                 not null,
   constraint PK_CATEGORIA primary key (CATEGORY_ID)
);

/*==============================================================*/
/* Index: CATEGORIA_PK                                          */
/*==============================================================*/
create unique index CATEGORIA_PK on CATEGORIA (
CATEGORY_ID
);

/*==============================================================*/
/* Table: LOG_BD                                                */
/*==============================================================*/
create table LOG_BD (
   ID_LOG               SERIAL               not null,
   NEW_LOG              VARCHAR(50)          null,
   OLD_LOG              VARCHAR(50)          null,
   TYPE                 VARCHAR(20)          not null,
   "TABLE"              VARCHAR(10)          not null,
   constraint PK_LOG_BD primary key (ID_LOG)
);

/*==============================================================*/
/* Index: LOG_BD_PK                                             */
/*==============================================================*/
create unique index LOG_BD_PK on LOG_BD (
ID_LOG
);

/*==============================================================*/
/* Table: MOVIMIENTO                                            */
/*==============================================================*/
create table MOVIMIENTO (
   MOVE_ID              SERIAL               not null,
   ACTIVE_ID            INT4                 not null,
   OLD_LOCATION_ID      INT4                 not null,
   NEW_LOCATION_ID      INT4                 not null,
   MOVE_DATE            DATE                 not null,
   MOVE_DETAIL          VARCHAR(100)         not null,
   MOVE_FLAG            BOOL                 not null,
   constraint PK_MOVIMIENTO primary key (MOVE_ID)
);

/*==============================================================*/
/* Index: MOVIMIENTO_PK                                         */
/*==============================================================*/
create unique index MOVIMIENTO_PK on MOVIMIENTO (
MOVE_ID
);

/*==============================================================*/
/* Index: ANTERIOR_FK                                           */
/*==============================================================*/
create  index ANTERIOR_FK on MOVIMIENTO (
OLD_LOCATION_ID
);

/*==============================================================*/
/* Index: REALIZA_FK                                            */
/*==============================================================*/
create  index REALIZA_FK on MOVIMIENTO (
ACTIVE_ID
);

/*==============================================================*/
/* Index: NUEVA_FK                                              */
/*==============================================================*/
create  index NUEVA_FK on MOVIMIENTO (
NEW_LOCATION_ID
);

/*==============================================================*/
/* Table: ROL                                                   */
/*==============================================================*/
create table ROL (
   ROLE_ID              SERIAL               not null,
   ROLE_NAME            VARCHAR(50)          not null,
   ROLE_FLAG            BOOL                 not null,
   constraint PK_ROL primary key (ROLE_ID)
);

/*==============================================================*/
/* Index: ROL_PK                                                */
/*==============================================================*/
create unique index ROL_PK on ROL (
ROLE_ID
);

/*==============================================================*/
/* Table: UBICACION                                             */
/*==============================================================*/
create table UBICACION (
   LOCATION_ID          SERIAL               not null,
   LOCATION_NAME        VARCHAR(50)          not null,
   LOCATION_DETAIL      VARCHAR(100)         not null,
   LOCATION_FLAG        BOOL                 not null,
   constraint PK_UBICACION primary key (LOCATION_ID)
);

/*==============================================================*/
/* Index: UBICACION_PK                                          */
/*==============================================================*/
create unique index UBICACION_PK on UBICACION (
LOCATION_ID
);

/*==============================================================*/
/* Table: USUARIO                                               */
/*==============================================================*/
create table USUARIO (
   USER_ID              SERIAL               not null,
   USERNAME             VARCHAR(50)          not null,
   NAMES                VARCHAR(50)          not null,
   LASTNAMES            VARCHAR(50)          not null,
   PASSWORD             VARCHAR(50)          not null,
   USER_FLAG            BOOL                 not null,
   constraint PK_USUARIO primary key (USER_ID)
);

/*==============================================================*/
/* Index: USUARIO_PK                                            */
/*==============================================================*/
create unique index USUARIO_PK on USUARIO (
USER_ID
);

/*==============================================================*/
/* Table: USUARIO_ROL                                           */
/*==============================================================*/
create table USUARIO_ROL (
   ROLE_ID              INT4                 not null,
   USER_ID              INT4                 not null,
   USER_ROLE_FLAG       BOOL                 not null
);

/*==============================================================*/
/* Index: TIENE_FK                                              */
/*==============================================================*/
create  index TIENE_FK on USUARIO_ROL (
ROLE_ID
);

/*==============================================================*/
/* Index: PERTENECE_FK                                          */
/*==============================================================*/
create  index PERTENECE_FK on USUARIO_ROL (
USER_ID
);

/*==============================================================*/
/* Table: USUARIO_UBICACION                                     */
/*==============================================================*/
create table USUARIO_UBICACION (
   USER_ID              INT4                 not null,
   LOCATION_ID          INT4                 not null,
   USER_LOCATION_FLAG   BOOL                 not null
);

/*==============================================================*/
/* Index: FORMA_PARTE_FK                                        */
/*==============================================================*/
create  index FORMA_PARTE_FK on USUARIO_UBICACION (
USER_ID
);

/*==============================================================*/
/* Index: ALBERGA_FK                                            */
/*==============================================================*/
create  index ALBERGA_FK on USUARIO_UBICACION (
LOCATION_ID
);

alter table ACTIVOS
   add constraint FK_ACTIVOS_ES_PARTE__CATEGORI foreign key (CATEGORY_ID)
      references CATEGORIA (CATEGORY_ID)
      on delete restrict on update restrict;

alter table MOVIMIENTO
   add constraint FK_MOVIMIEN_ANTERIOR_UBICACIO foreign key (OLD_LOCATION_ID)
      references UBICACION (LOCATION_ID)
      on delete restrict on update restrict;

alter table MOVIMIENTO
   add constraint FK_MOVIMIEN_NUEVA_UBICACIO foreign key (NEW_LOCATION_ID)
      references UBICACION (LOCATION_ID)
      on delete restrict on update restrict;

alter table MOVIMIENTO
   add constraint FK_MOVIMIEN_REALIZA_ACTIVOS foreign key (ACTIVE_ID)
      references ACTIVOS (ACTIVE_ID)
      on delete restrict on update restrict;

alter table USUARIO_ROL
   add constraint FK_USUARIO__PERTENECE_USUARIO foreign key (USER_ID)
      references USUARIO (USER_ID)
      on delete restrict on update restrict;

alter table USUARIO_ROL
   add constraint FK_USUARIO__TIENE_ROL foreign key (ROLE_ID)
      references ROL (ROLE_ID)
      on delete restrict on update restrict;

alter table USUARIO_UBICACION
   add constraint FK_USUARIO__ALBERGA_UBICACIO foreign key (LOCATION_ID)
      references UBICACION (LOCATION_ID)
      on delete restrict on update restrict;

alter table USUARIO_UBICACION
   add constraint FK_USUARIO__FORMA_PAR_USUARIO foreign key (USER_ID)
      references USUARIO (USER_ID)
      on delete restrict on update restrict;

INSERT INTO categoria(category_id, category_name, category_flag) VALUES (1,'Vehiculos', true);
INSERT INTO categoria(category_id, category_name, category_flag) VALUES (2,'Equipos informaticos', true);
INSERT INTO categoria(category_id, category_name, category_flag) VALUES (3,'Inmuebles', true);
INSERT INTO categoria(category_id, category_name, category_flag) VALUES (4,'Material de escritorio', true);

INSERT INTO rol(role_id, role_name, role_flag)VALUES (1, 'Administrador', true);
INSERT INTO rol(role_id, role_name, role_flag)VALUES (2, 'Usuario', true);

INSERT INTO usuario(user_id, username, names, lastnames, password, user_flag)VALUES (1, 'warce', 'William Omar', 'Arce Aguirre', 'a12345A!', true);
INSERT INTO usuario(user_id, username, names, lastnames, password, user_flag)VALUES (2, 'vabasto', 'Victor Eduardo', 'Abasto Perez', 'a12345A!', true);
INSERT INTO usuario(user_id, username, names, lastnames, password, user_flag)VALUES (3, 'gzurita', 'Gabriel', 'Zurita Gomez', 'a12345A!', true);
INSERT INTO usuario(user_id, username, names, lastnames, password, user_flag)VALUES (4, 'mzeballos', 'Marcelo Leonardo', 'Zeballos Zurita', 'a12345A!', true);
INSERT INTO usuario(user_id, username, names, lastnames, password, user_flag)VALUES (5, 'lcentellas', 'Leonardo Sergio', 'Centellas Claros', 'a12345A!', true);


INSERT INTO usuario_rol(role_id, user_id, user_role_flag)VALUES (1, 1, true);
INSERT INTO usuario_rol(role_id, user_id, user_role_flag)VALUES (2, 2, true);
INSERT INTO usuario_rol(role_id, user_id, user_role_flag)VALUES (2, 3, true);
INSERT INTO usuario_rol(role_id, user_id, user_role_flag)VALUES (2, 4, true);
INSERT INTO usuario_rol(role_id, user_id, user_role_flag)VALUES (2, 5, true);


INSERT INTO ubicacion(location_id, location_name, location_detail, location_flag)VALUES (1, 'Inventario', 'Inventario de activos', true);
INSERT INTO ubicacion(location_id, location_name, location_detail, location_flag)VALUES (2, 'Dicyt', 'Direccion de investigaciones y tecnologia de la UMSS', true);
INSERT INTO ubicacion(location_id, location_name, location_detail, location_flag)VALUES (3, 'Disu', 'Direccion de integracion Social Universitaria', true);
INSERT INTO ubicacion(location_id, location_name, location_detail, location_flag)VALUES (4, 'Eupg', 'Escuela universitaria de Postgrado', true);
INSERT INTO ubicacion(location_id, location_name, location_detail, location_flag)VALUES (5, 'Dpa', 'Direccion de planificacion academica', true);


INSERT INTO usuario_ubicacion(user_id, location_id, user_location_flag)VALUES (1, 1, true);
INSERT INTO usuario_ubicacion(user_id, location_id, user_location_flag)VALUES (2, 2, true);
INSERT INTO usuario_ubicacion(user_id, location_id, user_location_flag)VALUES (3, 3, true);
INSERT INTO usuario_ubicacion(user_id, location_id, user_location_flag)VALUES (4, 4, true);
INSERT INTO usuario_ubicacion(user_id, location_id, user_location_flag)VALUES (5, 5, true);

INSERT INTO activos(active_id, category_id, active_name, active_description, active_stock, active_flag)
VALUES (1, 1, 'Toyota Camry', 'Sedán de color plateado, año modelo 2022', '4', true);
INSERT INTO activos(active_id, category_id, active_name, active_description, active_stock, active_flag)
VALUES (2, 1, 'Ford Transit', 'Furgoneta blanca de carga, capacidad de 10 pasajeros', '2', true);
INSERT INTO activos(active_id, category_id, active_name, active_description, active_stock, active_flag)
VALUES (3, 2, 'Laptop Dell Inspiron 15', 'Computadora portátil con procesador Intel Core i5 y 8GB de RAM', '10', true);
INSERT INTO activos(active_id, category_id, active_name, active_description, active_stock, active_flag)
VALUES (4, 2, 'Monitor Samsung 27"', 'Monitor de pantalla LED Full HD con entrada HDMI', '15', true);
INSERT INTO activos(active_id, category_id, active_name, active_description, active_stock, active_flag)
VALUES (5, 3, 'Escritorio de madera', 'Escritorio de 200 cm color cafe', '20', true);
INSERT INTO activos(active_id, category_id, active_name, active_description, active_stock, active_flag)
VALUES (6, 3, 'Silla ergonomica', 'Silla negra reclinable', '20', true);
INSERT INTO activos(active_id, category_id, active_name, active_description, active_stock, active_flag)
VALUES (7, 4, 'Carpeta de archivos LIDER', 'Carpeta de archivo de cartón con capacidad para documentos tamaño carta', '30', true);
INSERT INTO activos(active_id, category_id, active_name, active_description, active_stock, active_flag)
VALUES (8, 4, 'Engrampadora MILCAR', 'Engrampadora color negro y gris', '12', true);


INSERT INTO movimiento(move_id, active_id, old_location_id, new_location_id, move_date, move_detail, move_flag)
VALUES (1, 1, 1, 2, '2024-01-01', 'Asignacion de vehiculo para evento', true);
INSERT INTO movimiento(move_id, active_id, old_location_id, new_location_id, move_date, move_detail, move_flag)
VALUES (2, 1, 2, 3, '2024-02-02', 'Cambio de ubicacion por incremento de personal', true);
INSERT INTO movimiento(move_id, active_id, old_location_id, new_location_id, move_date, move_detail, move_flag)
VALUES (3, 2, 1, 4, '2024-01-01', 'Compra de furgoneta para transporte del departamento', true);
INSERT INTO movimiento(move_id, active_id, old_location_id, new_location_id, move_date, move_detail, move_flag)
VALUES (4, 2, 4, 1, '2024-02-03', 'Devolucion por mantenimiento inesperado', true);
INSERT INTO movimiento(move_id, active_id, old_location_id, new_location_id, move_date, move_detail, move_flag)
VALUES (5, 3, 1, 5, '2024-01-03', 'Compra de equipo para nuevos empleados', true);
INSERT INTO movimiento(move_id, active_id, old_location_id, new_location_id, move_date, move_detail, move_flag)
VALUES (6, 4, 1, 3, '2024-02-05', 'Compra de televisores para oficinas', true);
INSERT INTO movimiento(move_id, active_id, old_location_id, new_location_id, move_date, move_detail, move_flag)
VALUES (7, 5, 1, 5, '2024-01-10', 'Compra de nuevos escritorios', true);
INSERT INTO movimiento(move_id, active_id, old_location_id, new_location_id, move_date, move_detail, move_flag)
VALUES (8, 5, 5, 4, '2024-02-02', 'Cambio de escritorios al departamento', true);
INSERT INTO movimiento(move_id, active_id, old_location_id, new_location_id, move_date, move_detail, move_flag)
VALUES (9, 6, 1, 3, '2024-01-05', 'Compra de sillas nuevas para el departamento', true);
INSERT INTO movimiento(move_id, active_id, old_location_id, new_location_id, move_date, move_detail, move_flag)
VALUES (10, 7, 1, 2, '2024-01-06', 'Compra de carpetas para la nueva gestion', true);
INSERT INTO movimiento(move_id, active_id, old_location_id, new_location_id, move_date, move_detail, move_flag)
VALUES (11, 8, 1, 3, '2024-01-07', 'Renovacion de engrampadoras para el departamento', true);







