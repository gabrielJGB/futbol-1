import { get, set, del, clear, update } from 'idb-keyval';

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