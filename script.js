let lenghtSlider = document.querySelector("#lenghtSlider");
let sliderValue = document.querySelector("#sliderValue");

// adding default value of slider
sliderValue.textContent = lenghtSlider.value;

lenghtSlider.addEventListener("input", () => {
  sliderValue.textContent = lenghtSlider.value;
});

let checkboxes = document.querySelectorAll(".checkbox");

checkboxes.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (e.target.innerText == "radio_button_unchecked") {
      // from icon
      e.target.innerText = "task_alt"; //changing icon to tick
      e.target.nextElementSibling.nextElementSibling.checked = true;
    } else {
      e.target.innerText = "radio_button_unchecked"; //changin icon to uncheck
      e.target.nextElementSibling.nextElementSibling.checked = false;
    }
  });
});

let includeLabels = document.querySelectorAll(".row label");

includeLabels.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (e.target.previousElementSibling.innerText == "radio_button_unchecked") {
      // from icon
      e.target.previousElementSibling.innerText = "task_alt"; //changing icon to tick
    } else {
      e.target.previousElementSibling.innerText = "radio_button_unchecked"; //changin icon to uncheck
    }
  });
});

let generateBtn = document.querySelector("#generateBtn");
let password = document.getElementById("password");

generateBtn.addEventListener("click", () => {
  let length = lenghtSlider.value;

  //  .checked returns a boolean value idicating whether checked or not
  let uppercase = document.getElementById("uppercase").checked;
  let lowercase = document.getElementById("lowercase").checked;
  let numbers = document.getElementById("numbers").checked;
  let symbols = document.getElementById("symbols").checked;

  let passwordGenerated = passwordGenerator(
    length,
    uppercase,
    lowercase,
    numbers,
    symbols
  );
  console.log(passwordGenerated);

  password.value = passwordGenerated;
});

function passwordGenerator(length, uppercase, lowercase, numbers, symbols) {
  const upperSet = "QWERTYUIOPASDFGHJKLZXCVBNM";
  const lowerSet = "qwertyuiopasdfghjklzxcvbnm";
  const numberSet = "1234567890";
  const symbolSet = "!@#$%^&*()_+[]{}|;:,.<>?";

  let charset = ""; // Stores all the selected character sets
  let passwordStr = ""; // Will store the final password

  if (uppercase) {
    charset += upperSet;
    passwordStr += upperSet.charAt(Math.floor(Math.random() * upperSet.length));
  }
  if (lowercase) {
    charset += lowerSet;
    passwordStr += lowerSet.charAt(Math.floor(Math.random() * lowerSet.length));
  }
  if (numbers) {
    charset += numberSet;
    passwordStr += numberSet.charAt(
      Math.floor(Math.random() * numberSet.length)
    );
  }
  if (symbols) {
    charset += symbolSet;
    passwordStr += symbolSet.charAt(
      Math.floor(Math.random() * symbolSet.length)
    );
  }

  // Fill the remaining length with random characters from the full charset
  for (let i = passwordStr.length; i < length; i++) {
    passwordStr += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  // Shuffle the password to ensure randomness
  //* explaination at end of code
  passwordStr = passwordStr
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return passwordStr;
}

// copy icon code

let copyIcon = document.getElementById("copyIcon");

copyIcon.addEventListener("click", () => {
  if (password.value != "") {
    navigator.clipboard.writeText(password.value);
    copyIcon.innerText = "check";

    setTimeout(() => {
      copyIcon.innerText = "content_copy";
    }, 2000);
  }
});

/**
 Let’s break this down:

passwordStr.split(''):

The split('') method splits the passwordStr string into an array of individual characters.
Example: If passwordStr is "abc123", split('') converts it to ['a', 'b', 'c', '1', '2', '3'].
sort(() => Math.random() - 0.5):

The sort() method is used to sort the elements of the array.

The sorting function we provide is (Math.random() - 0.5).

Math.random() generates a random number between 0 and 1.

Subtracting 0.5 from this random number gives a value between -0.5 and 0.5.

If the result is negative, it sorts elements in one order; if positive, in another. This randomizes the order of elements.

Why this works:

Normally, sort() expects a comparison function that returns a positive, negative, or zero value to determine the order of two elements.
By returning a random positive or negative value, we make the sorting order random.
join(''):

Finally, join('') converts the array of characters back into a single string.
Example: ['a', 'b', 'c', '1', '2', '3'].join('') results in "abc123".
 */
