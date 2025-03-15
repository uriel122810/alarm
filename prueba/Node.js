const express = require('express');
const app = express();
const port = 3000;

// Simulación de estado de la alarma
let alarmState = "desactivada";  // Puedes cambiar este valor dinámicamente según lo que necesites

// Ruta para obtener el estado de la alarma
app.get('/getAlarmState', (req, res) => {
    res.json({ estado: alarmState });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
