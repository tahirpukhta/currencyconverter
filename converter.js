const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");//for get exchange rate button element.
const fromCurr = document.querySelector(".from select");//from element.
const toCurr = document.querySelector(".to select");//to element.
const msg = document.querySelector(".msg");//will use this for final amount

//for changing currencies in "from" and "to".
for (let select of dropdowns) {
  //going through each country code and converting each to individual options.
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    //adding the options to the select.
    select.append(newOption);
  }
  //for updating flag whenever we change the "select"
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);//target tells us where the chnage happened.
  });
}
//to use await, we have to make async function.
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");//accessing the amount element after entering the amount as input.
  let amtVal = amount.value;//this contains the amount we have entered.
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";//if amtVal is empty or less than 1 then set amtVal as 1 and its value as 1 as well.
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(BASE_URL);//we got some response in json format. 1st promise
  let data = await response.json();//get data from response as JS object. Readable for us. 2nd promise
  //let from=fromCurr.value.toLowerCase();
  //let to=toCurr.value.toLowerCase();
  let fromRate = data.eur[fromCurr.value.toLowerCase()]; //1 euro=?fromRate
  let toRate = data.eur[toCurr.value.toLowerCase()];//1 euro=?toRate
  let rate=toRate/fromRate;
  let finalAmount = amtVal * rate;
  //console.log(finalAmount);
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};
//We want to change the flag also as we change the currency.
const updateFlag = (element) => {
  let currCode = element.value;//extract the currency code of the element which is select in this case. And we have image in the parent element of "select"(check Index.html). 
  let countryCode = countryList[currCode];//get country code using the currency code.
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");//going into select's parent element.
  img.src = newSrc;// we set the source of the image for each element as newsrc which changes the flag images according to the country codes which we got from currency codes.
};
//adding event listener on the button "Get Exchange Rate"
btn.addEventListener("click", (evt) => {
  evt.preventDefault();//when form gets submitted, it's default behaviour is to refresh the page. But we want to take control of the situation.
  updateExchangeRate();
});
//adding an event listener for the moment when our document loads for the first time. 
window.addEventListener("load", () => {
  updateExchangeRate();
});

