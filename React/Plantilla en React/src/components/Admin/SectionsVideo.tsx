import { useState, useEffect } from "react";
import { CardVideos } from "../CardVideos";
import { FormVideos } from "../FormVideos";
import { ListVideos } from "../ListVideos";
import { axiosInstance } from "../../context/axiosInstances";
import { PreviewData, VideoType } from "../../types/video";

export const SectionsVideo = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [videoEdit, setVideoEdit] = useState<VideoType | null>(null);
  const [modoCrear, setModoCrear] = useState(true);

  const [videoPreview, setVideoPreview] = useState<PreviewData>({
    videoUrl: null,
    primarySubtitleUrl: null,
    secondarySubtitleUrl: null,
    primaryAudioUrl: null,
    secondaryAudioUrl: null,
    videoMetadata: null,
  });

  const loadVideos = async () => {
    try {
      const res = await axiosInstance.get("/videos");
      setVideos(res.data.data || res.data);
    } catch (error) {
      console.error("Error cargando videos:", error);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const handleEditVideo = (video: VideoType) => {
    setVideoEdit(video);
    setModoCrear(false);
    const newPreviewData: PreviewData = {
      videoUrl: video.url_video,
      primarySubtitleUrl: video.url_primary_subtitle,
      secondarySubtitleUrl: video.url_secondary_subtitle,
      primaryAudioUrl: video.url_primary_audio,
      secondaryAudioUrl: video.url_secondary_audio,
      videoMetadata: {
        fileName: video.file_name,
        fileFormat: video.file_format,
        duration: video.duration,
        size: video.size,
      },
    };
    setVideoPreview(newPreviewData);
  };

  const handleFormSuccess = () => {
    setModoCrear(true);
    setVideoEdit(null);
    const cleanPreviewData = {
      videoUrl: null,
      primarySubtitleUrl: null,
      secondarySubtitleUrl: null,
      primaryAudioUrl: null,
      secondaryAudioUrl: null,
      videoMetadata: null,
    };
    setVideoPreview(cleanPreviewData);
    loadVideos();
  };

  const handlePreviewChange = (previewData: PreviewData) => {
    setVideoPreview(previewData);
  };

  return (
    <div className="flex flex-wrap flex-1 gap-6 p-4">
      <FormVideos
        modoCrear={modoCrear}
        videoEdit={videoEdit}
        onSuccess={handleFormSuccess}
        onPreviewChange={handlePreviewChange}
      />
      <CardVideos
        previewData={videoPreview}
      />
      <ListVideos
        videos={videos}
        onEditClick={handleEditVideo}
      />
    </div>
  );
};