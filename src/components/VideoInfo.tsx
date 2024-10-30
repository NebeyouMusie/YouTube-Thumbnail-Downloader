import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface VideoInfoProps {
  title: string;
  thumbnail: string;
}

export function VideoInfo({ title, thumbnail }: VideoInfoProps) {
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      const response = await fetch(thumbnail);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_thumbnail.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Thumbnail downloaded successfully!",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download thumbnail. Please try again.",
        variant: "destructive",
      });
    }
  };

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
        <Button
          onClick={handleDownload}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download Thumbnail
        </Button>
      </div>
    </Card>
  );
}