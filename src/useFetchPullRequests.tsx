import { useEffect, useState } from "react";
import axios from "axios";
import { DIVVY_DOSE_PRS_URL } from "./constants";

const useFetchPullRequests = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState();

  useEffect(() => {
    const controller = new AbortController();

    const fetchDivvydosePRs = () => {
      axios
        .get(DIVVY_DOSE_PRS_URL, { signal: controller.signal })
        .then((res) => {
          console.log(res.data);
          setList(res.data);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchDivvydosePRs();

    return () => {
      //clean up request
      controller.abort();
    };
  }, []);

  return { loading, setLoading, list, setList };
};

export default useFetchPullRequests;
