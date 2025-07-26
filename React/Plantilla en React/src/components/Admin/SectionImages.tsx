import { CardImages } from "../CardImages";
import { FormImages } from "../FormImages";
import { ListImages } from "../ListImages";

export const SectionImages = () => {
  return (
    <div className="flex-1 flex p-4 flex-wrap">
      <FormImages />
      <CardImages />
      <ListImages />
    </div>
  );
};
