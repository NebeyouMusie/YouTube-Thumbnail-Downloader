import { ThemeToggle } from "@/components/ThemeToggle";
import { VideoInput } from "@/components/VideoInput";
import { VideoInfo } from "@/components/VideoInfo";
import { useYoutubeDownload } from "@/hooks/useYoutubeDownload";

const Index = () => {
  const { isLoading, videoData, fetchVideoData } = useYoutubeDownload();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeToggle />
      <div className="container flex flex-col items-center justify-center min-h-screen gap-8 py-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            YouTube Downloader
          </h1>
          <p className="text-lg text-muted-foreground">
            Download your favorite YouTube videos in various formats
          </p>
        </div>

        <VideoInput onSubmit={fetchVideoData} isLoading={isLoading} />

        {videoData && <VideoInfo {...videoData} />}
      </div>
    </div>
  );
};

export default Index;