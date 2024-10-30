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

      // Only include formats that have both video and audio
      const regularFormats = response.data.formats
        .filter((format: any) => format.hasVideo && format.hasAudio)
        .map((format: any) => ({
          url: format.url,
          quality: format.qualityLabel || format.quality || 'Standard',
          format: format.container || 'mp4'
        }));

      const adaptiveFormats = response.data.adaptiveFormats
        .filter((format: any) => format.hasVideo && format.hasAudio)
        .map((format: any) => ({
          url: format.url,
          quality: format.qualityLabel || format.quality,
          format: format.container || 'mp4'
        }));

      // Combine formats and remove duplicates
      const allFormats = [...regularFormats, ...adaptiveFormats]
        .filter((format, index, self) => 
          index === self.findIndex((f) => 
            f.quality === format.quality && f.format === format.format
          )
        );

      setVideoData({
        title: response.data.title,
        thumbnail: response.data.thumbnail[response.data.thumbnail.length - 1]?.url || response.data.thumbnail[0]?.url,
        formats: allFormats
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