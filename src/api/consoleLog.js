/**
 * Show message in console log
 * @param {string} text message to show in the console log
 * @param {{color: '...', fontSize: '...', border: '...'}} styles a object with DOM styles
 * @returns message in console log
 */
const logger = (
  text,
  styles = {
    color: "",
    fontSize: "",
    border: "",
  }
) => {
  const { color, fontSize, border } = styles;
  let convertStyle = "";
  if (color == null) {
    convertStyle += "";
  } else {
    convertStyle += `color: ${color};`;
  }
  if (fontSize == null) {
    convertStyle += "";
  } else {
    convertStyle += `font-size: ${fontSize};`;
  }
  if (border === null) {
    convertStyle += "";
  } else {
    convertStyle += `-webkit-text-stroke: ${border} #000000`;
  }
  return window.console.log(`%c${text}`, convertStyle);
};
export default logger;
