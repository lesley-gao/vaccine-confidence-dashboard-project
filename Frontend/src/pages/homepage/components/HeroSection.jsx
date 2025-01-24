import TopBar from "./TopBar";
import TypingAnimation from "@/components/ui/typing-animation";
import Marquee from "@/components/ui/marquee";
 
import { cn } from "@/lib/utils";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";

const reviews = [
  {
    id:1,
    name: "User",
    body: "I'm not sure if this vaccine is really useful... I think I'll wait and see...",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    id:2,
    name: "User",
    body: "Is there anyone who hasn't been vaccinated? Our whole family has been vaccinated.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    id:3,
    name: "User",
    body: "Our community doctor recommended that we all get vaccinated, and I think she is right.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    id:4,
    name: "User",
    body: "Will there really be no terrible sequelae? Sorry for being suspicious.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    id:5,
    name: "User",
    body: "From my personal experience, vaccines are indeed useful and they really help me prevent diseases.",
    img: "https://avatar.vercel.sh/jenny",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, body }) => {
  return (
    <figure
      className={cn(
        "relative w-64 overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export { reviews, firstRow, secondRow, ReviewCard };


function HeroSection() {
  return (
    <>
      <div className="w-full h-screen flex flex-col relative">
        <TopBar />
        
        {/* Main Section */}
        <div className="relative flex flex-col m-auto items-center justify-center z-10">
          <div
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#150263] from-40% to-[#3949AB] text-[45px] mt-40 font-BaiJamjureeBold"
            style={{ textShadow: "0px 4px 10px rgba(255, 255, 255, 0.25)" }}
          >
            Protect Yourself
          </div>
          <div
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#150263] from-40% via-gray to-[#3949AB] text-[45px] font-BaiJamjureeBold"
            style={{ textShadow: "0px 4px 10px rgba(255, 255, 255, 0.25)" }}
          >
            And the One You Care
          </div>
          <TypingAnimation className="text-[#150263] text-[20px] font-BaiJamjureeRegular mt-6"
            style={{ textShadow: "0px 4px 10px rgba(255, 255, 255, 0.25)" }}
          >
            The Vaccine Confidence Tracker in NZ
          </TypingAnimation>

          <div
            className={cn(
              "mt-6 group rounded-full border border-black/5 bg-neutral-100/40 text-base text-[#150263] transition-all ease-in hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-[#150263] hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ Your Data Assistant</span>
            </AnimatedShinyText>
          </div>

          <div className="relative flex w-screen h-[40%] flex-col items-center overflow-hidden rounded-lg mt-4 gap-2">
            <Marquee pauseOnHover className="[--duration:40s]">
              {firstRow.map((review) => (
                <ReviewCard key={review.id} {...review} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:40s]">
              {secondRow.map((review) => (
                <ReviewCard key={review.id} {...review} />
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
