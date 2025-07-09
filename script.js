const passwordStrengthMap = {
  "very weak": {
    text: 'Very Weak',
    cssClass: 'very-weak'
  },
  "weak": {
    text: 'Weak',
    cssClass: 'weak'
  },
  "medium": {
    text: 'Medium',
    cssClass: 'medium'
  },
  "strong": {
    text: "Strong",
    cssClass: 'strong'
  }
}

function handleSubmit(event) {
  event.preventDefault();
  // add hidden to copied text, if it was present
  copyPasswordText.classList.add("hidden");
  const emptyCharElem = document.getElementById("empty-char-error");
  const emptyCriteria = document.getElementById("empty-criteria-error");
  const passwordText = document.getElementById("password-text");

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  const passwordLength = parseInt(data["passlength"], 10);
  const [_, ...passwordCriteria] = Object.keys(data);
  const password = generatePassword(passwordLength, passwordCriteria);

  if (errors["length"] && errors["criteria"]) {
    emptyCriteria.classList.remove("hide-error");
    emptyCharElem.classList.remove("hide-error");
  } else if (errors["length"]) {
    emptyCharElem.classList.remove("hide-error");
    emptyCriteria.classList.add("hide-error");
  } else if (errors["criteria"]) {
    emptyCriteria.classList.remove("hide-error");
    emptyCharElem.classList.add("hide-error");
  } else {
    emptyCharElem.classList.add("hide-error");
    emptyCriteria.classList.add("hide-error");
    const passwordStrength = calculatePasswordEntropy(
      password,
      passwordCriteria
    );
    const { text, cssClass } = passwordStrengthMap[passwordStrength];
    setPasswordStyles(cssClass, text)
    passwordText.textContent = password;
    passwordText.style.setProperty('color', 'var(--clr-grey-200)');
  }
}

function setPasswordStyles(cssClass, text) {
  const passwordStrengthText = document.getElementById('password-strength-text');
  passwordStrengthText.textContent = text;

  const passwordStrengthIndicator = document.getElementById('password-strength-indicator');
  passwordStrengthIndicator.setAttribute('class', cssClass);
}

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

// Slider information
const passwordLengthSlider = document.querySelector("input[type='range']");
const passwordLengthText = document.getElementById("password-length");
setPasswordLength();

function setPasswordLength(val) {
  passwordLengthText.textContent = val || passwordLengthSlider.value;
}

function handleSliderChange(evt) {
  const value = evt.target.value;
  const max = this.getAttribute('max');
  setPasswordLength(value);

  
  const sliderVal = +value / +max * 100;
  this.style.setProperty('--slider-val', `${sliderVal}%`);
}

passwordLengthSlider.addEventListener("input", handleSliderChange);

// copy password
const copyIcon = document.getElementById("copy-icon");
const copyPasswordText = document.getElementById("copy-password-text");
const passwordText = document.getElementById("password-text");

copyIcon.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordText.textContent);
  copyPasswordText.classList.remove("hidden");
});
