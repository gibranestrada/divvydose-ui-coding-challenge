import React from "react";
import { render, screen } from "@testing-library/react";
import PullRequestList from "../PullRequestList";
import "@testing-library/jest-dom";
import { mockData } from "../../../mockData";

describe("PullRequestList component tests", () => {
  describe("WHEN PullRequestList is rendered", () => {
    it("THEN should have two bug text elements", async () => {
      render(
        <PullRequestList
          list={mockData}
          labels={["enhancement, bug, animals"]}
        />
      );
      const bug = screen.getAllByText(/bug/i);
      expect(bug).toHaveLength(2);
    });
  });
});
