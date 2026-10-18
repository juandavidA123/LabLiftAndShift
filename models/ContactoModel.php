<?php
// models/ContactoModel.php

class ContactoModel {
    private $db;

    public function __construct($conexion) {
        $this->db = $conexion;
    }

    public function guardarContacto($nombre, $correo, $comentario) {
        try {
            $sql = "INSERT INTO contactos (nombre, correo, comentario)
                    VALUES (:nombre, :correo, :comentario)";
            $stmt = $this->db->prepare($sql);
            return $stmt->execute([
                ':nombre'     => $nombre,
                ':correo'     => $correo,
                ':comentario' => $comentario
            ]);
        } catch (PDOException $e) {
            // En producción es mejor guardar esto en un log en vez de lanzarlo al usuario
            error_log($e->getMessage());
            return false;
        }
    }
}