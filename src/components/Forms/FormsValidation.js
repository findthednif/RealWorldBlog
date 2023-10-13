export const usernameValidation = {
  required: 'This field can\t be empty',
  minLength: {
    value: 3,
    message: 'Username must be at least 3 symbols long',
  },
  maxLength: {
    value: 20,
    message: 'Username can be a maximum of 20 symbols long',
  },
  validate: {
    invalidCharacters: (value) => {
      const forbiddenCharacters = /[@!#$%^&*(),.?":{}|<>]/;
      if (forbiddenCharacters.test(value)) {
        return 'Username can\'t contain characters like @, !, #, etc.';
      }
      return true;
    },
  },
};
export const emailValidation = {
  required: 'This field can\t be empty',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    message: 'Invalid email. Template: example@example.com',
  },
  maxLength: {
    value: 40,
    message: 'Email can be a maximum of 40 symbols long',
  },
};
export const passwordValidation = {
  required: 'This field can\t be empty',
  minLength: {
    value: 6,
    message: 'Password must be at least 6 symbols long',
  },
  maxLength: {
    value: 40,
    message: 'Password can be a maximum of 40 symbols long',
  },
  validate: {
    strongPassword: (value) => {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasDigits = /\d/.test(value);
      if (!hasUpperCase || !hasLowerCase || !hasDigits) {
        return 'Password must contain at least one uppercase letter, one lowercase letter and one digit.';
      }
      return true;
    },
  },
};
