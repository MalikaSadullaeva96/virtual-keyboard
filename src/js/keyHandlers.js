/* eslint-disable import/extensions */
import _toggleCapsLock from './/toggleCapsLock.js';
import { russianLayout } from './script.js';
let controlPressed = false;
let optionPressed = false;

function toggleLanguage (Keyboard, keyLayoutEN, keyLayoutRU) {
  if (Keyboard.properties.language === 'EN') {
    Keyboard.properties.language = 'RU';
    Keyboard.elements.keys.forEach((key, index) => {
      if (key.textContent.length === 1) {
        key.textContent = keyLayoutRU[index];
      }
    });
  } else {
    Keyboard.properties.language = 'EN';
    Keyboard.elements.keys.forEach((key, index) => {
      if (key.textContent.length === 1) {
        key.textContent = keyLayoutEN[index];
      }
    });
  }
}

export function handleKeyDown (event, Keyboard, keyLayout, keyLayoutShift) {
  const key = event.key;
  const keyCode = event.code;
  const keyElement = Keyboard.elements.keysContainer.querySelector(`[data-key="${keyCode}"]`);
  if (keyElement) {
    event.preventDefault();
    keyElement.classList.add('keyboard__key_pressed');

    // select whole text
    if (event.metaKey || event.ctrlKey) {
      if (key.toLowerCase() === 'a') {
        Keyboard.elements.textarea.select();
        return;
      }
    }
    const textSelected = Keyboard.elements.textarea.selectionStart === 0 && Keyboard.elements.textarea.selectionEnd === Keyboard.properties.value.length;

    if (key === 'Control') {
      controlPressed = true;
    }
    if ((event.altKey) && controlPressed) {
      optionPressed = true;
      toggleLanguage(Keyboard, keyLayout, russianLayout);
    } else if (key === ' ') {
      Keyboard.properties.value += ' ';
      Keyboard._triggerEvent('oninput');
    } else if (key === 'CapsLock') {
      if (!event.repeat) {
        _toggleCapsLock(Keyboard.properties, Keyboard.elements);
        keyElement.classList.toggle('keyboard__key_active', Keyboard.properties.capsLock);
      }
    } else if (key === 'Backspace') {
      Keyboard.properties.value = textSelected ? '' : Keyboard.properties.value.substring(0, Keyboard.properties.value.length - 1);
      Keyboard._triggerEvent('oninput');
    } else if (key === 'Enter') {
      Keyboard.properties.value += '\n';
      Keyboard._triggerEvent('oninput');
    } else if (key === 'Tab') {
      Keyboard.properties.value += '    ';
      Keyboard._triggerEvent('oninput');
    } else if (key === 'Shift') {
      Keyboard.elements.keys.forEach((key, index) => {
        if (key.textContent.length === 1) {
          key.textContent = event.shiftKey ? keyLayoutShift[index] : keyLayout[index];
        }
      });
    } else if (key !== 'Control') {
      Keyboard.properties.value += (Keyboard.properties.capsLock && !event.shiftKey) || (!Keyboard.properties.capsLock && event.shiftKey) ? key.toUpperCase() : key.toLowerCase();
      Keyboard._triggerEvent('oninput');
    } else {
      Keyboard.properties.value += (Keyboard.properties.capsLock && !event.shiftKey) || (!Keyboard.properties.capsLock && event.shiftKey) ? key.toUpperCase() : key.toLowerCase();
      Keyboard._triggerEvent('oninput');
    }
  }
};
export function handleKeyUp (event, Keyboard, keyLayout, keyLayoutShift) {
  const keyCode = event.code;
  const keyElement = Keyboard.elements.keysContainer.querySelector(`[data-key="${keyCode}"]`);
  if (keyElement) {
    keyElement.classList.remove('keyboard__key_pressed');
    if (keyCode === 'ControlLeft' || keyCode === 'ControlRight') {
      controlPressed = false;
    }
    if ((event.altKey) && optionPressed) {
      optionPressed = false;
    } else if (keyCode === 'CapsLock') {
      _toggleCapsLock(Keyboard.properties, Keyboard.elements);
      keyElement.classList.toggle('keyboard__key_active', Keyboard.properties.capsLock);
    } else if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
      Keyboard.elements.keys.forEach((key, index) => {
        if (key.textContent.length === 1) {
          key.textContent = event.shiftKey ? keyLayoutShift[index] : keyLayout[index];
        }
      });
    }
  }
};
