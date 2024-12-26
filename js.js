"use strict";

const account1 = {
  owner: "Ruslan Hrytsai",
  movements: [200, 1800, -400, -650, -130, 150, 450],
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2023-01-31T23:36:17.929Z",
    "2023-02-02T10:51:36.790Z",
  ],
};

const account2 = {
  owner: "Viktoriia Senko",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  pin: 2222,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
};

const account3 = {
  owner: "Sergiy Pietrovski ",
  movements: [200, 730, 340, -300, -20, 500, 3000, -460],
  pin: 3333,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
};

const accounts = [account1, account2, account3];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const hint = document.querySelector(".hint");

const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
let logIngAccount;

console.log("Account 1 Login : RH Password : 1111 ");
console.log("Account 2 Login : VS Password : 2222 ");
console.log("Account 3 Login : SP Password : 3333 ");

const uppDateFunction = (account) => {
  setInterval(setTime, 1000);
  displayMovements(account);
  calcSum(account);
};
//

const displayMovements = (account) => {
  containerMovements.innerHTML = " ";
  account.movements.forEach((element, index) => {
    //
    const listDate = new Date(account.movementsDates[index]);
    const day = `${listDate.getDate()}`.padStart(2, 0);
    const year = listDate.getFullYear();
    const month = `${listDate.getMonth() + 1}`.padStart(2, 0);
    const dateInTime = `${day}/${month}/${year}`;

    const type = element > 0 ? "deposit" : "withdrawal";
    const type_in_out = element > 0 ? "зарахування" : "зннятя";
    const Insert_Html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">
            ${index + 1} ${type_in_out}
          </div>
          <div class="movements__date"> ${dateInTime} </div>
          <div class="movements__value">${element} ₴</div>
        </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", Insert_Html);
  });
};

// Create  Log in

accounts.forEach((account) => {
  const [first, last] = account.owner.split(" ");
  const logIn = (first[0] + last[0]).toLowerCase();
  account.logIn = logIn;
});

//

// Display sum
const calcSum = (account) => {
  const revenue = account.movements
    .filter((item) => item > 0)
    .reduce((item, acc) => item + acc, 0);
  labelSumIn.textContent = `${revenue} ₴`;

  const out = account.movements
    .filter((item) => item < 0)
    .reduce((item, acc) => item + acc, 0);
  labelSumOut.textContent = `${-out} ₴`;

  logIngAccount.balance = revenue + out;
  labelSumInterest.textContent = `${logIngAccount.balance} ₴`;
  labelBalance.textContent = `${logIngAccount.balance} UAH `;
};
//
//  In account

btnLogin.addEventListener("click", (event) => {
  event.preventDefault();

  logIngAccount = accounts.find(
    (acc) => acc.logIn === inputLoginUsername.value.toLowerCase()
  );
  if (!logIngAccount) return;
  if (logIngAccount.pin === +inputLoginPin.value) {
    containerApp.classList.add("appIn");
    hint.style.display = "none";
    uppDateFunction(logIngAccount);
  } else {
    containerApp.classList.remove("appIn");
  }
  inputLoginUsername.value = "";
  inputLoginPin.value = "";
});

// Out account
btnClose.addEventListener("click", (event) => {
  event.preventDefault();
  if (
    inputCloseUsername.value === logIngAccount.logIn &&
    +inputClosePin.value === logIngAccount.pin
  ) {
    containerApp.classList.remove("appIn");
    hint.style.display = "flex";
  }
  inputCloseUsername.value = "";
  inputClosePin.value = "";
});
// add mony on balance

btnLoan.addEventListener("click", (event) => {
  event.preventDefault();
  if (+inputLoanAmount.value <= 0) return;
  logIngAccount.movements.push(+inputLoanAmount.value);
  logIngAccount.movementsDates.push(new Date());
  uppDateFunction(logIngAccount);
  inputLoanAmount.value = "";
});

// transfer mony

btnTransfer.addEventListener("click", (event) => {
  event.preventDefault();
  const searchAcc = accounts.find(
    (account) => account.logIn === inputTransferTo.value
  );
  const amount = +inputTransferAmount.value;
  if (
    inputTransferTo.value &&
    searchAcc.logIn !== logIngAccount.logIn &&
    logIngAccount.balance >= amount &&
    amount > 0
  ) {
    searchAcc.movements.push(amount);
    logIngAccount.movements.push(-amount);
    logIngAccount.movementsDates.push(new Date());
    searchAcc.movementsDates.push(new Date());
    uppDateFunction(logIngAccount);
  }
  inputTransferTo.value = "";
  inputTransferAmount.value = "";
});

// Time / Date

const setTime = () => {
  const data = new Date();
  const year = data.getFullYear();
  const month = `${data.getMonth() + 1}`.padStart(2, 0);
  const day = `${data.getDate()}`.padStart(2, 0);
  const hours = `${data.getHours()}`.padStart(2, 0);
  const minutes = `${data.getMinutes()}`.padStart(2, 0);

  labelDate.textContent = `${day}/${month}/${year}   ${hours} : ${minutes} `;
};

//