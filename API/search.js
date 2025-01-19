import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Verifica que el método sea GET
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  // Obtiene el parámetro 'q' de la query
  const { q } = req.query;

  // Si no se pasa el parámetro de búsqueda, devuelve error
  if (!q) {
    return res.status(400).json({ message: 'Falta el parámetro de búsqueda' });
  }

  try {
    // Ruta del archivo videos.json
    const filePath = path.join(process.cwd(), 'public', 'videos.json');
    
    // Lee el archivo videos.json
    const fileContents = await fs.readFile(filePath, 'utf-8');
    
    // Convierte el contenido del archivo JSON en un objeto
    const movies = JSON.parse(fileContents);

    // Filtra las películas que coincidan con la búsqueda
    const results = movies.filter(movie =>
      movie.title.toLowerCase().includes(q.toLowerCase())
    );

    // Devuelve los resultados
    return res.status(200).json(results);
  } catch (error) {
    console.error('Error al leer el archivo videos.json:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}
