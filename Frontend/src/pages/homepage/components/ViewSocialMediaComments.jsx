import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";


const reviews = [
    {
      name: "User",
      username: "@user",
      body: "I'm not sure if this vaccine is really useful... I think I'll wait and see...",
      img: "https://avatar.vercel.sh/jack",
    },
    {
      name: "User",
      username: "@user",
      body: "Is there anyone who hasn't been vaccinated? Our whole family has been vaccinated.",
      img: "https://avatar.vercel.sh/jill",
    },
    {
      name: "User",
      username: "@user",
      body: "Our community doctor recommended that we all get vaccinated, and I think she is right.",
      img: "https://avatar.vercel.sh/john",
    },
    {
      name: "User",
      username: "@user",
      body: "Will there really be no terrible sequelae? Sorry for being suspicious.",
      img: "https://avatar.vercel.sh/jane",
    },
    {
      name: "User",
      username: "@user",
      body: "From my personal experience, vaccines are indeed useful and they really help me prevent diseases.",
      img: "https://avatar.vercel.sh/jenny",
    },
  ];
  
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);
  
  const ReviewCard = ({ img, name, username, body }) => {
    return (
      <figure
        className={cn(
          "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
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
            <p className="text-xs font-medium dark:text-white/40">{username}</p>
          </div>
        </div>
        <blockquote className="mt-2 text-sm">{body}</blockquote>
      </figure>
    );
  };
  
  export { reviews, firstRow, secondRow, ReviewCard };
  

export default function ViewSocialMediaComments() {
    return (
        <div className="flex flex-col items-center mb-20">
            
            <div className="font-BaiJamjureeBold text-[#152063] text-[35px]">View the Social Media Comments Analysis</div>
            <div className="text-center font-BaiJamjureeLight text-[20px]">Social media vaccine discussion data based on our own model</div>
            
            <div className="mt-5">
            <InteractiveHoverButton href="/socialmedia" text="See More"className="w-[180px]"/>
            </div>

            <div className="relative flex w-[1200px] flex-col items-center overflow-hidden rounded-lg border md:shadow-xl mt-5">
            <Marquee pauseOnHover className="[--duration:40s]">
                {firstRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:40s]">
                {secondRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
            
            </div>

        </div>
        
    )
}
