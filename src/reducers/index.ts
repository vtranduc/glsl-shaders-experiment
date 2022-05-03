import { combineReducers } from "redux";
import keyReducer, { press, release } from "./keyReducer";
import canvasReducer, {
  appendToDiv,
  removeFromDiv,
  fitToDiv,
  clear,
} from "./canvasReducer";
import chapterReducer, { goToChapter } from "./chapterReducer";
import mouseReducer, { updateMousePosition } from "./mouseReducer";
import dragAndDropReducer, {
  enableDragAndDrop,
  disableDragAndDrop,
  dropFile,
} from "./dragAndDropReducer";

export default combineReducers({
  key: keyReducer,
  canvas: canvasReducer,
  chapter: chapterReducer,
  mouse: mouseReducer,
  dragAndDrop: dragAndDropReducer,
});

export {
  press,
  release,
  appendToDiv,
  removeFromDiv,
  fitToDiv,
  clear,
  goToChapter,
  updateMousePosition,
  enableDragAndDrop,
  disableDragAndDrop,
  dropFile,
};
