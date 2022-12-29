import React, { ChangeEventHandler, useState } from "react";
import "./App.css";
import useFetchPullRequests, { Labels } from "./useFetchPullRequests";

const App = () => {
  const { isLoading, setLoading, list, setList, labels } =
    useFetchPullRequests();
  const [selectedLabel, setSelectedLabel] = useState("all");
  const [dropDownLabels, setDropDownLabels] = useState<string[]>([]);

  const pullRequestList = () => {
    const parsingLabels = (labels: Labels[]) => {
      const toFirstLetterUpperCase = (str: string) => {
        const str2 = str.charAt(0).toUpperCase() + str.slice(1);

        if (!dropDownLabels.includes(str2)) {
          setDropDownLabels((s) => [...s, str2]);
        }

        return str2;
      };

      return labels
        .filter(
          (label) => selectedLabel === "all" || label.name === selectedLabel
        )
        .map((label) => (
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
        console.log(e);
        setSelectedLabel(e.target.value);
      };
      return (
        <select onChange={handleLabelChange}>
          <option defaultValue={"All labels"} value="all">
            All labels
          </option>
          {labels.map((label, index) => (
            <option key={label + index} value={label}>
              {label}
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
      <table>
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
                <td>{pullRequest.created_at}</td>
                <td>{pullRequest.url}</td>
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
