import { Chapter17 } from "../../chapters";
import { CanvasManager } from "../../utils";

export function chapter17Saga(controller: CanvasManager) {
  const chapter17 = new Chapter17();
  controller.add(chapter17.scene);
  controller.requestAnimation(chapter17.updateOnAnimationFrame);
}
