const keyMap = {
  ARROW_DOWN: 40,
  ARROW_UP: 38,
  TAB: 9
};

const tabPressed = e => !e.shiftKey && (e.keyCode === keyMap.TAB || e.which === keyMap.TAB);
const shiftTabPressed = e => e.shiftKey && (e.keyCode === keyMap.TAB || e.which === keyMap.TAB);

export { tabPressed, shiftTabPressed, keyMap };
