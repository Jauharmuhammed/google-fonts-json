import React from "react";

type Props = {
  data: any;
};

const JsonPreview = ({ data }: Props) => {
  return (
    <pre className="p-4 bg-black text-zinc-300 rounded-lg overflow-auto h-full font-geist-mono text-sm">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};

export default JsonPreview;
