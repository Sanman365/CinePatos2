import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Método no permitido" });
    }

    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ message: "Falta el parámetro de búsqueda" });
    }

    try {
        // Leer el archivo videos.json
        const filePath = path.join(process.cwd(), "videos.json");
        const fileContents = await fs.readFile(filePath, "utf-8");
        const movies = JSON.parse(fileContents);

        // Filtrar películas que coincidan con la búsqueda
        const results = movies.filter(movie =>
            movie.title.toLowerCase().includes(q.toLowerCase())
        );

        res.status(200).json(results);
    } catch (error) {
        console.error("Error al leer videos.json:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}
