/* eslint-disable import/extensions */
import createIconHTML from './/icon.js';
import _toggleCapsLock from './/toggleCapsLock.js';

let shifCount = 0;
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
    capsLock: false
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

    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // Add to DOM
    this.elements.textareaHolder.appendChild(this.elements.textarea);
    this.elements.main.appendChild(this.elements.keysContainer);
    this.elements.wrapper.appendChild(this.elements.heading);
    this.elements.wrapper.appendChild(this.elements.textareaHolder);
    this.elements.wrapper.appendChild(this.elements.main);

    document.body.appendChild(this.elements.wrapper);

    // Add value to text area
    document.querySelectorAll('.textarea__input').forEach(element => {
      element.addEventListener('focus', () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
    });

    // test
    window.addEventListener('keydown', (event) => this._handleKeyDown(event));
    window.addEventListener('keyup', (event) => this._handleKeyUp(event));
  },

  _createKeys () {
    const fragment = document.createDocumentFragment();
    const keyCodes = [
      'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'AltLeft', 'MetaLeft', 'Space', 'MetaRight', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'
    ];
    const keyLayout = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete', 'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'caps lock', 's', 'd', 'f', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter', 'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'up', 'shift', 'ctrl', 'option', 'command', 'space', 'command', 'option', 'left', 'down', 'right'];
    keyLayout.forEach((key, index) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['delete', '\\', 'enter', 'shift'].indexOf(key) !== -1;

      keyElement.setAttribute('type', 'butotn');
      keyElement.classList.add('keyboard__key');

      keyElement.setAttribute('data-key', keyCodes[index]);

      switch (key) {
        case 'delete':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.innerHTML = createIconHTML('backspace');

          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
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
          break;

        case 'option':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.innerHTML = 'option';
          break;

        case 'command':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.innerHTML = 'command';
          break;

        case 'enter':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.innerHTML = createIconHTML('keyboard_return');

          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
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
          keyElement.innerHTML = createIconHTML('arrow_drop_up');
          break;

        case 'left':
          keyElement.innerHTML = createIconHTML('arrow_left');
          break;

        case 'right':
          keyElement.innerHTML = createIconHTML('arrow_right');
          break;

        case 'down':
          keyElement.innerHTML = createIconHTML('arrow_drop_down');
          break;

        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            this._triggerEvent('oninput');
          });
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
  },

  _handleKeyUp (event) {
    const keyCode = event.code;
    const keyElement = this.elements.keysContainer.querySelector(`[data-key="${keyCode}"]`);
    if (keyElement) {
      _toggleCapsLock(this.properties, this.elements);
      keyElement.classList.toggle('keyboard__key_active', this.properties.capsLock);
    }
  },

  _handleKeyDown (event) {
    const key = event.key;
    const keyCode = event.code;
    const keyElement = this.elements.keysContainer.querySelector(`[data-key="${keyCode}"]`);
    if (keyElement) {
      event.preventDefault();
      keyElement.classList.add('keyboard__key_pressed');

      if (key === 'CapsLock') {
        if (!event.repeat) {
          _toggleCapsLock(this.properties, this.elements);
          keyElement.classList.toggle('keyboard__key_active', this.properties.capsLock);
        }
      } else if (key === 'Backspace') {
        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
        this._triggerEvent('oninput');
      } else {
        this.properties.value += (this.properties.capsLock && !event.shiftKey) || (!this.properties.capsLock && event.shiftKey) ? key.toUpperCase() : key.toLowerCase();
        this._triggerEvent('oninput');
      }
    }
  }

};
window.addEventListener('DOMContentLoaded', function () {
  Keyboard.init();
});
