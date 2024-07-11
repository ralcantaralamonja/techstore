CREATE DATABASE IF NOT EXISTS techstore;
USE techstore;

DROP TABLE IF EXISTS `detalles_ordenes`;
DROP TABLE IF EXISTS `productos`;
DROP TABLE IF EXISTS `ordenes`;
DROP TABLE IF EXISTS `clientes`;
DROP TABLE IF EXISTS `categorias`;

CREATE TABLE `categorias` (
  `categoria_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`categoria_id`)
);

CREATE TABLE `clientes` (
  `cliente_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion_envio` text,
  PRIMARY KEY (`cliente_id`),
  UNIQUE KEY `email` (`email`)
);

CREATE TABLE `ordenes` (
  `orden_id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int DEFAULT NULL,
  `fecha` date NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `estado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`orden_id`),
  KEY `cliente_id` (`cliente_id`),
  CONSTRAINT `ordenes_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`cliente_id`)
);

CREATE TABLE `productos` (
  `producto_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `precio` decimal(10,2) NOT NULL,
  `cantidad_en_stock` int NOT NULL,
  `categoria_id` int DEFAULT NULL,
  PRIMARY KEY (`producto_id`),
  KEY `categoria_id` (`categoria_id`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`categoria_id`)
);

CREATE TABLE `detalles_ordenes` (
  `detalle_id` int NOT NULL AUTO_INCREMENT,
  `orden_id` int DEFAULT NULL,
  `producto_id` int DEFAULT NULL,
  `cantidad` int NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  PRIMARY KEY (`detalle_id`),
  KEY `orden_id` (`orden_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `detalles_ordenes_ibfk_1` FOREIGN KEY (`orden_id`) REFERENCES `ordenes` (`orden_id`),
  CONSTRAINT `detalles_ordenes_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`producto_id`)
);

-- No es necesario bloquear las tablas para insertar datos
-- INSERTA LOS DATOS

-- Inserta categorías
INSERT INTO `categorias` (`categoria_id`, `nombre`, `descripcion`) VALUES 
(1, 'Computadoras', 'Dispositivos de cómputo de escritorio y portátiles'),
(2, 'Teléfonos móviles', 'Dispositivos móviles y smartphones'),
(3, 'Accesorios', 'Accesorios y periféricos electrónicos');

-- Inserta clientes
INSERT INTO `clientes` (`cliente_id`, `nombre`, `email`, `telefono`, `direccion_envio`) VALUES 
(1, 'Juan Perez', 'juan.perez@example.com', '123456789', 'Calle Falsa 123, Lima, Perú'),
(2, 'Maria Gomez', 'maria.gomez@example.com', '987654321', 'Avenida Siempre Viva 456, Lima, Perú');

-- Inserta órdenes
INSERT INTO `ordenes` (`orden_id`, `cliente_id`, `fecha`, `total`, `estado`) VALUES 
(1, 1, '2024-07-01', 7700.00, 'pendiente'),
(2, 2, '2024-07-02', 1200.00, 'enviado');

-- Inserta productos
INSERT INTO `productos` (`producto_id`, `nombre`, `descripcion`, `precio`, `cantidad_en_stock`, `categoria_id`) VALUES 
(1, 'Laptop Dell Inspiron 15', 'Laptop Dell Inspiron 15 con Intel Core i5, 8GB RAM y 512GB SSD', 3599.00, 15, 1),
(2, 'PC de Escritorio HP Pavilion', 'PC de escritorio HP Pavilion con Intel Core i7, 16GB RAM y 1TB HDD', 4999.00, 10, 1),
(3, 'Monitor LG 24\"', 'Monitor LG de 24 pulgadas Full HD', 899.00, 20, 1),
(4, 'iPhone 13 Pro', 'Apple iPhone 13 Pro con 256GB de almacenamiento', 6399.00, 8, 2),
(5, 'Samsung Galaxy S21', 'Samsung Galaxy S21 con pantalla AMOLED de 6.2 pulgadas', 4499.00, 12, 2),
(6, 'Xiaomi Redmi Note 10', 'Xiaomi Redmi Note 10 con cámara cuádruple de 48MP', 1499.00, 20, 2),
(7, 'Mouse inalámbrico Logitech MX Master 3', 'Mouse inalámbrico Logitech con conectividad Bluetooth', 349.00, 30, 3),
(8, 'Teclado Mecánico HyperX Alloy Origins', 'Teclado mecánico HyperX con switches Red', 599.00, 25, 3),
(9, 'Funda para MacBook Pro 13\"', 'Funda protectora para MacBook Pro 13 pulgadas', 199.00, 40, 3),
(12, 'Laptop Acer Aspire 5', 'Laptop potente con procesador Intel Core i5 y SSD de 512GB', 3500.00, 10, 1);

-- Inserta detalles de órdenes
INSERT INTO `detalles_ordenes` (`detalle_id`, `orden_id`, `producto_id`, `cantidad`, `precio`) VALUES 
(1, 1, 1, 1, 3500.00),
(2, 1, 2, 1, 4200.00),
(3, 2, 3, 1, 1200.00);
