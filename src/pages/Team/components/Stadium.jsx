export const Stadium = ({ stadium }) => {
  
  if (!stadium) return null;

  const [lat, lng] = stadium.coordinates.split(",").map((c) => c.trim());
  //🏟 

  return (
    <div class="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
      <h3 class="text-2xl font-semibold mb-2 text-primary ">
        Estadio
      </h3>
      <div class="flex flex-col gap-1text-gray-600 dark:text-gray-300 text-sm">

        {
          stadium.info.map((item) => (
            <div class={"flex flex-row gap-2 text-sm"}>
              <div>{item.name}:</div>
              <div class={"font-semibold"}>{item.value}</div>
            </div>
          ))
        }

        <iframe
          src={`https://maps.google.com/maps?q=${lat},${lng}&z=17&output=embed&t=k&hl=es`}
          width="100%"
          height="300"
          class="rounded-xl border-0 mt-3"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

      </div>
    </div>
  );
};
