import { cn } from "@/lib/utils";
import React from "react";
import { JSONTree } from "react-json-tree";

type Props = {
  data: any;
};

const theme = {
  scheme: "bright",
  base00: "#181818",
  base01: "#303030",
  base02: "#505050",
  base03: "#b0b0b0",
  base04: "#d0d0d0",
  base05: "#e0e0e0",
  base06: "#f5f5f5",
  base07: "#ffffff",
  base08: "#fb0120",
  base09: "#fc6d24",
  base0A: "#fda331",
  base0B: "#DF92D8",
  base0C: "#76c7b7",
  base0D: "#7BC8C4",
  base0E: "#d381c3",
  base0F: "#be643c",
};

const JsonPreview = ({ data }: Props) => {
  return (
    // <pre className="p-4 bg-black text-zinc-300 rounded-lg overflow-auto h-full font-geist-mono text-sm">
    //   {JSON.stringify(data, null, 2)}
    // </pre>
    <div
      className={cn(
        "rounded-lg overflow-auto h-full font-geist-mono text-sm",
        "[&>ul]:!p-4 [&>ul]:!m-0"
      )}
      style={{
        backgroundColor: theme.base00,
      }}
    >
      <JSONTree
        data={data}
        shouldExpandNodeInitially={() => true}
        theme={theme}
        hideRoot
      />
    </div>
  );
};

export default JsonPreview;
