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

export default combineReducers({
  key: keyReducer,
  canvas: canvasReducer,
  chapter: chapterReducer,
  mouse: mouseReducer,
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
};
