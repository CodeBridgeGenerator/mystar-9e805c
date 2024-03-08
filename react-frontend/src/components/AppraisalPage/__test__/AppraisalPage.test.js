import React from "react";
import { render, screen } from "@testing-library/react";

import AppraisalPage from "../AppraisalPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders appraisal page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AppraisalPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("appraisal-datatable")).toBeInTheDocument();
    expect(screen.getByRole("appraisal-add-button")).toBeInTheDocument();
});
