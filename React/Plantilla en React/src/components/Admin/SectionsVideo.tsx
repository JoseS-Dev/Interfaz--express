import { CardVideos } from "../CardVideos";
import { FormVideos } from "../FormVideos";
import { ListVideos } from "../ListVideos";

export const SectionsVideo = () => {
  return (
    <div className="flex-1 flex p-4 flex-wrap">
      <FormVideos />
      <CardVideos />
      <ListVideos />
    </div>
  );
};
