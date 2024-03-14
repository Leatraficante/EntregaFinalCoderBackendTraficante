const loginInvalidCredentials = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .login-container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .error-message {
            color: #ff0000;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h2>Login</h2>
        
        <!-- Mensaje de error para inicio de sesión fallido -->
        <p class="error-message">¡Inicio de sesión fallido! Por favor, verifica tus credenciales.</p>
    </div>
</body>
</html>`

const userDeletedMessage = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Usuario Eliminado</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .deleted-container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .message {
            color: #333;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="deleted-container">
        <h2>Usuario Eliminado</h2>
        
        <!-- Mensaje para usuarios eliminados -->
        <p class="message">Estimado usuario, su cuenta ha sido eliminada debido a inactividad. 
        ¡Esperamos que regrese pronto!</p>
    </div>
</body>
</html>`;


const premiumUserDeletedProduct = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Producto Eliminado</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            text-align: center;
        }
        .header {
            margin-bottom: 20px;
        }
        .message {
            margin-bottom: 20px;
        }
        .product-info {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 10px;
            margin-bottom: 20px;
            text-align: left;
        }
        .product-info h3 {
            margin-top: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>¡Producto Eliminado!</h2>
        </div>
        <div class="message">
            <p>Estimado cliente,</p>
            <p>Lamentamos informarle que el producto ha sido eliminado de nuestro inventario.</p>
        </div>
        <p>Si tiene alguna pregunta o necesita más información, no dude en ponerse en contacto con nosotros.</p>
        <p>Gracias por su comprensión.</p>
    </div>
</body>
</html>`;

export {
    loginInvalidCredentials,
    userDeletedMessage,
    premiumUserDeletedProduct
}
