<?php
$host = "db-mysql";
$dbname = "db_proyecto_mvc";
$usuario = "root";
$contrasena = "clave_secreta_nube";

try {
    //conexión a la base de datos usando PDO
    $conexion = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $usuario, $contrasena);
    // Configurar PDO para lanzar excepciones en caso de errores
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    // detener el script y mostrar el error si hay un problema de conexión
    echo "Error de conexión: " . $e->getMessage();
}
?>