module.exports.handleErrors = (err) => {
  let errors = { email: "", password: "", username: "" };

  // Incorrect Email:
  if (err.message === "Incorrect Email") {
    errors.email = "This Email is not registered please enter correct email";
  }

  // Incorrect Password:
  if (err.message === "Incorrect Password") {
    errors.password = "Incorrect Password, please enter correct password";
  }

  // Validation Errors:
  if (err.message.includes(`User validation failed`)) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};
