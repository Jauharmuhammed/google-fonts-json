import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  className?: string;
};

function Title({ className }: Props) {
  return (
    <div className={cn(className)}>
      <div className="font-mono leading-none text-center flex items-center">
        {/* <p className="text-[36px] uppercase text-center font-normal">{`{`}</p> */}
        <p className="text-[10px] uppercase text-center font-bold  border-dashed border-zinc-800 py-0.5">
          <span className="text-[10px]">Google</span>
          <br /> <span className="tracking-[0.125em]">Fonts</span>
        </p>
        <p className="text-[22px] uppercase text-center font-bold border-dotted py-0.5 ms-1">
          JSON
        </p>
        {/* <p className="text-[36px] uppercase text-center font-medium">{`}`}</p> */}
      </div>
    </div>
  );
}

export default Title;
