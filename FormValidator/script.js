"use strict";

class FormCtrl {
  constructor(sort) {
    this.formCtrl = document.querySelector(`#${sort}`).parentElement;
    this.input = this.formCtrl.querySelector("input");
    this.errorMessage = this.formCtrl.querySelector("small");
  }
  setSuccessState() {
    this.formCtrl.classList.add("success");
    this.formCtrl.classList.remove("error");
  }
  setErrorState() {
    this.formCtrl.classList.add("error");
    this.formCtrl.classList.remove("success");
  }
  setErrorMessage(message) {
    this.errorMessage.textContent = message;
  }
}

class UsernameFormCtrl extends FormCtrl {
  constructor() {
    super("username");
  }

  validate() {
    if (this.input.value.length < 3) {
      this.setErrorState();
      this.setErrorMessage("Username must be at least 3 characters");
    } else {
      this.setSuccessState();
    }
  }
}

class EmailFormCtrl extends FormCtrl {
  constructor() {
    super("email");
  }
  validate() {
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (!this.input.value.match(regExp)) {
      this.setErrorState();
      this.setErrorMessage("Email is not valid");
    } else {
      this.setSuccessState();
    }
  }
}

class PwdFormCtrl extends FormCtrl {
  constructor() {
    super("password");
  }
  validate() {
    if (this.input.value.length < 6) {
      this.setErrorState();
      this.setErrorMessage("Password must be at least 3 characters");
    } else {
      this.setSuccessState();
    }
  }
}

class PwdConfirmFormCtrl extends FormCtrl {
  constructor() {
    super("password2");
  }
  validate(pwd) {
    if (this.input.value !== pwd) {
      this.setErrorState();
      this.setErrorMessage("Password2 is required");
    } else {
      this.setSuccessState();
    }
  }
}

const usernameFormCtrl = new UsernameFormCtrl();
const emailFormCtrl = new EmailFormCtrl();
const pwdFormCtrl = new PwdFormCtrl();
const pwdConfirmFormCtrl = new PwdConfirmFormCtrl();

const submitBtn = document.querySelector("button");
submitBtn.addEventListener("click", validate);

function validate(event) {
  event.preventDefault();
  usernameFormCtrl.validate();
  emailFormCtrl.validate();
  pwdFormCtrl.validate();
  pwdConfirmFormCtrl.validate(pwdFormCtrl.input.value);
}
