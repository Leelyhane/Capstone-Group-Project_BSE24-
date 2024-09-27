import React from "react";
import { render } from "@testing-library/react";
import ChatsPage from "../chatsPage";

describe("ChatsPage component", () => {
    it("renders without crashing", () => {
        const props = {
            user: {
                username: "test_username",
                secret: "test_secret"
            }
        };
        const { container } = render(<ChatsPage {...props} />);
        expect(container).toBeInTheDocument();
    });
});
