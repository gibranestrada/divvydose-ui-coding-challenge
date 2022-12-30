import { useEffect, useState } from "react";
import axios from "axios";
import { DIVVY_DOSE_PRS_URL } from "../constants";

export interface Labels {
  name: string;
  color: string;
}
export interface ListData {
  title: string;
  html_url: string;
  labels: Labels[];
  created_at: string;
}

const useFetchPullRequests = () => {
  const [isLoading, setLoading] = useState(true);
  const [list, setList] = useState<ListData[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    //This function is making the fetch request to the github api and retrieving all of divvydose ui-coding-challenge PRs
    //Added a cleanup function to cancel the request to avoid memory leaks
    const fetchDivvydosePRs = async () => {
      await axios
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
  }, [list.length]);

  //Here is the logic for retreiving all the labels from the list returned
  //This will help filter by labels
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

  return { isLoading, list, labels };
};

export default useFetchPullRequests;
