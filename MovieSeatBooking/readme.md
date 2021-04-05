# Movie Seat Booking

>나의 안일함을 확인할 수 있었던 실습이었다..☹️



## 1. 솔루션에서 배워갈 점



#### 1.1 string 을 number로 바꾸는 가장 간단한 방법

```javascript
const ticketPrice = +movieSelect.value
```



#### 1.2 dom element가 원하는 class값을 가졌나 확인할 때

```javascript
e.target.classList.contains("seat");
```



#### 1.3 class를 toggle 할 때 add, remove 없이 한방에

```javascript
e.target.classList.toggle("selected")
```



#### 1.4 node list 처럼 array 비슷한거에서 array연산을 쓰는 법

```javascript
[...selectedSeats].map(() => {});
```



#### 1.5 option 을 select

```javascript
movieSelect.selectedIndex = selectedMovieIndex;
```



#### 1.6 dom element 가 생긴게 똑같아도 다 구별되는 요소들이라는 것 

```javascript
const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
```

selectedSeats는 선택된 좌석들 dom 노드 배열

seats는 occupied 된 것 제외 전체 좌석들의 dom 노드 배열



## 2. 반성할 점



#### 2.1 dom이나 localStorage에 접근하는 코드는 최대한 자제할 것

​	같은 돔요소나 스토리지에 여러번 접근하는 경우 변수로 빼두기.



#### 2.2 innerHtml 사용은 신중에 신중을 가할 것.

​	xss 위험! 특히 localStorage 같은 경우 브라우저 사용자가 임의로 값을 수정할 수 있다.	

