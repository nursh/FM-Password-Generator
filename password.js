const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!#$%&'()*+,-./:;<=>?@[]^_{|}~";
const errors = {
  length: false,
  criteria: false,
};

function getRandomChar(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
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