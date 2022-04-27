import { CanvasManager } from "../../utils";
import { Chapter8 } from "../../chapters";

export function chapter8Saga(controller: CanvasManager) {
  const chapter8 = new Chapter8();
  controller.add(chapter8.scene);
}
