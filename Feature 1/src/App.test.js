import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders the landing page", async () => {
  render(<App />);
  //test if the button is rendered
  expect(screen.getByRole("button", { name: "Search" }));
  // //test empty fields button
  // userEvent.click(screen.getByText('Search'));
  // expect(screen.queryByRole('alert', {name: ' Form has errors'}))
});
test("guest default values", async () => {
  render(<App />);
  const inputNode = screen.getByLabelText("Rooms");
  expect(inputNode).toHaveValue("1");
  const inputNodeA = screen.getByLabelText("Adults");
  expect(inputNodeA).toHaveValue("1");
  const inputNodeB = screen.getByLabelText("Children");
  expect(inputNodeB).toHaveValue("0");
});

test("guest edited values", async () => {
  //test if input boxes of guests can accept any other things except for integers
  render(<App />);
  const inputNode = screen.getByLabelText("Rooms");
  userEvent.type(inputNode, "{backspace}");
  userEvent.type(inputNode, "hello");
  expect(inputNode).toHaveValue("");
  const inputNodeA = screen.getByLabelText("Adults");
  userEvent.type(inputNodeA, "{backspace}");
  userEvent.type(inputNodeA, "testing");
  expect(inputNodeA).toHaveValue("");
  const inputNodeB = screen.getByLabelText("Children");
  userEvent.type(inputNodeB, "{backspace}");
  userEvent.type(inputNodeB, "@@**");
  expect(inputNodeB).toHaveValue("");
});
