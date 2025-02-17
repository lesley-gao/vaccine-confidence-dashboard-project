import React from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const InteractiveHoverButton = React.forwardRef(
  ({ text = "Go back", href = "/", className, ...props }, ref) => {
    return (
      <a href={href} ref={ref} className="inline-block">
        <button
          className={cn(
            `relative min-w-[150px] px-5 py-2 rounded-full border border-white/40
             bg-white/30 backdrop-blur-md text-white shadow-md font-semibold
             flex items-center justify-center gap-2 transition-all duration-300`,
            className
          )}

          {...props}
        >
          <ArrowLeft className="w-5 h-5 opacity-80" />
          <span>{text}</span>
        </button>
      </a>
    );
  }
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export default InteractiveHoverButton;