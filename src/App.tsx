import React from "react";
import "./App.css";
import useFetchPullRequests from "./hooks/useFetchPullRequests";
import PullRequestList from "./components/PullRequestList";

const App = () => {
  const { isLoading, list, labels } = useFetchPullRequests();

  const Loading = () => (
    <>{isLoading && <p className="loading">Loading...</p>}</>
  );

  return (
    <div className="App">
      <h1>Pull request list</h1>
      <Loading />
      <PullRequestList list={list} labels={labels} />
    </div>
  );
};

export default App;
