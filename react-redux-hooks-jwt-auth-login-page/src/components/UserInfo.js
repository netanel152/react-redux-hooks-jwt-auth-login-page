import React, { useState, useEffect, useMemo } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import UserService from "../services/user.service";
import ProjectTable from "./ProjectTable";

const UserInfo = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [projectList, setProjectList] = useState([]);
  const [totalAvg, setTotalAvg] = useState(0);
  const [MmadeDadelineAvg, setMmadeDadelineAvg] = useState(0);
  const [percent, setCalcPercent] = useState();
  useEffect(() => {
    getProjectList();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Projects information",
        columns: [
          {
            Header: "Id",
            accessor: "id",
          },
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Score",
            accessor: "score",
          },
          {
            Header: "Duration In Days",
            accessor: "durationInDays",
          },
          {
            Header: "Bugs Count",
            accessor: "bugsCount",
          },
          {
            Header: "Made Dadeline",
            accessor: "madeDadeline",
          },
          {
            Header: "Color",
            accessor: "color",
          },
        ],
      },
    ],
    []
  );

  const getProjectList = () => {
    UserService.getPublicContent().then(
      (response) => {
        let arr = [];
        var sumAll = 0;
        var sumMmadeDadeline = 0;
        var countMadeDadeline = 0;
        for (let index = 0; index < response.data.length; index++) {
          let color = "";
          if (response.data[index].score > 90) {
            color = "green";
          } else if (response.data[index].score < 70) {
            color = "red";
          }
          if (response.data[index].madeDadeline) {
            countMadeDadeline += 1;
            sumMmadeDadeline += response.data[index].score;
          }
          sumAll += response.data[index].score;
          arr.push({
            id: response.data[index].id,
            name: response.data[index].name,
            score: response.data[index].score.toString(),
            bugsCount: response.data[index].bugsCount.toString(),
            durationInDays: response.data[index].durationInDays.toString(),
            madeDadeline: response.data[index].madeDadeline.toString(),
            color: color,
          });
        }

        let calcPercent = (countMadeDadeline / response.data.length) * 100;
        var fixCalcPercentNum = calcPercent.toFixed(2);
        setCalcPercent(fixCalcPercentNum);

        var totalMadeDadelineAvg = sumMmadeDadeline / countMadeDadeline;
        var fixTotalMmadeDadelineAvgNum = totalMadeDadelineAvg.toFixed(2);
        setMmadeDadelineAvg(fixTotalMmadeDadelineAvgNum);

        var totalAvg = sumAll / response.data.length;
        var fixTotalAvgNum = totalAvg.toFixed(2);
        setTotalAvg(fixTotalAvgNum);
        console.log("after convert to string", arr);
        setProjectList(arr);
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

  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="container">
      <header className="jumbotron">
        <h2>User Info</h2>
        <h3>
          <strong>Name: {currentUser[0].personalDetails.name}</strong>
        </h3>
      </header>
      <img src={currentUser[0].personalDetails.avatar} alt="profile-img" />
      <p>
        <strong>Team:</strong> {currentUser[0].personalDetails.Team}
      </p>
      <p>
        <strong>Joined At:</strong> {currentUser[0].personalDetails.joinedAt}
      </p>
      <div>
        <p>
          <strong>The avg of all projects is</strong> {totalAvg}
        </p>
        <p>
          <strong>The avg of all projects that made dadeline is</strong>{" "}
          {MmadeDadelineAvg} <strong>and the percent is</strong> {percent}%
        </p>
        <ProjectTable columns={columns} data={projectList} />
      </div>
    </div>
  );
};
export default UserInfo;
