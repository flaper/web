export function generateEvent(name, data) {
  var event;
  if (window['CustomEvent']) {
    event = new CustomEvent(name, {detail: data});
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(name, true, true, data);
  }
  return event;
}
