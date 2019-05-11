import React from "react";

//Check whether the password meets our requirements (1 lowercase, 1 uppercase, 1 number, and 8 characters)
export const PasswordReqs = props => {
  let message = `Your password requires:`;
  if (!props.hasLowerChars) {
    message = `${message} 1 lowercase character`;
  }
  if (!props.hasUpperChars) {
    props.hasLowerChars
      ? (message = `${message} 1 uppercase character`)
      : (message = `${message}, 1 uppercase character`);
  }
  if (!props.hasNumChars) {
    !props.hasLowerChars || !props.hasUpperChars
      ? (message = `${message}, 1 number`)
      : (message = `${message} 1 number`);
  }
  if (!props.hasLength) {
    !props.hasLowerChars || !props.hasUpperChars || !props.hasNumChars
      ? (message = `${message}, and at least 8 characters`)
      : (message = `${message} at least 8 characters`);
  }
  message = `${message}.`;

  return props.password &&
    !(
      props.hasLowerChars &&
      props.hasUpperChars &&
      props.hasNumChars &&
      props.hasLength
    ) ? (
    <p>{message}</p>
  ) : (
    ""
  );
};

//Check whether the password & confirm password match
export const ConfirmPasswordReqs = props => {
  return props.passwordConfirm &&
    props.password &&
    props.passwordConfirm !== props.password ? (
    <p>Passwords do not match!</p>
  ) : (
    ""
  );
};
