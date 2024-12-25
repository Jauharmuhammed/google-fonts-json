import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Title from "./title";
import { downloadJson } from "@/lib/utils";
import { Loader } from "@/components/ui/loader";
import { GithubIcon } from "@/components/icons";
import Link from "next/link";

type Props = {
  data: any;
};

function Navbar({ data }: Props) {
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
          <div className="flex items-center gap-0.5">
            <Link target="_blank" href={process.env.NEXT_PUBLIC_GITHUB_URL!}>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="focus-visible:ring-0"
              >
                <GithubIcon className="h-4 w-4" />
              </Button>
            </Link>
            <ThemeToggle />
          </div>
          <Button onClick={handleDownload} className="flex items-center gap-2">
            {isDownloading ? <Loader /> : <Download className="h-4 w-4" />}
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Navbar;
