// See generate-password-lite github package

const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = "!#$%&'()*+,-./:;<=>?@[]^_{|}~";
const emptyCharError = '* Password character length must be greater than 0';


function getRandomChar(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function generatePassword(passwordLength, passwordCriteria) {
  let password = '';

  if (passwordLength === 0) {
    return emptyCharError;
  }

  while(password.length < passwordLength) {
    if (passwordCriteria.includes('uppercase') && password.length < passwordLength) {
      password += getRandomChar(upperCaseChars);
    }
    if (passwordCriteria.includes('lowercase') && password.length < passwordLength) {
      password += getRandomChar(lowerCaseChars);
    }
    if (passwordCriteria.includes('numbers') && password.length < passwordLength) {
      password += getRandomChar(numbers);
    }
    if (passwordCriteria.includes('symbols') && password.length < passwordLength) {
      password += getRandomChar(symbols);
    }
  }

  return password;
}


function handleSubmit(event) {
  event.preventDefault();
  // add hidden to copied text, if it was present
  copyPasswordText.classList.add('hidden');
  const emptyCharElem = document.getElementById('empty-char-error');
  const passwordText = document.getElementById('password-text');

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  const passwordLength = parseInt(data['passlength'], 10);
  const passwordCriteria = Object.keys(data);
  const password = generatePassword(passwordLength, passwordCriteria);

  if (password === emptyCharError) {
    emptyCharElem.textContent = password;
    emptyCharElem.style.setProperty('display', 'block');
  } else {
    emptyCharElem.textContent = '';
    emptyCharElem.style.setProperty('display', 'none');
    passwordText.textContent = password;
  }

  console.log(password)

}

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);


// Slider information
const passwordLengthSlider = document.querySelector("input[type='range']");
const passwordLengthText = document.getElementById('password-length');
setPasswordLength();

function setPasswordLength(val) {
  passwordLengthText.textContent = val || passwordLengthSlider.value;
}

function showPasswordLength(evt) {
  setPasswordLength(evt.target.value);
}

passwordLengthSlider.addEventListener('input', showPasswordLength);


// copy password
const copyIcon = document.getElementById('copy-icon');
const copyPasswordText = document.getElementById('copy-password-text');
const passwordText = document.getElementById('password-text');

copyIcon.addEventListener('click', () => {
  navigator.clipboard.writeText(passwordText.textContent);
  copyPasswordText.classList.remove('hidden');
});


