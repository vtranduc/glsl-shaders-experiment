import { CanvasManager } from "../../utils";
import { Chapter4 } from "../../chapters";

export function chapter4Saga(controller: CanvasManager) {
  const chapter4 = new Chapter4();
  controller.add(chapter4.scene);
  const animation = () => chapter4.updateUniform();
  controller.requestAnimation(animation);
}
