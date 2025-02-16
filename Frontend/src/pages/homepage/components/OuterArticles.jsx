/**
 * This component displays a list of external resources with an animated fade-in effect when they come into view.
 */
import { useEffect, useRef } from "react";

const OuterArticle = ({ resources }) => {
  const sections = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains("animate-fadeInUp")) {
            entry.target.classList.add("animate-fadeInUp");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div ref={(el) => {
      sections.current.forEach((section, index) => {
        sections.current[index] = el;
      });
    }} className="container mt-10 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-customTheme-dark dark:text-cyan-300">Other Resources</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource, index) => (
          <div
            key={index}
            ref={(el) => (sections.current[index] = el)}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <img
              src={resource.image}
              alt={resource.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2 dark:text-cyan-500">{resource.title}</h3>
              <p className="text-gray-600 mb-4 text-justify">{resource.description}</p>
              
              <a
                href={resource.link}
                className="inline-block text-indigo-600 font-medium hover:underline dark:text-cyan-500"
              >
                See More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const resources = [
  {
    image: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "National Immunisation Schedule",
    description: "In Aotearoa New Zealand we have a National Immunisation Schedule. This sets out the free vaccines offered to pēpi, tamariki, teenagers and adults at certain times in their life.",
    link: "https://info.health.nz/immunisations/national-immunisation-schedule"
  },
  {
    image: "https://www.health.govt.nz/system/files/styles/lg/private/2024-08/setting-the-direction-promo.jpg?itok=xcNXDuqS",
    title: "Ministry of Health NZ",
    description: "The Ministry of Health – Manatū Hauora advises the government on health priorities and policy to deliver better health outcomes for all New Zealanders.",
    link: "https://www.health.govt.nz/"
  },
  {
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Health New Zealand",
    description: "Health New Zealand | Te Whatu Ora is building a future health system that will support all New Zealanders to live better and longer.",
    link: "https://www.tewhatuora.govt.nz/"
  }
];

export default function App() {
  return <OuterArticle resources={resources} />;
}