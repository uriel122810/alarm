from flask import Flask, render_template
import paho.mqtt.client as mqtt

# Configuración MQTT
MQTT_BROKER = "test.mosquitto.org"
MQTT_PORT = 1883
MQTT_TOPIC = "alarma/estado"

# Inicializar Flask
app = Flask(__name__)

# Variables para el estado de la alarma
alarm_state = "Inactiva"  # Valor predeterminado

# Función que maneja la conexión MQTT
def on_connect(client, userdata, flags, rc):
    print(f"Conectado con el código {rc}")
    client.subscribe(MQTT_TOPIC)

# Función que maneja los mensajes MQTT
def on_message(client, userdata, msg):
    global alarm_state
    alarm_state = msg.payload.decode()
    print(f"Mensaje recibido: {alarm_state}")

# Inicializar cliente MQTT
mqtt_client = mqtt.Client()
mqtt_client.on_connect = on_connect
mqtt_client.on_message = on_message

# Conectar al servidor MQTT
mqtt_client.connect(MQTT_BROKER, MQTT_PORT, 60)
mqtt_client.loop_start()

# Ruta principal de la web
@app.route('/')
def index():
    # Mostrar la página con el estado actual de la alarma
    return render_template("index.html", state=alarm_state)

# Iniciar el servidor web
if __name__ == '__main__':
    app.run(debug=True)
