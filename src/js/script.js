/* eslint-disable import/extensions */
import createIconHTML from './/icon.js';
import _toggleCapsLock from './/toggleCapsLock.js';
import { handleKeyDown, handleKeyUp } from './keyHandlers.js';
import { addTextareaNavigation } from './/textAreaNav.js';
let ctrlAPressed = false;
let shiftPressed = false;

let shifCount = 0;
const keyLayoutShift = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'delete', 'tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'caps lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'enter', 'shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'up', 'shift', 'ctrl', 'option', 'command', 'space', 'command', 'option', 'left', 'down', 'right'];
export const keyLayout = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete', 'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'caps lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter', 'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'up', 'shift', 'ctrl', 'option', 'command', 'space', 'command', 'option', 'left', 'down', 'right'];
export const russianLayout = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete', 'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'caps lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter', 'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'up', 'shift', 'ctrl', 'option', 'command', 'space', 'command', 'option', 'left', 'down', 'right'];
export const russianLayoutShift = ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'delete', 'tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'caps lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'enter', 'shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', 'up', 'shift', 'ctrl', 'option', 'command', 'space', 'command', 'option', 'left', 'down', 'right'];

const Keyboard = {
  elements: {
    wrapper: null,
    textarea: null,
    textareaHolder: null,
    heading: null,
    main: null,
    keysContainer: null,
    keys: []

  },

  evenHandlers: {
    oninput: null
  },

  properties: {
    value: '',
    capsLock: false,
    language: 'EN',
    selectAll: false
  },

  init () {
    // Create main elements
    this.elements.wrapper = document.createElement('main');
    this.elements.heading = document.createElement('h1');
    this.elements.textarea = document.createElement('textarea');
    this.elements.textareaHolder = document.createElement('div');

    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    this.elements.heading.innerHTML = 'RSS Виртуальная клавиатура';

    // Setup elements
    this.elements.wrapper.classList.add('wrapper');
    this.elements.heading.classList.add('wrapper__heading');
    this.elements.textarea.classList.add('textarea__input');
    this.elements.textareaHolder.classList.add('textarea');

    this.elements.textarea.setAttribute('autofocus', 'autofocus');

    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // Add to DOM
    this.elements.textareaHolder.appendChild(this.elements.textarea);
    this.elements.main.appendChild(this.elements.keysContainer);
    this.elements.textarea.addEventListener('input', (event) => {
      this.properties.value = this.elements.textarea.value;
    });
    this.elements.wrapper.appendChild(this.elements.heading);
    this.elements.wrapper.appendChild(this.elements.textareaHolder);
    this.elements.wrapper.appendChild(this.elements.main);

    document.body.appendChild(this.elements.wrapper);

    this.elements.textarea.addEventListener('input', () => {
      this.properties.value = this.elements.textarea.value;
    });

    // test
    window.addEventListener('keydown', (event) => handleKeyDown(event, Keyboard, keyLayout, keyLayoutShift));
    window.addEventListener('keyup', (event) => handleKeyUp(event, Keyboard, keyLayout, keyLayoutShift));

    document.addEventListener('keydown', (event) => {
      if (event.metaKey && event.key.toLowerCase() === 'a') {
        ctrlAPressed = true;
      }
      if (event.key === 'ArrowUp') {
        console.log('ArrowUp pressed');
        event.preventDefault();
      }
    });

    // move cursor
    addTextareaNavigation(this.elements.textarea);
  },

  _createKeys () {
    const fragment = document.createDocumentFragment();
    const keyCodes = [
      'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'AltLeft', 'MetaLeft', 'Space', 'MetaRight', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'
    ];
    keyLayout.forEach((key, index) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['delete', '\\', 'enter', 'shift'].indexOf(key) !== -1;

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      keyElement.setAttribute('data-key', keyCodes[index]);

      switch (key) {
        case 'delete':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.innerHTML = createIconHTML('backspace');
          keyElement.addEventListener('click', () => {
            const textarea = Keyboard.elements.textarea;
            const cursorPosition = textarea.selectionStart;
            const selectionEnd = textarea.selectionEnd;

            if (ctrlAPressed) {
              Keyboard.properties.value = '';
              ctrlAPressed = false;
              textarea.setSelectionRange(0, 0);
            } else if (selectionEnd > cursorPosition) {
              Keyboard.properties.value = Keyboard.properties.value.slice(0, cursorPosition) + Keyboard.properties.value.slice(selectionEnd);
              textarea.setSelectionRange(cursorPosition, cursorPosition);
            } else if (cursorPosition > 0) {
              Keyboard.properties.value = Keyboard.properties.value.slice(0, cursorPosition - 1) + Keyboard.properties.value.slice(cursorPosition);
              textarea.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
            }

            textarea.focus();
            Keyboard._triggerEvent('oninput');
          });

          break;
        case 'tab':
          keyElement.innerHTML = 'tab';
          keyElement.addEventListener('click', () => {
            this.properties.value += '    ';
            this._triggerEvent('oninput');
          });
          break;

        case 'caps lock':
          keyElement.classList.add('keyboard__key_wide', 'keyboard__key_activatable');
          keyElement.innerHTML = 'caps lock';

          keyElement.addEventListener('click', () => {
            _toggleCapsLock(this.properties, this.elements);
            keyElement.classList.toggle('keyboard__key_active', this.properties.capsLock);
          });
          break;

        case 'shift':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.innerHTML = 'shift';
          keyElement.addEventListener('mousedown', () => {
            shiftPressed = true;
            console.log(shiftPressed);
            const layout = Keyboard.properties.language === 'EN' ? keyLayoutShift : russianLayoutShift;
            Keyboard.elements.keys.forEach((key, index) => {
              if (key.textContent.length === 1) {
                key.textContent = layout[index];
              }
            });
          });

          keyElement.addEventListener('mouseup', () => {
            shiftPressed = false;
            const layout = Keyboard.properties.language === 'EN' ? keyLayout : russianLayout;
            Keyboard.elements.keys.forEach((key, index) => {
              if (key.textContent.length === 1) {
                key.textContent = layout[index];
              }
            });
          });

          break;

        case 'option':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.innerHTML = 'option';
          this.properties.value = '';
          break;

        case 'command':
          keyElement.classList.add('keyboard__key_wide');
          this.properties.value = '';
          keyElement.innerHTML = 'command';
          break;

        case 'enter':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.innerHTML = createIconHTML('keyboard_return');

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this._triggerEvent('oninput');
          });
          break;

        case 'space':
          keyElement.classList.add('keyboard__key_wide-extra');
          keyElement.innerHTML = createIconHTML('space_bar');

          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this._triggerEvent('oninput');
          });
          break;

        case 'up':
          this.properties.value = '';
          keyElement.innerHTML = createIconHTML('arrow_drop_up');
          keyElement.addEventListener('click', () => {
            const cursorPosition = this.elements.textarea.selectionStart;
            const lines = this.elements.textarea.value.slice(0, cursorPosition).split('\n');
            const currentLine = lines.length - 1;
            const positionInLine = lines[currentLine].length;

            if (currentLine > 0) {
              const previousLineLength = lines[currentLine - 1].length;
              const newPosition = cursorPosition - positionInLine - Math.min(previousLineLength, positionInLine) - 1;
              this.elements.textarea.setSelectionRange(newPosition, newPosition);
            }

            this.elements.textarea.focus();
          });
          break;

        case 'left':
          keyElement.innerHTML = createIconHTML('arrow_left');
          keyElement.addEventListener('click', () => {
            const cursorPosition = this.elements.textarea.selectionStart;
            this.elements.textarea.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
            const updatedCursorPosition = this.elements.textarea.selectionStart;
            console.log('After moving left:', updatedCursorPosition);
            this.elements.textarea.focus();
          });
          break;

        case 'right':
          keyElement.innerHTML = createIconHTML('arrow_right');
          keyElement.addEventListener('click', () => {
            const cursorPosition = this.elements.textarea.selectionStart;
            this.elements.textarea.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
            const updatedCursorPosition = this.elements.textarea.selectionStart;
            console.log('After moving left:', updatedCursorPosition);
            this.elements.textarea.focus();
          });
          break;

        case 'down':
          keyElement.innerHTML = createIconHTML('arrow_drop_down');

          keyElement.addEventListener('click', () => {
            const cursorPosition = this.elements.textarea.selectionStart;
            const lines = this.elements.textarea.value.slice(0, cursorPosition).split('\n');
            const currentLine = lines.length - 1;
            const positionInLine = lines[currentLine].length;
            const totalLines = this.elements.textarea.value.split('\n');

            if (currentLine < totalLines.length - 1) {
              const nextLineLength = totalLines[currentLine + 1].length;
              const newPosition = cursorPosition + nextLineLength + 1 - Math.min(nextLineLength, positionInLine);
              this.elements.textarea.setSelectionRange(newPosition, newPosition);
            }

            this.elements.textarea.focus();
          });
          break;

        default:
          keyElement.textContent = key.toLowerCase();
          console.log('DEFAULT');
          if (key !== 'ctrl' || (key === 'arrow_left' || key === 'arrow_right')) {
            keyElement.addEventListener('click', () => {
              const keyText = keyElement.textContent.trim();
              this.properties.value += (this.properties.capsLock && !event.shiftKey) || (!this.properties.capsLock && event.shiftKey) ? keyText.toUpperCase() : keyText.toLowerCase();
              this._triggerEvent('oninput');
            });
          }
          break;
      };
      fragment.appendChild(keyElement);
      if (insertLineBreak) {
        if (key === 'shift') {
          if (shifCount > 0) {
            fragment.appendChild(document.createElement('br'));
          }
          shifCount++;
        } else {
          fragment.appendChild(document.createElement('br'));
        }
      }
    });
    return fragment;
  },

  _triggerEvent (handlerName) {
    this.elements.textarea.value = this.properties.value;
  }
};
window.addEventListener('DOMContentLoaded', function () {
  Keyboard.init();
});
