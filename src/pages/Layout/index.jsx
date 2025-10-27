import { useState, useEffect } from 'react';

const sections = [
  { id: 'inicio', title: 'Inicio' },
  { id: 'estadisticas', title: 'Estadísticas' },
  { id: 'jugadores', title: 'Jugadores' },
  { id: 'contacto', title: 'Contacto' },
];

export default function Page() {
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.innerHeight / 3; // margen para detección más cómoda
      let current = activeSection;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom >= offset) {
            current = section.id;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <div class=" relative flex flex-col items-center mx-10  bg-red-700/60  md:col-start-2">
      {/* Navbar fija arriba */}
      
        <nav class="z-100 flex sticky top-0 flex-row gap-1   border-t-[1px] border-borderc bg-green-950 text-white">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              class={`text-sm p-4 font-semibold ${activeSection === s.id
                  ? 'bg-primary  text-black'
                  : 'text-gray-300 hover:text-primary'
                }`}
            >
              {s.title.toUpperCase()}
            </a>
          ))}
        </nav>
      
      {/* Contenido de las secciones */}
      <div class="pt-2 bg-background border-x-[1px] border-borderc mb-40 w-full max-w-3xl space-y-20 px-4 ">

        <section id="inicio" class="scroll-mt-20">
          <h2 class="text-3xl font-bold mb-4">Inicio</h2>
          <p>Contenido de la sección Inicio...</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione est, inventore quaerat tempora fuga maiores itaque cumque quae ducimus deserunt. Dolores natus explicabo quam tempora quasi quo nostrum illo molestias?
            Repudiandae exercitationem maxime reprehenderit temporibus sequi vel atque ab minima delectus enim alias eaque excepturi nulla, ea obcaecati soluta rerum quidem veniam nam ut voluptatibus tempora autem. Omnis, delectus id.</p>
        </section>

        <section id="estadisticas" class="scroll-mt-20">
          <h2 class="text-3xl font-bold mb-4">Estadísticas</h2>
          <p>Contenido de la sección Estadísticas...</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione est, inventore quaerat tempora fuga maiores itaque cumque quae ducimus deserunt. Dolores natus explicabo quam tempora quasi quo nostrum illo molestias?
            Repudiandae exercitationem maxime reprehenderit temporibus sequi vel atque ab minima delectus enim alias eaque excepturi nulla, ea obcaecati soluta rerum quidem veniam nam ut voluptatibus tempora autem. Omnis, delectus id.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione est, inventore quaerat tempora fuga maiores itaque cumque quae ducimus deserunt. Dolores natus explicabo quam tempora quasi quo nostrum illo molestias?
            Repudiandae exercitationem maxime reprehenderit temporibus sequi vel atque ab minima delectus enim alias eaque excepturi nulla, ea obcaecati soluta rerum quidem veniam nam ut voluptatibus tempora autem. Omnis, delectus id.</p>
        </section>

        <section id="jugadores" class="scroll-mt-20">
          <h2 class="text-3xl font-bold mb-4">Jugadores</h2>
          <p>Contenido de la sección Jugadores...</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione est, inventore quaerat tempora fuga maiores itaque cumque quae ducimus deserunt. Dolores natus explicabo quam tempora quasi quo nostrum illo molestias?
            Repudiandae exercitationem maxime reprehenderit temporibus sequi vel atque ab minima delectus enim alias eaque excepturi nulla, ea obcaecati soluta rerum quidem veniam nam ut voluptatibus tempora autem. Omnis, delectus id.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione est, inventore quaerat tempora fuga maiores itaque cumque quae ducimus deserunt. Dolores natus explicabo quam tempora quasi quo nostrum illo molestias?
            Repudiandae exercitationem maxime reprehenderit temporibus sequi vel atque ab minima delectus enim alias eaque excepturi nulla, ea obcaecati soluta rerum quidem veniam nam ut voluptatibus tempora autem. Omnis, delectus id.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione est, inventore quaerat tempora fuga maiores itaque cumque quae ducimus deserunt. Dolores natus explicabo quam tempora quasi quo nostrum illo molestias?
            Repudiandae exercitationem maxime reprehenderit temporibus sequi vel atque ab minima delectus enim alias eaque excepturi nulla, ea obcaecati soluta rerum quidem veniam nam ut voluptatibus tempora autem. Omnis, delectus id.</p>
        </section>

        <section id="contacto" class="scroll-mt-20">
          <h2 class="text-3xl font-bold mb-4">Contacto</h2>
          <p>Contenido de la sección Contacto...</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione est, inventore quaerat tempora fuga maiores itaque cumque quae ducimus deserunt. Dolores natus explicabo quam tempora quasi quo nostrum illo molestias?
            Repudiandae exercitationem maxime reprehenderit temporibus sequi vel atque ab minima delectus enim alias eaque excepturi nulla, ea obcaecati soluta rerum quidem veniam nam ut voluptatibus tempora autem. Omnis, delectus id.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione est, inventore quaerat tempora fuga maiores itaque cumque quae ducimus deserunt. Dolores natus explicabo quam tempora quasi quo nostrum illo molestias?
            Repudiandae exercitationem maxime reprehenderit temporibus sequi vel atque ab minima delectus enim alias eaque excepturi nulla, ea obcaecati soluta rerum quidem veniam nam ut voluptatibus tempora autem. Omnis, delectus id.</p>
        </section>
      </div>
    </div>
  );
}
