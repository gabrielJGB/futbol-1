import req from '@/data/req.json'

// @ts-ignore
export const fetcher = (url) => fetch(url, req).then(res => {
  if (!res.ok) throw new Error('Error al cargar');
  return res.json();
});





