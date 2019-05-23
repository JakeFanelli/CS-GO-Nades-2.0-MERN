import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AccountViewing = props => (
  <div>
    <FontAwesomeIcon
      icon={"edit"}
      className="editIcon"
      onClick={props.handleEdit}
      size="lg"
    />
    <div>
      <label className="label">Username</label>
      <p>{props.user.username}</p>
    </div>
    <div>
      <label className="label">Email</label>
      <p>{props.user.email}</p>
    </div>
  </div>
);

export default AccountViewing;
