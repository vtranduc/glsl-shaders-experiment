import { Chapter15 } from "../../chapters";
import { CanvasManager } from "../../utils";

export function chapter15Saga(controller: CanvasManager) {
  const chapter15 = new Chapter15();
  controller.add(chapter15.scene);
}
