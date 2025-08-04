const decreaseButton = document.getElementById("decrease");
const increaseButton = document.getElementById("increase");
const resetButton = document.getElementById("reset");
const counterDisplay = document.getElementById("counter");

const settingsDialog = document.getElementById("settings-dialog");
const settingsButton = document.getElementById("settings-button");
const saveSettingsButton = document.getElementById("save-settings");
const resetSettingsButton = document.getElementById("reset-settings");
const closeSettingsButton = document.getElementById("close-settings");

const stepInput = document.getElementById("step");
const minInput = document.getElementById("min");
const maxInput = document.getElementById("max");

let data = {
  count: 0,
  settings: {
    step: 1,
    min: 0,
    max: 100,
  },
};

let { count } = data;
let { step, min, max } = data.settings;

function updateDisplay() {
  counterDisplay.textContent = count;
}

function syncStateToStorage() {
  data.count = count;
  data.settings.step = step;
  data.settings.min = min;
  data.settings.max = max;
  localStorage.setItem("counterData", JSON.stringify(data));
}

function loadFromLocalStorage() {
  const storedData = localStorage.getItem("counterData");
  if (storedData) {
    data = JSON.parse(storedData);
    count = data.count;
    step = data.settings.step;
    min = data.settings.min;
    max = data.settings.max;
  }
  updateDisplay();
}

decreaseButton.addEventListener("click", () => {
  count = Math.max(min, count - step);
  updateDisplay();
  syncStateToStorage();
});

increaseButton.addEventListener("click", () => {
  count = Math.min(max, count + step);
  updateDisplay();
  syncStateToStorage();
});

resetButton.addEventListener("click", () => {
  count = min;
  updateDisplay();
  syncStateToStorage();
});

settingsButton.addEventListener("click", () => {
  stepInput.value = step;
  minInput.value = min;
  maxInput.value = max;
  settingsDialog.showModal();
});

saveSettingsButton.addEventListener("click", () => {
  const newStep = parseInt(stepInput.value, 10);
  const newMin = parseInt(minInput.value, 10);
  const newMax = parseInt(maxInput.value, 10);

  if (
    isNaN(newStep) ||
    isNaN(newMin) ||
    isNaN(newMax) ||
    newStep <= 0 ||
    newMin >= newMax
  ) {
    alert("Por favor, ingresa valores válidos.");
    return;
  }

  step = newStep;
  min = newMin;
  max = newMax;

  if (count < min) count = min;
  if (count > max) count = max;

  updateDisplay();
  syncStateToStorage();
});

resetSettingsButton.addEventListener("click", () => {
  stepInput.value = 1;
  minInput.value = 0;
  maxInput.value = 100;

  step = 1;
  min = 0;
  max = 100;
  count = min;

  updateDisplay();
  saveData();
});

loadFromLocalStorage();
