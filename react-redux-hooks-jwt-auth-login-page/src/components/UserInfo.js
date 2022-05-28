import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const UserInfo = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.personalDetails.name}</strong> UserInfo
        </h3>
      </header>
      <img src={currentUser.personalDetails.avatar} alt="profile-img" />
      <p>
        <strong>Team:</strong> {currentUser.personalDetails.Team}
      </p>
      <p>
        <strong>Joined At:</strong> {currentUser.personalDetails.joinedAt}
      </p>
      <strong>Authorities:</strong>
    </div>
  );
};
export default UserInfo;
