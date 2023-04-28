function _toggleCapsLock (properties, elements) {
  console.log('Caps Lock Toggled');
  properties.capsLock = !properties.capsLock;
  for (const key of elements.keys) {
    if (key.childElementCount === 0 && !['tab', 'option', 'caps lock', 'enter', 'shift', 'delete', 'command', 'ctrl'].includes(key.textContent)) {
      key.textContent = properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
    }
  }
}

export default _toggleCapsLock;
