import { combineReducers } from "redux";
import keyReducer, { press, release } from "./keyReducer";
import canvasReducer, {
  appendToDiv,
  removeFromDiv,
  fitToDiv,
  clear,
} from "./canvasReducer";
import chapterReducer, { goToChapter } from "./chapterReducer";

export default combineReducers({
  key: keyReducer,
  canvas: canvasReducer,
  chapter: chapterReducer,
});

export {
  press,
  release,
  appendToDiv,
  removeFromDiv,
  fitToDiv,
  clear,
  goToChapter,
};
