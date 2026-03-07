import os
import re

# === CONFIGURACIÓN ===
CARPETA_HTML = r"C:\Users\Personal\Documents\CartoonLive\CartoonsLive\Steven U\StevenFuture"
ARCHIVO_IFRAMES = "iframes.txt"
SUFIJO_REMOVER = "-Series_online_latino-TXTCARTOONS"

# === FUNCIÓN AUXILIAR ===

def extraer_info(iframe):
    # Extrae la URL del src
    match_src = re.search(r'src="([^"]+)"', iframe)
    if not match_src:
        return None, None
    url = match_src.group(1)

    # Extrae el ID tipo 1x1 o 01x01
    match_id = re.search(r'(\d{1,2}x\d{1,2})', url)
    if not match_id:
        return None, None
    episodio_id = match_id.group(1)

    # Extrae el título si está presente antes del sufijo
    match_titulo = re.search(rf'{episodio_id}[-_](.*?){SUFIJO_REMOVER}', url)
    if not match_titulo:
        return episodio_id, None

    titulo_raw = match_titulo.group(1)
    titulo_limpio = re.sub(r'[-_]+', ' ', titulo_raw).strip()
    return episodio_id, titulo_limpio

# === PROCESAMIENTO ===

try:
    with open(ARCHIVO_IFRAMES, "r", encoding="utf-8") as f:
        iframes = [line.strip() for line in f if line.strip()]
except FileNotFoundError:
    print("⛔ No se encontró el archivo iframes.txt")
    exit(1)

for iframe in iframes:
    episodio_id, titulo = extraer_info(iframe)

    if not episodio_id or not titulo:
        print(f"⚠️ No se pudo procesar este iframe o no tiene título válido:\n{iframe}\n")
        continue

    archivo_html = f"{episodio_id}.html"
    ruta_html = os.path.join(CARPETA_HTML, archivo_html)

    if not os.path.exists(ruta_html):
        print(f"❌ No se encontró el archivo: {archivo_html}")
        continue

    with open(ruta_html, "r", encoding="utf-8") as f:
        contenido = f.read()

    if "<title>" not in contenido.lower():
        print(f"ℹ️ Archivo {archivo_html} no tiene <title>, se omite.")
        continue

    # Reemplaza el título dentro de <title>
    contenido_modificado = re.sub(r"<title>.*?</title>", f"<title>{titulo}</title>", contenido, flags=re.IGNORECASE)

    with open(ruta_html, "w", encoding="utf-8") as f:
        f.write(contenido_modificado)

    print(f"✅ Título '{titulo}' insertado en {archivo_html}")
