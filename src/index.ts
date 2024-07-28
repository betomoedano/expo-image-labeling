import { ImageLabel } from "./ExpoImageLabeling.types";
import ExpoImageLabelingModule from "./ExpoImageLabelingModule";

export async function labelImageData(
  imageData: string
): Promise<{ labels: ImageLabel[] }> {
  return ExpoImageLabelingModule.labelImageData(imageData);
}
