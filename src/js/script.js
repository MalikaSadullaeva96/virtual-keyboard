/* eslint-disable import/extensions */
import createIconHTML from './/icon.js';
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
    oninput: null,
    onclose: null
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
  },

  _createKeys () {
    const fragment = document.createDocumentFragment();
    const keyLayout = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete', 'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'caps lock', 's', 'd', 'f', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter', 'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'up', 'shift', 'ctrl', 'option', 'command', 'space', 'command', 'option', 'left', 'down', 'right'];
    keyLayout.forEach(key => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['delete', '\\', 'enter', 'shift'].indexOf(key) !== -1;

      keyElement.setAttribute('type', 'butotn');
      keyElement.classList.add('keyboard__key');

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
            this._toggleCapsLock();
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
            this.properties.value += '\n';
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
            this.properties.value += this.properties.capsLock ? key.toUpperCase : key.toLowerCase;
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
    console.log('Event Triggered ' + handlerName);
  },

  _toggleCapsLock () {
    console.log('Caps Lock Toggled');
    this.properties.capsLock = !this.properties.capsLock;
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0 && !['tab', 'option', 'caps lock', 'enter', 'shift', 'delete', 'command', 'ctrl'].includes(key.textContent)) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  open (initialValue, oninput, onclose) {

  },

  close () {

  }

};
window.addEventListener('DOMContentLoaded', function () {
  Keyboard.init();
});
