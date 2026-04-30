import { useState, useEffect, useLayoutEffect } from 'preact/hooks';
import { get, set } from 'idb-keyval';
import { loadingFavsSignal } from '@/signals/common';

const LIGAS_POR_DEFECTO = [
   
];

export function useFavorites() {
    const [favorites, setFavorites] = useState([]);
    const [loadingFavorites, setLoadingFavorites] = useState(true);


    // Cargar datos al montar el hook
    useLayoutEffect(() => {

        async function cargarDatos() {
            const guardados = await get('favs');
            setFavorites(guardados ?? LIGAS_POR_DEFECTO);
            setLoadingFavorites(false);
        }

        cargarDatos();
    }, [loadingFavsSignal.value]);


    const getFavorites = async ()=>{
        return await get('favs');
    }

    // El método de Toggle
    const toggleFavorite = async (item) => {

        const existe = favorites != undefined && favorites.some(f => f.id === item.id);
        let nuevaLista;

        if (existe) {
            nuevaLista = favorites.filter(f => f.id !== item.id);
        } else {
            nuevaLista = [...favorites, { id: item.id, name: item.name,type:item.type }];
        }

        // Actualizamos estado y DB
        setFavorites(nuevaLista);
        loadingFavsSignal.value = !loadingFavsSignal.value
        await set('favs', nuevaLista);
    };

    // Función útil para saber si un ID específico es favorito (para la UI)
    const isFavorite = (item) => favorites.some(f => f.id === item.id);

    return { favorites, toggleFavorite, isFavorite, loadingFavorites ,getFavorites};
}