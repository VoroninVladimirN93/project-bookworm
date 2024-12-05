class UserValidator {
  static validateSignUp(data) {
    const filterData = {};

    if (data.username !== undefined) {
      filterData.username = data.username;
    }
    if (data.email !== undefined) {
      filterData.email = data.email;
    }
    if (data.password !== undefined) {
      filterData.password = data.password;
    }
    if (data.phone !== undefined) {
      filterData.phone = data.phone;
    }
    const { username, email, password, phone } = filterData;

    if (
      (email === undefined && phone === undefined)
    ) {
      console.log(email, phone);
      return {
        isValid: false,
        error: "Email or phone number are required!",
      };
    }

    if (!username || typeof username !== "string" || username.trim() === "") {
      return {
        isValid: false,
        error: "Username is required and must be a non-empty string.",
      };
    }

    if (
      email &&
      (typeof email !== "string" ||
        email.trim() === "" ||
        !this.validateEmail(email))
    ) {
      return {
        isValid: false,
        error:
          "Email is required, must be a non-empty string, and must be a valid email address.",
      };
    }

    if (
      !password ||
      typeof password !== "string" ||
      password.trim() === "" ||
      !this.validatePassword(password)
    ) {
      return {
        isValid: false,
        error:
          "Password is required, must be a non-empty string, contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
      };
    }

    if (
      phone &&
      (typeof phone !== "string" ||
        phone.trim() === "" ||
        !this.validatePhone(phone))
    ) {
      return {
        isValid: false,
        error: "Phone number must be a valid format if provided.",
      };
    }

    return {
      isValid: true,
      error: null,
    };
  }

  static validateSignIn(data) {
    const { email, password } = data;

    if (
      !email ||
      typeof email !== "string" ||
      email.trim() === "" ||
      !this.validateEmail(email)
    ) {
      return {
        isValid: false,
        error: "Email is required and must be a valid email address.",
      };
    }

    if (!password || typeof password !== "string" || password.trim() === "") {
      return {
        isValid: false,
        error: "Password is required and must not be an empty string.",
      };
    }

    return {
      isValid: true,
      error: null,
    };
  }

  static validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  static validatePhone(phone) {
    const phoneRegex = /^\+?[0-9]{11}$/;
    return phoneRegex.test(phone);
  }

  static validatePassword(password) {
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumbers = /d/;
    const hasSpecialCharacters = /[!@#$%^&*()\-.,?":{}|<>]/;
    const isValidLength = password.length >= 8;

    return (
      hasUpperCase.test(password) &&
      hasLowerCase.test(password) &&
      hasNumbers.test(password) &&
      hasSpecialCharacters.test(password) &&
      isValidLength
    );
  }
}

module.exports = UserValidator;
