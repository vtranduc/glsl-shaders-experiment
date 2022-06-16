import { Chapter18 } from "../../chapters";
import { CanvasManager } from "../../utils";

export function chapter18Saga(controller: CanvasManager) {
  const chapter18 = new Chapter18();
  controller.add(chapter18.scene);
  controller.requestAnimation(chapter18.updateOnAnimationFrame);
}
