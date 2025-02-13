const express = require('express');
const app = express();
// Simulación de estado de la alarma
let alarmState = "desactivada";  // Puedes cambiar este valor dinámicamente según lo que necesites

// Ruta para obtener el estado de la alarma
app.get('/getAlarmState', (req, res) => {
    res.json({ estado: alarmState });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

