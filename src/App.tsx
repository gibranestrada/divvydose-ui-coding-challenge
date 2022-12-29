import React from "react";
import "./App.css";
import useFetchPullRequests from "./useFetchPullRequests";

const App = () => {
  const { loading, setLoading, list, setList } = useFetchPullRequests();
  return (
    <div className="App">
      <h1>Pull request list</h1>
    </div>
  );
};

export default App;
