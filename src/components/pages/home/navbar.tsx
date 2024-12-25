import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Title from "./title";
import { downloadJson } from "@/lib/utils";
import { Loader } from "@/components/ui/loader";

type Props = {
  data: any;
};

function navbar({ data }: Props) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    await downloadJson(data, "google-fonts.json");

    setTimeout(() => {
      setIsDownloading(false);
    }, 200);
  };

  return (
    <Card>
      <CardContent className="flex items-center justify-between p-2 rounded">
        <Title className="ms-2" />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button onClick={handleDownload} className="flex items-center gap-2">
            {isDownloading ? <Loader /> : <Download className="h-4 w-4" />}
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default navbar;
