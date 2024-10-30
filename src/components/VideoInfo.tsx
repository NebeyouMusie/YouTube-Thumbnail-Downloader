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
  const handleDownload = async (url: string, quality: string, format: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${title}-${quality}.${format.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  // Group formats by quality for better organization
  const groupedFormats = formats.reduce((acc, format) => {
    const key = format.quality;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(format);
    return acc;
  }, {} as Record<string, typeof formats>);

  return (
    <Card className="w-full max-w-2xl p-6 animate-fadeIn">
      <div className="flex flex-col gap-4">
        <div className="aspect-video relative overflow-hidden rounded-lg">
          <img 
            src={thumbnail} 
            alt={title} 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold font-poppins">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Object.entries(groupedFormats).map(([quality, formats]) =>
            formats.map((format, index) => (
              <Button
                key={`${quality}-${index}`}
                variant="outline"
                onClick={() => handleDownload(format.url, format.quality, format.format)}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                {quality} {format.format}
              </Button>
            ))
          )}
        </div>
      </div>
    </Card>
  );
}