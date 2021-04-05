const localStorage = window.localStorage;

const movieSelector = document.querySelector("#movie");
const container = document.querySelector(".container");
const count = document.querySelector("#count");
const total = document.querySelector("#total");

let selectedCount = 0;
let selectedMovie = 0;
let costPerPerson = movieSelector.value;

movieSelector.addEventListener("change", () => {
  selectedMovie = movieSelector.selectedIndex;
  costPerPerson = movieSelector.value;
  saveMovieInfo();
  refreshText();
});

container.addEventListener("click", (e) => {
  const target = e.target;
  if (!target.matches(".occupied") && target.matches(".seat")) {
    if (target.matches(".selected")) {
      cancelSeat(target);
    } else {
      selectSeat(target);
    }
  }
});

const selectSeat = (target) => {
  target.classList.add("selected");
  selectedCount++;
  saveSeatsInfo();
  refreshText();
};

const cancelSeat = (target) => {
  target.classList.remove("selected");
  selectedCount--;
  saveSeatsInfo();
  refreshText();
};

const calculateCost = (costPerPerson, selectedCount) => {
  return costPerPerson * selectedCount;
};

const refreshText = () => {
  count.textContent = selectedCount;
  total.textContent = calculateCost(costPerPerson, selectedCount);
};

const saveSeatsInfo = () => {
  localStorage.setItem("seats", container.innerHTML);
  localStorage.setItem("selectedCount", selectedCount);
};

const saveMovieInfo = () => {
  localStorage.setItem("selectedMovie", selectedMovie);
  localStorage.setItem("costPerPerson", costPerPerson);
};

const loadSeatsInfo = () => {
  if (localStorage.getItem("seats")) {
    container.innerHTML = localStorage.getItem("seats");
    selectedCount = localStorage.getItem("selectedCount");
  }
};

const loadMovieInfo = () => {
  if (localStorage.getItem("selectedMovie")) {
    selectedMovie = localStorage.getItem("selectedMovie");
    costPerPerson = localStorage.getItem("costPerPerson");
    setMovieContainer();
  }
};

const setMovieContainer = () => {
  movieSelector.options[selectedMovie].selected = 1;
};

const onLoad = () => {
  loadSeatsInfo();
  loadMovieInfo();
  refreshText();
};

onLoad();
