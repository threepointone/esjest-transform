import { afterEach, beforeEach, expect, it, jest } from "@jest/globals";
import * as React from "react";
import { render } from "react-dom";
import App from "../app";

jest.mock("../app", () => {
  return function () {
    return <div>boo world</div>;
  };
});

let element: HTMLElement;
beforeEach(() => {
  element = document.createElement("div");
  document.body.appendChild(element);
});
afterEach(() => {
  element.remove();
});

it("should render", () => {
  render(<App />, element);
  expect(element.innerHTML).toMatchInlineSnapshot(`"<div>hello world!</div>"`);
});
