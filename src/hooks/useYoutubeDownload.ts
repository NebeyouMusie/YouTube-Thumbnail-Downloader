import { useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

interface VideoData {
  title: string;
  thumbnail: string;
  formats: Array<{
    url: string;
    quality: string;
    format: string;
  }>;
}

export function useYoutubeDownload() {
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const { toast } = useToast();

  const fetchVideoData = async (videoId: string) => {
    setIsLoading(true);
    try {
      const response = await axios.request({
        method: "GET",
        url: "https://ytstream-download-youtube-videos.p.rapidapi.com/dl",
        params: { id: videoId },
        headers: {
          "x-rapidapi-key": "0bfbe5b37amsh7b17fd001cb3b17p12220ejsnad8ca531965a",
          "x-rapidapi-host": "ytstream-download-youtube-videos.p.rapidapi.com",
        },
      });

      const formats = response.data.formats.map((format: any) => ({
        url: format.url,
        quality: format.qualityLabel || "Audio",
        format: format.container,
      }));

      setVideoData({
        title: response.data.title,
        thumbnail: response.data.thumbnail.url,
        formats,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch video data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, videoData, fetchVideoData };
}