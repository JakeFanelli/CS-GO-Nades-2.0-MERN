import React from "react";

export const PasswordReqs = props => {
  let message = `Your password requires:`;

  if (!props.hasLowerChars) {
    message = `${message} 1 lowercase character`;
  }
  if (!props.hasUpperChars) {
    if (!props.hasLowerChars) {
      message = `${message}, 1 uppercase character`;
    } else {
      message = `${message} 1 uppercase character`;
    }
  }
  if (!props.hasNumChars) {
    if (!props.hasLowerChars || !props.hasUpperChars) {
      message = `${message}, 1 number`;
    } else {
      message = `${message} 1 number`;
    }
  }
  if (!props.hasLength) {
    if (!props.hasLowerChars || !props.hasUpperChars || !props.hasNumChars) {
      message = `${message}, and at least 8 characters`;
    } else {
      message = `${message} at least 8 characters`;
    }
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

export const ConfirmPasswordReqs = props => {
  if (
    props.passwordConfirm &&
    props.password &&
    props.passwordConfirm !== props.password
  ) {
    return <p>Passwords do not match!</p>;
  } else {
    return <p />;
  }
};
