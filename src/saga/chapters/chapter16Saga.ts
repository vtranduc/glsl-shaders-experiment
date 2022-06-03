import { Chapter16 } from "../../chapters";
import { CanvasManager } from "../../utils";

export function chapter16Saga(controller: CanvasManager) {
  const chapter16 = new Chapter16();
  controller.add(chapter16.scene);
}
