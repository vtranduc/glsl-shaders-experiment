import { Chapter13 } from "../../chapters";
import { CanvasManager } from "../../utils";

export function chapter13Saga(controller: CanvasManager) {
  const chapter13 = new Chapter13();
  controller.add(chapter13.scene);
  controller.setCameraPosition(50, 50, 50);
  controller.requestAnimation(chapter13.updateOnAnimationFrame);
}
