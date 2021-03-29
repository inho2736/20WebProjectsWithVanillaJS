# Form Validator

> 클래스형으로 짜는 연습을 하고 싶어서 강의를 듣게 되었는데, 간단해서 그런지 정작 솔루션 코드는 함수형이었다.
> 
> 그래도 코드에서 반성할 점을 찾아보았다.

___


## 1. classlist 의 수정
classlist에 특정 class를 추가하면서 삭제하는 그런 토글식의 변화가 필요했다.
나는 원래 하던대로 
```
this.formCtrl.classList.add("success");
this.formCtrl.classList.remove("error");
```
이런 식으로 작성했다. 
문제는 리스트에 add, remove하기 전 해당 class가 이미 있는지 확인하는 코드는 넣지 않았다.
메소드 자체가 가능하면 수행하고, 실패해도 Error를 throw하지 않긴 했지만 그래도 찜찜하다.

솔루션 코드
```
formControl.className = "form-control error";
```
이렇게 classlist 자체를 덮어쓰는 방식을 사용했다. 
아직 뭐가 맞고 뭐가 틀린지 내가 판단할 수는 없지만, 이런 토글식 상황에서는 직접 넣었다 뺐다 하는것보다 이렇게 아예 리스트를 갱신하는 방식이 좀 더 깔끔해 보인다.

___
## 2. 중복 함수(or 메소드)
username 이나 password의 경우 두 값 모두 input.value의 길이를 체크하는 함수가 필요했다.
나는 동일 클래스를 상속하는 별도의 클래스로 구현해 길이체크 코드를 두번 작성했다. 솔루션에서는 한 함수로 구현하고 공유한 대신, 그 함수를 아주 정밀하게 작성했다.

```
// 각 validate()는 다른 class의 method 입니다.

validate() {
  if (this.input.value.length < 3) {
    this.setErrorState();
    this.setErrorMessage("Username must be at least 3 characters");
  } else {
    this.setSuccessState();
  }
}

validate() {
  if (this.input.value.length < 6) {
    this.setErrorState();
    this.setErrorMessage("Password must be at least 3 characters");
  } else {
    this.setSuccessState();
  }
}
```

솔루션 코드
```
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}
```
명세가 자세히 나와있지 않아서 최댓값까지 validate해줄 생각을 못했다. 
어쩌면 당연한 건데 명세가 핑계가 된 것 같다. 반성한다😢
___
## 이후 알아볼 것들

뭘 구현할 지에 따라, 클래스형과 함수형 중에서 어떤 방식을 택하는게 좋을지에 관한 여러 자료를 찾아봐야겠다.

