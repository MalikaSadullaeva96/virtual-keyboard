import createIconHTML from 'icon.js';

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

    // Setup elements
    this.elements.wrapper.classList.add('wrapper');
    this.elements.heading.classList.add('wrapper__heading');
    this.elements.textarea.classList.add('textarea__input');
    this.elements.textareaHolder.classList.add('textarea');

    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');

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
    const keyLayout = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete', 'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'caps', 'a', 's', 'd', 'f', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter', 'done', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'up', 'shift', 'ctrl', 'option', 'command', 'space', 'command', 'option', 'left', 'down', 'right'];
    keyLayout.forEach(key => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['delete', '\\', 'enter', 'done'].indexOf(key) !== -1;

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
      };
    });
  },

  _triggerEvent (handlerName) {
    console.log('Event Triggered ' + handlerName);
  },

  _toggleCapsLock () {
    console.log('Caps Lock Toggled');
  },

  open (initialValue, oninput, onclose) {

  },

  close () {

  }

};
window.addEventListener('DOMContentLoaded', function () {
  Keyboard.init();
});
