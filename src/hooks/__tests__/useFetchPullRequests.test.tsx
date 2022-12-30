import React from "react";
import { renderHook } from "@testing-library/react";
import useFetchPullRequests from "../useFetchPullRequests";
import { mockData } from "../../../mockData";
const axios = require("axios");

jest.mock("axios");

describe("useFetchPullRequests hook tests", () => {
  describe("WHEN useFetchPullRequests is called", () => {
    jest.useFakeTimers();
    it("THEN should return isLoading as true", async () => {
      axios.get.mockResolvedValue({
        data: mockData,
      });

      const { result, unmount } = renderHook(() => useFetchPullRequests());

      jest.advanceTimersByTime(3000);

      console.log(result.current.isLoading, result.current.labels);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(result.current.isLoading).toBe(true);

      unmount();
    });
  });
});
