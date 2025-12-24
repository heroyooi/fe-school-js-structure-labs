export function TextInput(value, onInput) {
  const input = document.createElement('input');
  input.value = value;

  input.addEventListener('input', () => {
    onInput(input.value);
  });

  return input;
}
