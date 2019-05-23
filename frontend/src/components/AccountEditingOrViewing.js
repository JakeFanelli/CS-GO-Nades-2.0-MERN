import React from "react";
import AccountEditing from "./AccountEditing";
import AccountViewing from "./AccountViewing";

const AccountEditingOrViewing = props => {
  if (props.editing === true) {
    return (
      <AccountEditing
        handleEdit={props.handleEdit}
        updateUsername={props.updateUsername}
        updateEmail={props.updateEmail}
        user={props.user}
      />
    );
  } else if (props.editing === false) {
    return <AccountViewing handleEdit={props.handleEdit} user={props.user} />;
  }
};

export default AccountEditingOrViewing;
