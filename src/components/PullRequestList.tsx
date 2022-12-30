import React, { ChangeEventHandler, useState } from "react";
import useFetchPullRequests, { Labels } from "../hooks/useFetchPullRequests";
import { formatDate, toFirstLetterUpperCase } from "../utils";

const PullRequestList = () => {
  const [selectedLabel, setSelectedLabel] = useState("all");
  const { list, labels } = useFetchPullRequests();

  const parseLabels = (labels: Labels[]) => {
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
              <td>{parseLabels(pullRequest.labels)}</td>
              <td>{formatDate(pullRequest.created_at)}</td>
              <td>
                <a href={pullRequest.html_url} rel="noreferrer" target="_blank">
                  {pullRequest.html_url}
                </a>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default PullRequestList;
