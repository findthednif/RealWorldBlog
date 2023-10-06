export const usernameValidation = {
  required: 'This field can\'t be empty',
  minLength: {
    value: 3,
    message: 'Username must be at least 3 symbols long',
  },
  maxLength: {
    value: 20,
    message: 'Username can be a maximum of 20 symbols long',
  },
};
export const emailValidation = {
  required: 'This field can\'t be empty',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    message: 'Invalid email address',
  },
  maxLength: {
    value: 40,
    message: 'Email can be a maximum of 40 symbols long',
  },
};
export const passwordValidation = {
  required: 'This field can\'t be empty',
  minLength: {
    value: 6,
    message: 'Password must be at least 6 symbols long',
  },
  maxLength: {
    value: 40,
    message: 'Password can be a maximum of 40 symbols long',
  },
};
