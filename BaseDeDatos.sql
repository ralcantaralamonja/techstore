-- Crear base de datos TechStore
CREATE DATABASE techstore;

-- Usar la base de datos TechStore
USE TechStore;

-- Crear tabla usuario
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Crear tabla categoria
CREATE TABLE categoria (
    idcategoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
);

-- Crear tabla producto
CREATE TABLE producto (
    idproducto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    idcategoria INT,
    stock INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (idcategoria) REFERENCES categoria(idcategoria)
);

-- Crear tabla cliente
CREATE TABLE cliente (
    idcliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(9),
    direccion TEXT
);

-- Crear tabla orden
CREATE TABLE orden (
    idorden INT AUTO_INCREMENT PRIMARY KEY,
    idcliente INT,
    total DECIMAL(10, 2) NOT NULL,
    estado VARCHAR(255) NOT NULL,
    FOREIGN KEY (idcliente) REFERENCES cliente(idcliente)
);

-- Crear tabla detallesorden
CREATE TABLE detallesorden (
    idproducto INT,
    cantidad INT NOT NULL,
    idorden INT,
    FOREIGN KEY (idproducto) REFERENCES producto(idproducto),
    FOREIGN KEY (idorden) REFERENCES orden(idorden),
    PRIMARY KEY (idproducto, idorden)
);


DELIMITER $$

CREATE TRIGGER after_detallesorden_insert
AFTER INSERT ON detallesorden
FOR EACH ROW
BEGIN
    DECLARE new_total DECIMAL(10, 2);

    -- Calculate the new total for the order
    SELECT SUM(p.precio * d.cantidad) INTO new_total
    FROM detallesorden d
    JOIN producto p ON d.idproducto = p.idproducto
    WHERE d.idorden = NEW.idorden;

    -- Update the total in the order
    UPDATE orden
    SET total = new_total
    WHERE idorden = NEW.idorden;
END$$

DELIMITER ;

-- Insertar datos en la tabla categoria
INSERT INTO categoria (nombre, descripcion) VALUES
('Electrónica', 'Productos electrónicos y gadgets'),
('Ropa', 'Vestimenta y accesorios de moda');

-- Insertar datos en la tabla producto
INSERT INTO producto (nombre, descripcion, idcategoria, stock, precio) VALUES
('Smartphone', 'Un teléfono inteligente de alta gama', 1, 50, 699.99),
('Jeans', 'Pantalones de mezclilla', 2, 100, 49.99);

-- Insertar datos en la tabla cliente
INSERT INTO cliente (nombre, email, telefono, direccion) VALUES
('Juan Pérez', 'juan.perez@example.com', '123456789', 'Av. Siempre Viva 742'),
('María García', 'maria.garcia@example.com', '987654321', 'Calle Falsa 123');

-- Insertar datos en la tabla orden
INSERT INTO orden (idcliente, total, estado) VALUES
(1, 0, 'pendiente'),
(2, 0, 'pendiente');

-- Insertar datos en la tabla detallesorden
INSERT INTO detallesorden (idproducto, cantidad, idorden) VALUES
(1, 2, 1),
(2, 3, 2);

