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
    <div className="flex flex-col items-center bg-black/60  col-start-2">
      {/* Navbar fija arriba */}
      <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white flex justify-center gap-6 py-1 shadow-lg z-50">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`px-3 py-1 rounded-md transition ${
              activeSection === s.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {s.title}
          </a>
        ))}
      </nav>

      {/* Contenido de las secciones */}
      <div className="mt-10  mb-40 w-full max-w-3xl space-y-20 px-4 ">

        <section id="inicio" className="scroll-mt-20">
          <h2 className="text-3xl font-bold mb-4">Inicio</h2>
          <p>Contenido de la sección Inicio...</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione est, inventore quaerat tempora fuga maiores itaque cumque quae ducimus deserunt. Dolores natus explicabo quam tempora quasi quo nostrum illo molestias?
          Repudiandae exercitationem maxime reprehenderit temporibus sequi vel atque ab minima delectus enim alias eaque excepturi nulla, ea obcaecati soluta rerum quidem veniam nam ut voluptatibus tempora autem. Omnis, delectus id.</p>
        </section>

        <section id="estadisticas" className="scroll-mt-20">
          <h2 className="text-3xl font-bold mb-4">Estadísticas</h2>
          <p>Contenido de la sección Estadísticas...</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione est, inventore quaerat tempora fuga maiores itaque cumque quae ducimus deserunt. Dolores natus explicabo quam tempora quasi quo nostrum illo molestias?
          Repudiandae exercitationem maxime reprehenderit temporibus sequi vel atque ab minima delectus enim alias eaque excepturi nulla, ea obcaecati soluta rerum quidem veniam nam ut voluptatibus tempora autem. Omnis, delectus id.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione est, inventore quaerat tempora fuga maiores itaque cumque quae ducimus deserunt. Dolores natus explicabo quam tempora quasi quo nostrum illo molestias?
          Repudiandae exercitationem maxime reprehenderit temporibus sequi vel atque ab minima delectus enim alias eaque excepturi nulla, ea obcaecati soluta rerum quidem veniam nam ut voluptatibus tempora autem. Omnis, delectus id.</p>
        </section>

        <section id="jugadores" className="scroll-mt-20">
          <h2 className="text-3xl font-bold mb-4">Jugadores</h2>
          <p>Contenido de la sección Jugadores...</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione est, inventore quaerat tempora fuga maiores itaque cumque quae ducimus deserunt. Dolores natus explicabo quam tempora quasi quo nostrum illo molestias?
          Repudiandae exercitationem maxime reprehenderit temporibus sequi vel atque ab minima delectus enim alias eaque excepturi nulla, ea obcaecati soluta rerum quidem veniam nam ut voluptatibus tempora autem. Omnis, delectus id.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione est, inventore quaerat tempora fuga maiores itaque cumque quae ducimus deserunt. Dolores natus explicabo quam tempora quasi quo nostrum illo molestias?
          Repudiandae exercitationem maxime reprehenderit temporibus sequi vel atque ab minima delectus enim alias eaque excepturi nulla, ea obcaecati soluta rerum quidem veniam nam ut voluptatibus tempora autem. Omnis, delectus id.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione est, inventore quaerat tempora fuga maiores itaque cumque quae ducimus deserunt. Dolores natus explicabo quam tempora quasi quo nostrum illo molestias?
          Repudiandae exercitationem maxime reprehenderit temporibus sequi vel atque ab minima delectus enim alias eaque excepturi nulla, ea obcaecati soluta rerum quidem veniam nam ut voluptatibus tempora autem. Omnis, delectus id.</p>
        </section>

        <section id="contacto" className="scroll-mt-20">
          <h2 className="text-3xl font-bold mb-4">Contacto</h2>
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
