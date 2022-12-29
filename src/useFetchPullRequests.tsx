import React, { useEffect, useState } from "react";
import axios from "axios";

const URL = "https://api.github.com/repos/divvydose/ui-coding-challenge/pulls";

const useFetchPullRequests = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState();

  useEffect(() => {
    const fetchDivvydosePRs = () => {
      setLoading(true);
      axios
        .get(URL)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchDivvydosePRs();
  }, []);
  return [loading, setLoading, list, setList];
};

export default useFetchPullRequests;
