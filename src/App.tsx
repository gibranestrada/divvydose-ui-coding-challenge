import React from "react";
import "./App.css";
import useFetchPullRequests from "./useFetchPullRequests";

const App = () => {
  const { loading, setLoading, list, setList } = useFetchPullRequests();
  console.log(loading, list);
  if (loading) {
    return <h1 className="Loading">Loading...</h1>;
  }

  return (
    <div className="App">
      <h1>Pull request list</h1>
    </div>
  );
};

export default App;
