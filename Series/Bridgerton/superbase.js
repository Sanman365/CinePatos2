import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Configuración de Supabase
const supabaseUrl = 'https://ihxhquvjopmpgjysugqw.supabase.co'; // URL corregida
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeGhxdXZqb3BtcGdqeXN1Z3F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1OTgyNDIsImV4cCI6MjA1NjE3NDI0Mn0.G6NZ15PSg0U4tZ0CJwjzEud3ns94usGgQ3rUp7VCDp0'; // Reemplaza con tu clave de API
const supabase = createClient(supabaseUrl, supabaseKey);

// Función para mostrar el aviso de éxito
function mostrarAvisoExito() {
    const fondoOscuro = document.getElementById('fondo-oscuro');
    const aviso = document.getElementById('aviso-exito');

    // Muestra el fondo oscuro y el aviso
    fondoOscuro.style.display = 'block';
    aviso.style.display = 'block';

    // Aplica la animación de mostrar
    setTimeout(() => {
        aviso.classList.add('mostrar');
    }, 10);

    // Oculta el aviso y el fondo oscuro después de 3 segundos
    setTimeout(() => {
        aviso.classList.remove('mostrar');
        setTimeout(() => {
            aviso.style.display = 'none';
            fondoOscuro.style.display = 'none';
        }, 300); // Espera a que termine la animación
    }, 3000);
}

// Función para mostrar el aviso de "ya enviado"
function mostrarAvisoYaEnviado() {
    const fondoOscuro = document.getElementById('fondo-oscuro');
    const aviso = document.getElementById('aviso-ya-enviado');

    // Muestra el fondo oscuro y el aviso
    fondoOscuro.style.display = 'block';
    aviso.style.display = 'block';

    // Aplica la animación de mostrar
    setTimeout(() => {
        aviso.classList.add('mostrar');
    }, 10);

    // Oculta el aviso y el fondo oscuro después de 3 segundos
    setTimeout(() => {
        aviso.classList.remove('mostrar');
        setTimeout(() => {
            aviso.style.display = 'none';
            fondoOscuro.style.display = 'none';
        }, 300); // Espera a que termine la animación
    }, 3000);
}

// Función para enviar el reporte
async function enviarReporte(tipo) {
    const videoUrl = document.querySelector('iframe').src;
    const rutaArchivo = window.location.pathname;

    console.log("Datos a enviar:", { tipo, videoUrl, rutaArchivo });

    // Obtener la hora del último reporte desde localStorage
    const lastReportTime = localStorage.getItem(`lastReportTime_${videoUrl}`);

    if (lastReportTime) {
        const currentTime = Date.now();
        const timeDifference = currentTime - parseInt(lastReportTime, 10);

        // Verificar si han pasado menos de 10 minutos (600,000 milisegundos)
        if (timeDifference < 10 * 60 * 1000) {
            mostrarAvisoYaEnviado(); // Muestra el aviso de "ya enviado"
            return;
        }
    }

    // Guardar la hora actual en localStorage
    localStorage.setItem(`lastReportTime_${videoUrl}`, Date.now());

    // Insertar datos en Supabase
    try {
        const { data, error } = await supabase
            .from('reportes') // Nombre de la tabla
            .insert([{ 
                tipo_reporte: tipo, // Columna corregida
                video_url: videoUrl, 
                ruta_archivo: rutaArchivo 
            }]);

        if (error) {
            console.error("Error al enviar el reporte:", error);
            alert("Hubo un error al enviar el reporte.");
        } else {
            console.log("Reporte enviado correctamente:", data);
            mostrarAvisoExito(); // Muestra el aviso de éxito
        }
    } catch (err) {
        console.error("Error en la solicitud:", err);
        alert("Hubo un error en la solicitud. Verifica tu conexión a Internet.");
    }
}

// Expone la función al ámbito global
window.enviarReporte = enviarReporte;