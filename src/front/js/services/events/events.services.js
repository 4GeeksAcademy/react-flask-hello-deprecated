async function createEventOnBackend(title, description, date, location, clima, usuario_id) {
    // url for the api
    const url = "https://effective-space-trout-vgvrqw54744fw95p-3001.app.github.dev/api/events";
    
    // Create the event data object dynamically from the provided parameters
    const eventData = {
        title: title,
        description: description,
        date: date,
        location: location,
        clima: clima,
        usuario_id: usuario_id
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventData)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Evento creado exitosamente:", data);
    } catch (error) {
        console.error("Error al crear el evento:", error);
    }
}
