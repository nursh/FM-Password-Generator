// See generate-password-lite github package

const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = "!#$%&'()*+,-./:;<=>?@[]^_{|}~";


function getRandomChar(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}



const passwordContents = [];
const upperCase = 'upper';
const lowercase = 'lower';


function generatePassword() {
  const passwordText = document.getElementById('password');
  let password = '';
  const maxLength = 10;

  for(let i = 0; i < maxLength; i+= 1) {
    password += getRandomChar(lowerCaseChars);
    password += getRandomChar(upperCase);
    password += getRandomChar(numbers);
    password += getRandomChar(symbols);
  }

  if (passwordText) {
    passwordText.textContent = password;
  }
}

const button = document.getElementById('generate');
button.addEventListener('click', generatePassword);


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


