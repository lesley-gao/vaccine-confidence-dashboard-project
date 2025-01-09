import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const InteractiveHoverButton = React.forwardRef(
  ({ text = "Go to see more", href = "#", className, ...props }, ref) => {
    return (
      <a href={href} ref={ref}>
        <button
          className={cn(
            "group relative cursor-pointer overflow-hidden rounded-full border bg-background p-2 text-center font-semibold",
            className
          )}
          {...props}
        >
          <span className="relative inline-block z-20 translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
            {text}
          </span>

          <div
            className="absolute top-0 z-20 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100"
          >
            <span>{text}</span>
            <ArrowRight />
          </div>

          <div
            className="absolute left-[20%] top-[40%] h-2 w-2 scale-[1] z-10 rounded-lg bg-gradient-to-r from-[#3949AB] to-[#152063] transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8]"
          ></div>
        </button>
      </a>
    );
  }
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export default InteractiveHoverButton;
