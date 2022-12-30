import { useEffect, useState } from "react";
import axios from "axios";
import { DIVVY_DOSE_PRS_URL } from "./constants";

export interface Labels {
  name: string;
  color: string;
}
export interface List {
  title: string;
  html_url: string;
  labels: Labels[];
  created_at: string;
}

const useFetchPullRequests = () => {
  const [isLoading, setLoading] = useState(true);
  const [list, setList] = useState<List[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchDivvydosePRs = () => {
      axios
        .get(DIVVY_DOSE_PRS_URL, { signal: controller.signal })
        .then((res) => {
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

  useEffect(() => {
    let labelsList = list
      .map((pullRequest) => {
        return pullRequest.labels.map((label) => {
          return label.name;
        });
      })
      .flat();

    let uniqueList = labelsList.filter((c, index) => {
      return labelsList.indexOf(c) === index;
    });
    setLabels(uniqueList);
  }, [list]);

  return { isLoading, setLoading, list, setList, labels };
};

export default useFetchPullRequests;
