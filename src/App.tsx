import React, { ChangeEventHandler, useState } from "react";
import "./App.css";
import useFetchPullRequests, { Labels } from "./useFetchPullRequests";
import { format } from "date-fns";

const App = () => {
  const { isLoading, setLoading, list, setList, labels } =
    useFetchPullRequests();
  const [selectedLabel, setSelectedLabel] = useState("all");

  const toFirstLetterUpperCase = (str: string) => {
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return str2;
  };

  const pullRequestList = () => {
    const parsingLabels = (labels: Labels[]) => {
      return labels.map((label) => (
        <div
          className={`label ${label.name}`}
          style={{ backgroundColor: `#${label.color}` }}
        >
          {toFirstLetterUpperCase(label.name)}{" "}
        </div>
      ));
    };

    const dropDownLabelList = () => {
      const handleLabelChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        setSelectedLabel(e.target.value);
      };
      return (
        <select onChange={handleLabelChange}>
          <option defaultValue={"All labels"} value="all">
            All labels
          </option>
          {labels.map((label, index) => (
            <option key={label + index} value={label}>
              {toFirstLetterUpperCase(label)}
            </option>
          ))}
        </select>
      );
    };

    const filterPullRequests = (labelsArr: Labels[]) => {
      return labelsArr.some(
        (labels) => selectedLabel === "all" || labels.name === selectedLabel
      );
    };

    return (
      <table id="pull-requests">
        <thead>
          <tr>
            <th>Title</th>
            <th>{dropDownLabelList()}</th>
            <th>Date opened</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {list
            .filter((pr) => filterPullRequests(pr.labels))
            .map((pullRequest) => (
              <tr key={pullRequest.title}>
                <td>{pullRequest.title}</td>
                <td>{parsingLabels(pullRequest.labels)}</td>
                <td>
                  {format(new Date(pullRequest.created_at), "MM/dd/yyyy")}
                </td>
                <td>
                  <a
                    href={pullRequest.html_url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {pullRequest.html_url}
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="App">
      <h1>Pull request list</h1>
      {isLoading && <p className="loading">Loading...</p>}
      {pullRequestList()}
    </div>
  );
};

export default App;
