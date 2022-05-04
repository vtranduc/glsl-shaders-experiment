import { Chapter14 } from "../../chapters";
import { CanvasManager } from "../../utils";

export function chapter14Saga(controller: CanvasManager) {
  const chapter14 = new Chapter14();
  controller.add(chapter14.scene);
}
