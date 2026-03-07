import os

# Ruta a la carpeta donde están los HTML
CARPETA_HTML = r"C:\Users\Personal\Documents\CartoonLive\CartoonsLive\Steven U\Temporadas"
IFRAME_BASE = '<iframe src="https://filemoon.to/e/dcrg05lbbyrq/'

# Procesar todos los archivos HTML
for archivo in os.listdir(CARPETA_HTML):
    if archivo.endswith(".html"):
        ruta = os.path.join(CARPETA_HTML, archivo)

        with open(ruta, "r", encoding="utf-8") as f:
            lineas = f.readlines()

        nuevas_lineas = [line for line in lineas if not line.strip().startswith(IFRAME_BASE)]

        if len(nuevas_lineas) != len(lineas):
            with open(ruta, "w", encoding="utf-8") as f:
                f.writelines(nuevas_lineas)
            print(f"✅ Iframe eliminado en: {archivo}")
        else:
            print(f"ℹ️ No se encontró el iframe en: {archivo}")
