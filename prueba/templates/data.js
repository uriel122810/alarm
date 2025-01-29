let map;
const client = mqtt.connect('wss://test.mosquitto.org:8081'); // Conexión al broker MQTT
const alarms = [
    { id: 1, name: "Alarma 1", location: "Ubicación 1", lat: 19.352246, lng: -98.952188, state: "off" },
    { id: 2, name: "Alarma 2", location: "Ubicación 2", lat: 19.372246, lng: -98.962188, state: "off" },
    { id: 3, name: "Alarma 3", location: "Ubicación 3", lat: 19.382246, lng: -98.972188, state: "off" }
];
const markers = {};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 19.352246, lng: -98.952188 },
        zoom: 12
    });

    alarms.forEach(alarm => {
        const marker = new google.maps.Marker({
            position: { lat: alarm.lat, lng: alarm.lng },
            map: map,
            title: alarm.name,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: 'gray',
                fillOpacity: 1,
                strokeColor: 'gray',
                strokeWeight: 1,
                scale: 8
            }
        });
        markers[alarm.id] = marker;
    });

    updateInfoPanel();
}

function updateAlarmState(alarmId, newState) {
    const alarm = alarms.find(a => a.id === alarmId);
    if (alarm) {
        alarm.state = newState;
        const marker = markers[alarmId];
        if (newState === "on") {
            marker.setIcon({
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: 'red',
                fillOpacity: 1,
                strokeColor: 'red',
                strokeWeight: 1,
                scale: 12
            });
        } else if (newState === "off") {
            marker.setIcon({
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: 'green',
                fillOpacity: 1,
                strokeColor: 'green',
                strokeWeight: 1,
                scale: 8
            });
        } else {
            marker.setIcon({
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: 'gray',
                fillOpacity: 1,
                strokeColor: 'gray',
                strokeWeight: 1,
                scale: 8
            });
        }
        updateInfoPanel();
    }
}

function updateInfoPanel() {
    const panel = document.getElementById('infoPanel');
    panel.innerHTML = '';
    alarms.forEach(alarm => {
        if (alarm.state === "on") {
            const div = document.createElement('div');
            div.innerHTML = `
                <h3>${alarm.name}</h3>
                <p><strong>Ubicación:</strong> ${alarm.location}</p>
                <p><strong>Estado:</strong> ${alarm.state}</p>
            `;
            panel.appendChild(div);
        }
    });
}

client.on('connect', () => {
    console.log("Conectado al broker MQTT");
    client.subscribe('alarma/estado');
});

client.on('message', (topic, message) => {
    const payload = message.toString();
    const [alarmId, newState] = payload.split('-');
    updateAlarmState(parseInt(alarmId), newState);
});

window.onload = initMap;
