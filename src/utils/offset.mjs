/**
 * @param {HTMLElement} element
 * @returns {number}
 */
export function viewportOffsetTop(element) {
  const boundingClientRect = element.getBoundingClientRect();
  return boundingClientRect.top;
}
