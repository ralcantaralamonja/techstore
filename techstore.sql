CREATE DATABASE IF NOT EXISTS techstore;
USE techstore;

DROP TABLE IF EXISTS detalles_orden;
DROP TABLE IF EXISTS producto;
DROP TABLE IF EXISTS orden;
DROP TABLE IF EXISTS cliente;
DROP TABLE IF EXISTS categoria;

CREATE TABLE categoria (
  `categoria_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`categoria_id`)
);

CREATE TABLE cliente (
  `cliente_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion_envio` text,
  PRIMARY KEY (`cliente_id`),
  UNIQUE KEY `email` (`email`)
);

CREATE TABLE orden (
  `orden_id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int DEFAULT NULL,
  `fecha` date NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `estado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`orden_id`),
  KEY `cliente_id` (`cliente_id`),
  CONSTRAINT `orden_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`cliente_id`)
);

CREATE TABLE producto (
  `producto_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `precio` decimal(10,2) NOT NULL,
  `cantidad_en_stock` int NOT NULL,
  `categoria_id` int DEFAULT NULL,
  PRIMARY KEY (`producto_id`),
  KEY `categoria_id` (`categoria_id`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`categoria_id`)
);

CREATE TABLE detalles_orden (
  `orden_id` int NOT NULL,
  `producto_id` int NOT NULL,
  `cantidad` int NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  PRIMARY KEY (`orden_id`, `producto_id`),
  CONSTRAINT `detalles_orden_ibfk_1` FOREIGN KEY (`orden_id`) REFERENCES `orden` (`orden_id`),
  CONSTRAINT `detalles_orden_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`producto_id`)
);

--Insert 


-- Seleccionamos la base de datos
USE techstore;

-- Insertamos algunas categorías de productos
INSERT INTO categoria (nombre, descripcion) VALUES
('Laptops', 'Portátiles de diversas marcas y configuraciones.'),
('Smartphones', 'Teléfonos inteligentes de última generación.'),
('Accesorios', 'Accesorios tecnológicos como cargadores, cables, y fundas.'),
('Componentes', 'Componentes de computadora como tarjetas gráficas y procesadores.'),
('Periféricos', 'Dispositivos periféricos como ratones, teclados y monitores.');

-- Insertamos algunos productos
INSERT INTO producto (nombre, descripcion, precio, cantidad_en_stock, categoria_id) VALUES
('MacBook Pro 14', 'Laptop Apple con chip M1 Pro, 16GB RAM, 512GB SSD.', 1999.99, 50, 1),
('Dell XPS 13', 'Laptop Dell con procesador Intel i7, 16GB RAM, 512GB SSD.', 1499.99, 30, 1),
('iPhone 14 Pro', 'Smartphone Apple con pantalla Super Retina XDR, 128GB.', 999.99, 100, 2),
('Samsung Galaxy S22', 'Smartphone Samsung con pantalla AMOLED, 256GB.', 849.99, 80, 2),
('Cargador USB-C', 'Cargador rápido USB-C de 20W.', 19.99, 200, 3),
('Cable HDMI', 'Cable HDMI de alta velocidad, 2 metros.', 9.99, 150, 3),
('NVIDIA RTX 3080', 'Tarjeta gráfica NVIDIA GeForce RTX 3080.', 699.99, 25, 4),
('Intel Core i9', 'Procesador Intel Core i9 de décima generación.', 499.99, 40, 4),
('Teclado Mecánico', 'Teclado mecánico con switches Cherry MX Brown.', 129.99, 60, 5),
('Ratón Inalámbrico', 'Ratón inalámbrico con sensor óptico.', 49.99, 100, 5);

-- Insertamos algunos clientes
INSERT INTO cliente (nombre, email, telefono, direccion_envio) VALUES
('Juan Perez', 'juan.perez@example.com', '555-1234', 'Calle Falsa 123, Ciudad Ejemplo'),
('Maria Gomez', 'maria.gomez@example.com', '555-5678', 'Avenida Siempre Viva 456, Ciudad Ejemplo'),
('Carlos Lopez', 'carlos.lopez@example.com', '555-8765', 'Boulevard de los Sueños 789, Ciudad Ejemplo');

-- Insertamos algunas órdenes
INSERT INTO orden (cliente_id, fecha, total, estado) VALUES
(1, '2024-07-01', 2709.97, 'Enviado'),
(2, '2024-07-02', 999.99, 'Procesando'),
(3, '2024-07-03', 149.97, 'Completado');

-- Insertamos detalles de las órdenes
INSERT INTO detalles_orden (orden_id, producto_id, cantidad, precio) VALUES
(1, 1, 1, 1999.99),
(1, 6, 1, 9.99),
(1, 7, 1, 699.99),
(2, 3, 1, 999.99),
(3, 10, 3, 49.99);

-- Fin de los inserts
