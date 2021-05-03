const INITIAL_PERSON_COUNT = 5;

const main = document.querySelector('#main');
const addUserBtn = document.querySelector('#add-user');
const doubleMoneyBtn = document.querySelector('#double');
const showMillionairesBtn = document.querySelector('#show-millionaires');
const sortBtn = document.querySelector('#sort');
const calculateBtn = document.querySelector('#calculate-wealth');

addUserBtn.addEventListener('click', addUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);
showMillionairesBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sort);
calculateBtn.addEventListener('click', calculateWealth);

let personList = [];

function addUser() {
  fetch('https://randomuser.me/api')
    .then((res) => {
      // stream이라 안된다는 오류는?
      // const a = res;
      // a.json();

      //   json(), text() 이런 메소드 한번쓰면 끝. reponse 객체의 body가 readableStream 이라서
      //   const a = res.clone();
      //   a.json();
      return res.json();
    })
    .then((data) => {
      const nameObj = data.results[0].name;
      const wealth = Math.floor(Math.random() * 1000000);
      const personObj = {
        name: `${nameObj.first} ${nameObj.last}`,
        wealth,
      };
      personList.push(personObj);
      showPersonList();
    });
}

function doubleMoney() {
  personList = personList.map((person) => {
    person.wealth *= 2;
    return person;
  });
  showPersonList();
}

function showMillionaires() {
  personList = personList.filter((person) => person.wealth > 1000000);
  showPersonList();
}

function sort() {
  personList.sort((personA, personB) => personB.wealth - personA.wealth);
  showPersonList();
}

function calculateWealth() {
  const sum = personList.reduce((acc, cur) => acc + cur.wealth, 0);
  const totalElement = document.createElement('div');
  totalElement.innerHTML = `<h3>Total Wealth: <strong>$${sum.toLocaleString()}.00</strong></h3>`;
  main.appendChild(totalElement);
}

function showPersonList() {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  personList.forEach((person) => {
    main.appendChild(makePersonElement(person));
  });
}

function makePersonElement(person) {
  const personElement = document.createElement('div');
  personElement.classList.add('person');
  personElement.innerHTML = `<strong>${person.name}</strong> $${person.wealth.toLocaleString()}.00`;
  return personElement;
}

const init = () => {
  for (let i = 0; i < INITIAL_PERSON_COUNT; i++) {
    addUser();
  }
};

init();
