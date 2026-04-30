import { get, set, del, clear, update } from 'idb-keyval';

const DEFAULT_LEAGUES = [
    {
      "league": "Mundial",
      "id": "fjda"
    },
    {
      "league": "Liga Profesional",
      "id": "hc"
    },
    {
      "league": "Libertadores",
      "id": "bac"
    },
    {
      "league": "Sudamericana",
      "id": "dij"
    }
  ]

export const storageFavoritos = {
  // Obtener todo: mezcla lo guardado con lo de por defecto
  obtenerTodos: async () => {
    const guardados = await get('favorites');
    // Si es la primera vez (null), devolvemos las ligas por defecto
    return guardados || DEFAULT_LEAGUES;
  },

  // Guardar la lista completa (actualizada)
  guardarTodos: async (nuevaLista) => {
    await set('favorites', nuevaLista);
  }
};

export const storage = {

  save: async (key, value) => {
    try {
      await set(key, value);
    } catch (err) {
      console.error("Error en IndexedDB", err);
    }
  },

  del: async (key) => {
    try {
      await del(key);
    } catch (err) {
      console.error("Error en IndexedDB", err);
    }
  },

  get: async (key) => {
    try {
      return await get(key);
    } catch (err) {
      console.error("Error en IndexedDB", err);
      return null;
    }
  },

  clear: async () => {
    clear();
  },


};