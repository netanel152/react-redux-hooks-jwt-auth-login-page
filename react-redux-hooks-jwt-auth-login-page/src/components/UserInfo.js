import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import UserService from "../services/user.service";

const UserInfo = () => {
  // const { user: currentUser } = useSelector((state) => state.auth);
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    getProjectList();
  }, []);

  const getProjectList = () => {
    UserService.getPublicContent().then(
      (response) => {
        console.log("getProjectList > response", response);
        setProjectList(response.data);
      },
      (error) => {
        const _projectList =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setProjectList(_projectList);
      }
    );
  };

  const renderTableData = () => {
    return projectList.map((item, index) => {
      return (
        <tr>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.score}</td>
          <td>{item.durationInDays}</td>
          <td>{item.bugsCount}</td>
          <td>{String(item.madeDadeline)}</td>
        </tr>
      );
    });
  };

  // if (!currentUser) {
  //   return <Redirect to="/login" />;
  // }
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          {/* <strong>{currentUser.personalDetails.name}</strong> UserInfo */}
        </h3>
      </header>
      {/* <img src={currentUser.personalDetails.avatar} alt="profile-img" /> */}
      <p>{/* <strong>Team:</strong> {currentUser.personalDetails.Team} */}</p>
      <p>
        {/* <strong>Joined At:</strong> {currentUser.personalDetails.joinedAt} */}
      </p>
      <div>
        <table className="container-table">
          <tbody>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>score</th>
              <th>durationInDays</th>
              <th>bugsCount</th>
              <th>madeDadeline</th>
            </tr>
            {renderTableData()}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UserInfo;
