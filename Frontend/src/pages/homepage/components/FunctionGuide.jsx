/**
 * This component is a feature guide with interactive elements 
 * such as notifications, surveys, and social media analysis, using BentoGrid and animated components.
 */
import { BellIcon, CalendarIcon, FileTextIcon, GlobeIcon, InputIcon, } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import Marquee from "@/components/ui/marquee";
import { AnimatedListDemo } from "./AnimatedListDemo";

const reviews = [
  {
    name: "User",
    body: "I'm not sure if this vaccine is really useful... I think I'll wait and see...",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "User",
    body: "Is there anyone who hasn't been vaccinated? Our whole family has been vaccinated.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "User",
    body: "Our community doctor recommended that we all get vaccinated, and I think she is right.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "User",
    body: "Will there really be no terrible sequelae? Sorry for being suspicious.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "User",
    body: "From my personal experience, vaccines are indeed useful and they really help me prevent diseases.",
    img: "https://avatar.vercel.sh/jenny",
  },
];

const features = [
  {
    Icon: InputIcon,
    name: "Vaccine Dashboard",
    description: "Scientific indicators that can help assess vaccine confidence.",
    href: "/dashboard",
    cta: "See more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div>
        <img
          className="absolute [mask-image:linear-gradient(to_top,transparent_50%,#000_100%)] "
          src="/image/ViewData.png"
          alt="ViewSurveyResults"
        />
      </div>
    ),
  },

  {
    Icon: CalendarIcon,
    name: "Annual Survey",
    description: "Surveys from specialized research agencies reflecting vaccine confidence.",
    className: "col-span-3 lg:col-span-1",
    href: "/survey",
    cta: "See more",
    background: (
      <div>
        <img
          className="absolute [mask-image:linear-gradient(to_top,transparent_50%,#000_100%)] "
          src="/image/ViewSurvey.png"
          alt="ViewSurveyResults"
        />
      </div>
    ),
  },
  {
    Icon: GlobeIcon,
    name: "Map Guide",
    description: "Want to get vaccinated but don't know where to go?",
    className: "col-span-3 lg:col-span-1",
    href: "/map",
    cta: "See more",
    background: (
      <div>
        <img
          className="absolute [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)] "
          src="/image/MapBG.png"
          alt="MapBG"
        />
      </div>
    ),
  },

  {
    Icon: BellIcon,
    name: "Notifications",
    description: "Get notified when vaccine information are updated.",
    href: "/profile",
    cta: "See more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)] group-hover:scale-105" />
    ),
  },

  {
    Icon: FileTextIcon,
    name: "Social Media Comments Trend Analysis",
    description: "The social media comments trend analysis based on our own research models.",
    href: "/socialmedia",
    cta: "See more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)] "
      >
        {reviews.map((r, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <img className="rounded-full" width="32" height="32" alt="" src={r.img} />
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white ">
                  {r.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{r.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
];

export function FunctionGuide() {
  return (

    <div className="flex flex-col items-center gap-8">
      <BentoGrid>
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
    </div>
  );
}