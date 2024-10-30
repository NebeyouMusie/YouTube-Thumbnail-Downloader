import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface VideoInfoProps {
  title: string;
  thumbnail: string;
  formats: Array<{
    url: string;
    quality: string;
    format: string;
  }>;
}

export function VideoInfo({ title, thumbnail, formats }: VideoInfoProps) {
  return (
    <Card className="w-full max-w-2xl p-6 animate-fadeIn">
      <div className="flex flex-col gap-4">
        <img src={thumbnail} alt={title} className="w-full rounded-lg" />
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {formats.map((format, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => window.open(format.url, "_blank")}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {format.quality} {format.format}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}