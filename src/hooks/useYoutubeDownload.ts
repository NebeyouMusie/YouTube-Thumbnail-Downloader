import { useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

interface VideoFormat {
  url: string;
  quality: string;
  format: string;
}

interface VideoData {
  title: string;
  thumbnail: string;
  formats: VideoFormat[];
}

export function useYoutubeDownload() {
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const { toast } = useToast();

  const fetchVideoData = async (videoId: string) => {
    setIsLoading(true);
    try {
      const response = await axios.request({
        method: 'GET',
        url: 'https://yt-api.p.rapidapi.com/dl',
        params: {
          id: videoId,
          cgeo: 'DE'
        },
        headers: {
          'x-rapidapi-key': '0bfbe5b37amsh7b17fd001cb3b17p12220ejsnad8ca531965a',
          'x-rapidapi-host': 'yt-api.p.rapidapi.com'
        }
      });

      // Map the API response to our VideoData interface
      const formats = response.data.formats.map((format: any) => ({
        url: format.url,
        quality: format.qualityLabel || format.quality || 'Audio',
        format: format.container || 'mp4'
      }));

      setVideoData({
        title: response.data.title,
        thumbnail: response.data.thumbnail[response.data.thumbnail.length - 1]?.url || response.data.thumbnail[0]?.url,
        formats: formats
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch video data. Please try again.",
        variant: "destructive",
      });
      console.error('Error fetching video:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, videoData, fetchVideoData };
}