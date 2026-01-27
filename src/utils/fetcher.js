const req = {
  headers: {
    accept: "*/*",
    "accept-language": "es-419,es;q=0.7",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Brave\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "x-ver": "1.11.7.5",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "sec-gpc": "1",
  },
  "referrer": "https://corsproxy.io/",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
}



const req1 = {
  "headers": {
    "accept": "*/*",
    "accept-language": "es-419,es;q=0.5",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Brave\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "sec-gpc": "1",
    "x-ver": "1.11.7.5",
    "Referer": "https://futbol1.vercel.app/"
  },
  "body": null,
  "method": "GET",
  "cache":"no-store"
}


const headers =  {
  "headers": {
    "accept": "*/*",
    "accept-language": "es-419,es;q=0.6",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Brave\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "sec-gpc": "1",
    "x-ver": "1.11.7.5",
    "Referer": "https://www.promiedos.com.ar/"
  },
  "body": null,
  "method": "GET",
    "cache":"no-store"
}

// @ts-ignore
export const fetcher = (url) => fetch(`${url}`, headers).then(res => {
  if (!res.ok) throw new Error('Error al cargar');
  return res.json();
});
