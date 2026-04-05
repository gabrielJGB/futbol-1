import req from '@/data/req.json'
import playerReq from '@/data/playerReq.json'
// @ts-ignore
export const fetcher = (url) => fetch(url, req).then(res => {
  if (!res.ok) throw new Error('Error al cargar');
  return res.json();
});



export const playerFetcher = (url) => fetch(url, playerReq).then(res => {
  if (!res.ok) throw new Error('Error al cargar');
  return res.json();
});


