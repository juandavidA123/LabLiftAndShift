<h2>Transmisión de Mensajes</h2>

<!-- El controlador inyecta esta variable aquí si existe un mensaje -->
<?php echo $mensaje_db; ?>

<form action="" method="POST">
    <label for="nombre">Tu Nombre</label>
    <input type="text" id="nombre" name="nombre" required>

    <label for="email">Tu Correo</label>
    <input type="email" id="email" name="email" required>

    <label for="comentario">Comentarios</label>
    <textarea id="comentario" name="comentario" rows="5" cols="40" required></textarea>

    <button type="submit">Enviar Mensaje</button>
</form>
