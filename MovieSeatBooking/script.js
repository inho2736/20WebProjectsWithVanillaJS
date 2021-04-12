const localStorage = window.localStorage;

const movieSelector = document.querySelector('#movie');
const container = document.querySelector('.container');

const seats = container.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('#count');
const total = document.querySelector('#total');

let selectedCount = 0;
let selectedMovie = 0;
let costPerPerson = movieSelector.value;

movieSelector.addEventListener('change', () => {
  selectedMovie = movieSelector.selectedIndex;
  costPerPerson = movieSelector.value;
  saveMovieInfo();
  refreshText();
});

container.addEventListener('click', (e) => {
  const target = e.target;
  if (!target.matches('.occupied') && target.matches('.seat')) {
    if (target.matches('.selected')) {
      cancelSeat(target);
    } else {
      selectSeat(target);
    }
  }
});

const selectSeat = (target) => {
  target.classList.add('selected');
  selectedCount++;
  saveSeatsInfo();
  refreshText();
};

const cancelSeat = (target) => {
  target.classList.remove('selected');
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

// 내가 수정해야 할 함수
const saveSeatsInfo = () => {
  // 전역함수로 해놓고 갖다쓰면, 동적으로 selected가 추가된 걸 못받아옴.
  // 변화한 이후는 매번 돔 요소를 다시 갖다써야하나?

  // 맞다!! 다른 메소드들과 다르게 querySelectorAll는 Non-live 노드 리스트를 반환한다.
  // 얘만 Non-live인 이유는 각 노드별로 live를 해야해서 시간복잡도가 N배가 되기 때문이다. 성능을 위해 Non-live인 것이다.
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const saveSeatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });
  localStorage.setItem('seats', JSON.stringify(saveSeatsIndex));
  localStorage.setItem('selectedCount', selectedCount);
};

const saveMovieInfo = () => {
  localStorage.setItem('selectedMovie', selectedMovie);
  localStorage.setItem('costPerPerson', costPerPerson);
};

// 내가 수정해야 할 함수
const loadSeatsInfo = () => {
  if (localStorage.getItem('seats')) {
    const saveSeats = JSON.parse(localStorage.getItem('seats'));
    seats.forEach((seat, index) => {
      // 실제 반환된 인덱스는 쓰지 않고, -1인지 아닌지 여부만 체크하니
      // 사실상 존재하는지 아닌지를 찾는 조건임
      if (saveSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
    selectedCount = localStorage.getItem('selectedCount');
  }
};

const loadMovieInfo = () => {
  if (localStorage.getItem('selectedMovie')) {
    selectedMovie = localStorage.getItem('selectedMovie');
    costPerPerson = localStorage.getItem('costPerPerson');
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
