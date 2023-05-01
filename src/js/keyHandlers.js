/* eslint-disable import/extensions */
import _toggleCapsLock from './/toggleCapsLock.js';
import { russianLayoutShift, russianLayout } from './script.js';
let controlPressed = false;
let optionPressed = false;
let commandPressed = false;
let shiftPressed = false;

function isMac () {
  return navigator.platform.toUpperCase().includes('MAC');
}

export function toggleLanguage (Keyboard, keyLayoutEN, keyLayoutRU) {
  if (Keyboard.properties.language === 'EN') {
    Keyboard.properties.language = 'RU';
    Keyboard.elements.keys.forEach((key, index) => {
      const keyText = key.textContent.trim();
      if (keyText.length === 1) {
        const keyRU = keyLayoutRU[index];
        key.textContent = Keyboard.properties.capsLock ? keyRU.toUpperCase() : keyRU.toLowerCase();
      }
    });
  } else {
    Keyboard.properties.language = 'EN';
    Keyboard.elements.keys.forEach((key, index) => {
      const keyText = key.textContent.trim();
      if (keyText.length === 1) {
        const keyEN = keyLayoutEN[index];
        key.textContent = Keyboard.properties.capsLock ? keyEN.toUpperCase() : keyEN.toLowerCase();
      }
    });
  }
  localStorage.setItem('selectedLanguage', Keyboard.properties.language);
  console.log(localStorage.getItem(Keyboard.properties.language));
}
export function handleKeyDown (event, Keyboard, keyLayout, keyLayoutShift) {
  const keyCode = event.code;
  const keyElement = Keyboard.elements.keysContainer.querySelector(`[data-key="${keyCode}"]`);
  if (keyElement) {
    event.preventDefault();
    keyElement.classList.add('keyboard__key_pressed');
    console.log(keyCode);
    if (keyCode === 'MetaLeft') {
      commandPressed = true;
    } else if (keyCode === 'KeyA' && commandPressed) {
      Keyboard.elements.textarea.select();
      Keyboard.properties.selectAll = true;
      controlPressed = false;
      return;
    }

    const textSelected = Keyboard.elements.textarea.selectionStart === 0 && Keyboard.elements.textarea.selectionEnd === Keyboard.properties.value.length;

    if (keyCode === 'ControlLeft') {
      controlPressed = true;
    }
    if ((keyCode === 'AltLeft') && controlPressed) {
      optionPressed = true;
      toggleLanguage(Keyboard, keyLayout, russianLayout);
    } else if (keyCode === 'Space') {
      Keyboard.properties.value += ' ';
      Keyboard._triggerEvent('oninput');
    } else if (keyCode === 'CapsLock') {
      if (!event.repeat) {
        _toggleCapsLock(Keyboard.properties, Keyboard.elements);
        keyElement.classList.toggle('keyboard__key_pressed', Keyboard.properties.capsLock);
      }
      Keyboard.elements.textarea.focus();
    } else if (keyCode === 'Backspace') {
      const textarea = Keyboard.elements.textarea;
      const cursorPosition = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;

      if (textSelected) {
        Keyboard.properties.value = Keyboard.properties.value.slice(selectionEnd);
        textarea.setSelectionRange(cursorPosition, cursorPosition);
      } else if (cursorPosition > 0) {
        Keyboard.properties.value = Keyboard.properties.value.slice(0, cursorPosition - 1) + Keyboard.properties.value.slice(cursorPosition);
        textarea.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
      }
      Keyboard.elements.textarea.focus();
      Keyboard._triggerEvent('oninput');
    } else if (keyCode === 'Enter') {
      Keyboard.properties.value += '\n';
      Keyboard._triggerEvent('oninput');
      Keyboard.elements.textarea.focus();
    } else if (keyCode === 'Tab') {
      Keyboard.properties.value += '    ';
      Keyboard._triggerEvent('oninput');
    } else if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
      if (Keyboard.properties.capsLock) {
        shiftPressed = true;
        console.log(shiftPressed);
        if (Keyboard.properties.language === 'EN') {
          Keyboard.elements.keys.forEach((key, index) => {
            if (key.textContent.length === 1) {
              key.textContent = event.shiftKey ? keyLayoutShift[index].toLowerCase() : keyLayout[index];
            }
          });
        } else if (Keyboard.properties.language === 'RU') {
          Keyboard.elements.keys.forEach((key, index) => {
            if (key.textContent.length === 1) {
              key.textContent = event.shiftKey ? russianLayoutShift[index].toLowerCase() : russianLayout[index];
            }
          });
        }
      } else {
        shiftPressed = true;
        console.log(shiftPressed);
        if (Keyboard.properties.language === 'EN') {
          Keyboard.elements.keys.forEach((key, index) => {
            if (key.textContent.length === 1) {
              key.textContent = event.shiftKey ? keyLayoutShift[index] : keyLayout[index];
            }
          });
        } else if (Keyboard.properties.language === 'RU') {
          Keyboard.elements.keys.forEach((key, index) => {
            if (key.textContent.length === 1) {
              key.textContent = event.shiftKey ? russianLayoutShift[index] : russianLayout[index];
            }
          });
        }
      }
      Keyboard.elements.textarea.focus();
    } else if (keyCode !== 'Space' && keyCode !== 'ShiftLeft' && keyCode !== 'ShiftRight' && keyCode !== 'ControlLeft' && keyCode !== 'command' && keyCode !== 'MetaRight' && keyCode !== 'MetaLeft' && keyCode !== 'AltLeft' && keyCode !== 'AltRight' && keyCode !== 'ArrowUp' && keyCode !== 'ArrowDown' && keyCode !== 'ArrowLeft' && keyCode !== 'ArrowRight') {
      const keyText = keyElement.textContent.trim();
      Keyboard.properties.value += (Keyboard.properties.capsLock && !shiftPressed) || (!Keyboard.properties.capsLock && shiftPressed) ? keyText.toUpperCase() : keyText.toLowerCase();

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
    }
    if (isMac()) {
      if (keyCode === 'CapsLock') {
        _toggleCapsLock(Keyboard.properties, Keyboard.elements);
        keyElement.classList.toggle('keyboard__key_active', Keyboard.properties.capsLock);
        Keyboard.elements.textarea.focus();
      }
    }
    if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
      shiftPressed = false;
      if (Keyboard.properties.capsLock) {
        if (Keyboard.properties.language === 'EN') {
          Keyboard.elements.keys.forEach((key, index) => {
            if (key.textContent.length === 1) {
              key.textContent = keyLayout[index].toUpperCase();
            }
          });
        } else if (Keyboard.properties.language === 'RU') {
          Keyboard.elements.keys.forEach((key, index) => {
            if (key.textContent.length === 1) {
              key.textContent = russianLayout[index].toUpperCase();
            }
          });
        }
      } else {
        if (Keyboard.properties.language === 'EN') {
          Keyboard.elements.keys.forEach((key, index) => {
            if (key.textContent.length === 1) {
              key.textContent = keyLayout[index];
            }
          });
        } else if (Keyboard.properties.language === 'RU') {
          Keyboard.elements.keys.forEach((key, index) => {
            if (key.textContent.length === 1) {
              key.textContent = russianLayout[index];
            }
          });
        }
      }
      Keyboard.elements.textarea.focus();
    } else {
      if (event.key.toLowerCase() === 'a') {
        Keyboard.properties.selectAll = false;
      }
    }
  }
};
