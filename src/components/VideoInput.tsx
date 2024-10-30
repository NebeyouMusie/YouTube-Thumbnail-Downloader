import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface VideoInputProps {
  onSubmit: (videoId: string) => void;
  isLoading: boolean;
}

export function VideoInput({ onSubmit, isLoading }: VideoInputProps) {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = extractVideoId(url);
    
    if (!videoId) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube video URL",
        variant: "destructive",
      });
      return;
    }

    onSubmit(videoId);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl gap-2">
      <Input
        type="url"
        placeholder="Paste YouTube URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading || !url}>
        {isLoading ? "Loading..." : "Download"}
      </Button>
    </form>
  );
}