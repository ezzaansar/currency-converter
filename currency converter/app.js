// Updated base URL (latest version)
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

// Get DOM elements
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

// Populate dropdowns with currency codes
for (let select of dropdown) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    }
    if (select.name === "to" && currCode === "PKR") {
      newOption.selected = true;
    }

    select.append(newOption);
  }

  // Event to update flags
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Update country flag based on currency
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

// Button click event to convert currency
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amount = document.querySelector(".amount input");
  let amtVal = parseFloat(amount.value);

  // Ensure amount is at least 1
  if (!amtVal || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  // Fetch conversion rate using updated endpoint
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();

  // Get conversion rate from base currency object
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

  // Calculate final amount
  let finalAmount = (amtVal * rate).toFixed(2);

  // Display message
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});
