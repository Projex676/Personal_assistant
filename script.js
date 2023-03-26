const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const todoList = document.getElementById("todoList");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

let isListening = false;

startButton.addEventListener('click', () => {
  isListening = true;
  recognition.start();
  startButton.disabled = true;
  stopButton.disabled = false;
});

stopButton.addEventListener('click', () => {
  isListening = false;
  recognition.stop();
  startButton.disabled = false;
  stopButton.disabled = true;
});

recognition.addEventListener('result', (event) => {
  const text = event.results[0][0].transcript;
  addToDoItem(text);
  if (isListening) {
    recognition.stop();
  }
});

recognition.addEventListener('end', () => {
  if (isListening) {
    recognition.start();
  } else {
    startButton.disabled = false;
    stopButton.disabled = true;
  }
});

function addToDoItem(text) {
  const listItem = document.createElement('li');
  listItem.textContent = text;
  todoList.appendChild(listItem);
}
