import { Chapter19 } from "../../chapters";
import { CanvasManager } from "../../utils";

export function chapter19Saga(controller: CanvasManager) {
  const chapter19 = new Chapter19();
  controller.add(chapter19.scene);
}
