const form = document.querySelector('form');
const firstNameInput = form.querySelector('#first-name');
const lastNameInput = form.querySelector('#last-name');
const emailInput = form.querySelector('#email');
const passwordInput = form.querySelector('#password');
const passwordConfirmInput = form.querySelector('#password-confirm');
const birthdayInput = form.querySelector('#birth-day');
const submitButton = document.querySelector('#form-button');

const nameValidation = (value) => /^(?=.{2,30}$)[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ]*([\-][a-zA-Zа-яА-ЯёЁ]+)*$/.test(value);
const emailValidation = (value) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
const passwordValidation = (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(value);
const passwordConfirmValidation = (value) => state.formData.password.value === value;
const ageValidation = (value) => {
  const today = new Date();
  const birthDate = new Date(value);
  const eighteenthBirthday = new Date(birthDate);
  eighteenthBirthday.setFullYear(birthDate.getFullYear() + 18);
  return today >= eighteenthBirthday;
}
const formValidation = (stateObj) => Object.keys(stateObj.formData).every(key => stateObj.formData[key].status === 'valid');

const state = {
  form: {
    status: 'pending',
    validation: (stateObj) => formValidation(stateObj),
  },
  formData: {
    'first-name': {
      value: '',
      status: 'pending',
      validation: nameValidation,
    },
    'last-name': {
      value: '',
      status: 'pending',
      validation: nameValidation,
    },
    email: {
      value: '',
      status: 'pending',
      validation: emailValidation,
    },
    password: {
      value: '',
      status: 'pending',
      validation: passwordValidation,
    },
    'password-confirm': {
      value: '',
      status: 'pending',
      validation: passwordConfirmValidation,
    },
    'birth-day': {
      value: '',
      status: 'pending',
      validation: ageValidation,
    },
  },
};

const render = () => {
  submitButton.disabled = (state.form.status !== 'valid');
};

const inputs = form.querySelectorAll('input');

inputs.forEach((item) => {
  item.addEventListener('input', (e) => {
    const inputState = state.formData[item.id];
    inputState.value = e.target.value;
    console.log(item.id, inputState);
  })

  item.addEventListener('blur', () => {
    const inputState = state.formData[item.id];
    inputState.status = inputState.validation(inputState.value)
      ? 'valid'
      : 'invalid';
    state.form.status = state.form.validation(state) ? 'valid' : 'invalid';
    console.log(item.id, inputState, state);
    render();
  })
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(state);
});

render();
