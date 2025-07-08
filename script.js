// See generate-password-lite github package

const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!#$%&'()*+,-./:;<=>?@[]^_{|}~";
const errors = {
  length: false,
  criteria: false,
};

const passwordStrengthMap = {
  "very weak": {
    text: 'Weak',
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

function getRandomChar(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function generatePassword(passwordLength, passwordCriteria) {
  let password = "";

  errors["criteria"] = false;
  errors["length"] = false;
  const noLength = passwordLength === 0;
  const noCriteria = passwordCriteria.length === 0;

  if (noLength) {
    errors["length"] = true;
  }

  if (noCriteria) {
    errors["criteria"] = true;
  }

  if (errors["length"] || errors["criteria"]) return;

  while (password.length < passwordLength) {
    if (
      passwordCriteria.includes("uppercase") &&
      password.length < passwordLength
    ) {
      password += getRandomChar(upperCaseChars);
    }
    if (
      passwordCriteria.includes("lowercase") &&
      password.length < passwordLength
    ) {
      password += getRandomChar(lowerCaseChars);
    }
    if (
      passwordCriteria.includes("numbers") &&
      password.length < passwordLength
    ) {
      password += getRandomChar(numbers);
    }
    if (
      passwordCriteria.includes("symbols") &&
      password.length < passwordLength
    ) {
      password += getRandomChar(symbols);
    }
  }

  return password;
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
    setPasswordStrength(cssClass, text)
    passwordText.textContent = password;
  }
}

function setPasswordStrength(cssClass, text) {
  const passwordStrengthText = document.getElementById('password-strength-text');
  passwordStrengthText.textContent = text;

  const passwordStrengthIndicator = document.getElementById('password-strength-indicator');
  passwordStrengthIndicator.setAttribute('class', cssClass);
}

function calculatePasswordEntropy(password, passwordCriteria) {
  let possibleCharacters = 0;
  if (passwordCriteria.includes("lowercase"))
    possibleCharacters += lowerCaseChars.length;
  if (passwordCriteria.includes("uppercase"))
    possibleCharacters += upperCaseChars.length;
  if (passwordCriteria.includes("numbers"))
    possibleCharacters += numbers.length;
  if (passwordCriteria.includes("symbols"))
    possibleCharacters += symbols.length;

  const entropy = Math.round(
    Math.log2(Math.pow(possibleCharacters, password.length))
  );

  if (entropy <= 28) {
    return "very weak";
  } else if (entropy > 28 && entropy < 36) {
    return "weak";
  } else if (entropy >= 36 && entropy < 60) {
    return "medium";
  } else if (entropy >= 60) {
    return "strong";
  }
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

function showPasswordLength(evt) {
  setPasswordLength(evt.target.value);
}

passwordLengthSlider.addEventListener("input", showPasswordLength);

// copy password
const copyIcon = document.getElementById("copy-icon");
const copyPasswordText = document.getElementById("copy-password-text");
const passwordText = document.getElementById("password-text");

copyIcon.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordText.textContent);
  copyPasswordText.classList.remove("hidden");
});
