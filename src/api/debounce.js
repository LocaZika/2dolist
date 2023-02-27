/**
 *
 * @param {function} fs function to call after timeout
 * @param {number} timeout set to the number of seconds
 * @returns debouncing function
 */
export default function debounce(fs, timeout) {
  let timer;
  let timeOut;
  if (timeout == null) {
    timeOut = 300;
  } else {
    timeOut = timeout;
  }
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fs.apply(this, args);
    }, timeOut);
  };
}
