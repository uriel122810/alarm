import paho.mqtt.client as mqtt
import time

# Configuración del cliente MQTT
MQTT_BROKER = "test.mosquitto.org"  # Puede ser otro broker
MQTT_PORT = 1883
MQTT_TOPIC = "alarma/estado"
# Función para conectar con el broker MQTT
def on_connect(client, userdata, flags, rc):
    print(f"Conectado con el código de resultado {rc}")
    # Enviar el mensaje que indica que la alarma está activa
    client.publish(MQTT_TOPIC, "Alarma Activa")

# Crear cliente MQTT
client = mqtt.Client()
client.on_connect = on_connect

# Conectar al broker MQTT
client.connect(MQTT_BROKER, MQTT_PORT, 60)

# Loop para mantener la conexión y enviar el mensaje
client.loop_start()

# Esperar 10 segundos antes de desconectarse
time.sleep(10)

# Desconectar
client.disconnect()
