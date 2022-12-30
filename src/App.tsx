import React from "react";
import "./App.css";
import useFetchPullRequests from "./hooks/useFetchPullRequests";
import PullRequestList from "./components/PullRequestList";

const App = () => {
  const { isLoading } = useFetchPullRequests();

  return (
    <div className="App">
      <h1>Pull request list</h1>
      {isLoading && <p className="loading">Loading...</p>}
      <PullRequestList />
    </div>
  );
};

export default App;
