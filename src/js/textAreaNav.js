export function addTextareaNavigation (textarea) {
  textarea.addEventListener('keydown', (event) => {
    const cursorPosition = textarea.selectionStart;
    const lines = textarea.value.split('\n');

    let currentLine = 0;
    let currentColumn = 0;
    let totalChars = 0;

    for (let i = 0; i < lines.length; i++) {
      if (totalChars + lines[i].length >= cursorPosition) {
        currentLine = i;
        currentColumn = cursorPosition - totalChars;
        break;
      } else {
        totalChars += lines[i].length + 1; // +1 for the line break
      }
    }

    switch (event.key) {
      case 'ArrowUp':
        if (currentLine > 0) {
          const newPosition = totalChars - currentColumn - 1;
          textarea.setSelectionRange(newPosition, newPosition);
        }
        break;
      case 'ArrowDown':
        if (currentLine < lines.length - 1) {
          const newPosition = totalChars + lines[currentLine].length + 1 + currentColumn;
          textarea.setSelectionRange(newPosition, newPosition);
        }
        break;
      case 'ArrowLeft':{
        const updatedCursorPosition = cursorPosition - 1;
        textarea.setSelectionRange(updatedCursorPosition, updatedCursorPosition);
        textarea.focus();
        break;
      }
      case 'ArrowRight':{
        const updatedCursorPosition = cursorPosition + 1;
        textarea.setSelectionRange(updatedCursorPosition, updatedCursorPosition);
        textarea.focus();
        break;
      }
    }
  });
}
