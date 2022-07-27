import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import App from "./App";

//Primary Guest
test("guestFirstName valid input", async () => {
    render(<App />);
    const guestFirstName = screen.getByLabelText("guestFirstName");
    await userEvent.type(guestFirstName, "a");
    guestFirstName.blur();
    expect(guestFirstName).toHaveValue("a");
    expect(
        screen.queryByLabelText("guestFirstNameError")
    ).not.toBeInTheDocument();
});

test("guestFirstName empty input", async () => {
    render(<App />);
    const guestFirstName = screen.getByLabelText("guestFirstName");
    await userEvent.click(guestFirstName)
    guestFirstName.blur();
    const guestFirstNameError = await screen.findByLabelText(
        "guestFirstNameError"
    );
    expect(guestFirstName).toHaveValue("");
    expect(guestFirstNameError).toBeInTheDocument();
});

test("guestLastName valid input", async () => {
    render(<App />);
    const guestLastName = screen.getByLabelText("guestLastName");
    await userEvent.type(guestLastName, "a");
    guestLastName.blur();
    expect(guestLastName).toHaveValue("a");
    expect(
        screen.queryByLabelText("guestLastNameError")
    ).not.toBeInTheDocument();
});

test("guestLastName empty input", async () => {
    render(<App />);
    const guestLastName = screen.getByLabelText("guestLastName");
    await userEvent.click(guestLastName);
    guestLastName.blur();
    const guestLastNameError = await screen.findByLabelText(
        "guestLastNameError"
    );
    expect(guestLastName).toHaveValue("");
    expect(guestLastNameError).toBeInTheDocument();
});

test("guestHpNum valid input", async () => {
    render(<App />);
    const guestHpNum = screen.getByLabelText("guestHpNum");
    await userEvent.type(guestHpNum, "a");
    guestHpNum.blur();
    expect(guestHpNum).toHaveValue("a");
    expect(screen.queryByLabelText("guestHpNumError")).not.toBeInTheDocument();
});

test("guestHpNum empty input", async () => {
    render(<App />);
    const guestHpNum = screen.getByLabelText("guestHpNum");
    await userEvent.click(guestHpNum, "");
    guestHpNum.blur();
    const guestHpNumError = await screen.findByLabelText("guestHpNumError");
    expect(guestHpNum).toHaveValue("");
    expect(guestHpNumError).toBeInTheDocument();
});

// Your Details (Customer)
test("customerFirstName valid input", async () => {
    render(<App />);
    const customerFirstName = screen.getByLabelText("customerFirstName");
    await userEvent.type(customerFirstName, "a");
    customerFirstName.blur();
    expect(customerFirstName).toHaveValue("a");
    expect(
        screen.queryByLabelText("customerFirstNameError")
    ).not.toBeInTheDocument();
});

test("customerFirstName empty input", async () => {
    render(<App />);
    const customerFirstName = screen.getByLabelText("customerFirstName");
    await userEvent.click(customerFirstName);
    customerFirstName.blur();
    const customerFirstNameError = await screen.findByLabelText(
        "customerFirstNameError"
    );
    expect(customerFirstName).toHaveValue("");
    expect(customerFirstNameError).toBeInTheDocument();
});

test("customerEmail valid input", async () => {
    render(<App />);
    const customerEmail = screen.getByLabelText("customerEmail");
    await userEvent.type(customerEmail, "a");
    customerEmail.blur();
    expect(customerEmail).toHaveValue("a");
    expect(
        screen.queryByLabelText("customerEmailError")
    ).not.toBeInTheDocument();
});

test("customerEmail empty input", async () => {
    render(<App />);
    const customerEmail = screen.getByLabelText("customerEmail");
    await userEvent.click(customerEmail);
    customerEmail.blur();
    const customerEmailError = await screen.findByLabelText(
        "customerEmailError"
    );
    expect(customerEmail).toHaveValue("");
    expect(customerEmailError).toBeInTheDocument();
});

// Payment Information
test("cardName valid input", async () => {
    render(<App />);
    const cardName = screen.getByLabelText("cardName");
    await userEvent.type(cardName, "a");
    cardName.blur();
    expect(cardName).toHaveValue("a");
    expect(screen.queryByLabelText("cardNameError")).not.toBeInTheDocument();
});

test("cardName empty input", async () => {
    render(<App />);
    const cardName = screen.getByLabelText("cardName");
    await userEvent.click(cardName);
    cardName.blur();
    const cardNameError = await screen.findByLabelText("cardNameError");
    expect(cardName).toHaveValue("");
    expect(cardNameError).toBeInTheDocument();
});

test("cardNumber valid input", async () => {
    render(<App />);
    const cardNumber = screen.getByLabelText("cardNumber");
    await userEvent.type(cardNumber, "a");
    cardNumber.blur();
    expect(cardNumber).toHaveValue("a");
    expect(screen.queryByLabelText("cardNumberError")).not.toBeInTheDocument();
});

test("cardNumber empty input", async () => {
    render(<App />);
    const cardNumber = screen.getByLabelText("cardNumber");
    await userEvent.click(cardNumber);
    cardNumber.blur();
    const cardNumberError = await screen.findByLabelText("cardNumberError");
    expect(cardNumber).toHaveValue("");
    expect(cardNumberError).toBeInTheDocument();
});

// TODO: Card Expiry

test("cardCVC valid input", async () => {
    render(<App />);
    const cardCVC = screen.getByLabelText("cardCVC");
    await userEvent.type(cardCVC, "a");
    cardCVC.blur();
    expect(cardCVC).toHaveValue("a");
    expect(screen.queryByLabelText("cardCVCError")).not.toBeInTheDocument();
});

test("cardCVC empty input", async () => {
    render(<App />);
    const cardCVC = screen.getByLabelText("cardCVC");
    await userEvent.click(cardCVC);
    cardCVC.blur();
    const cardCVCError = await screen.findByLabelText("cardCVCError");
    expect(cardCVC).toHaveValue("");
    expect(cardCVCError).toBeInTheDocument();
});

// Billing Address details
test("billingAddress valid input", async () => {
    render(<App />);
    const billingAddress = screen.getByLabelText("billingAddress");
    await userEvent.type(billingAddress, "a");
    billingAddress.blur();
    expect(billingAddress).toHaveValue("a");
    expect(
        screen.queryByLabelText("billingAddressError")
    ).not.toBeInTheDocument();
});

test("billingAddress empty input", async () => {
    render(<App />);
    const billingAddress = screen.getByLabelText("billingAddress");
    await userEvent.click(billingAddress);
    billingAddress.blur();
    const billingAddressError = await screen.findByLabelText(
        "billingAddressError"
    );
    expect(billingAddress).toHaveValue("");
    expect(billingAddressError).toBeInTheDocument();
});

test("billingCity valid input", async () => {
    render(<App />);
    const billingCity = screen.getByLabelText("billingCity");
    await userEvent.type(billingCity, "a");
    billingCity.blur();
    expect(billingCity).toHaveValue("a");
    expect(screen.queryByLabelText("billingCityError")).not.toBeInTheDocument();
});

test("billingCity empty input", async () => {
    render(<App />);
    const billingCity = screen.getByLabelText("billingCity");
    await userEvent.click(billingCity);
    billingCity.blur();
    const billingCityError = await screen.findByLabelText("billingCityError");
    expect(billingCity).toHaveValue("");
    expect(billingCityError).toBeInTheDocument();
});

test("billingPostalCode valid input", async () => {
    render(<App />);
    const billingPostalCode = screen.getByLabelText("billingPostalCode");
    await userEvent.type(billingPostalCode, "a");
    billingPostalCode.blur();
    expect(billingPostalCode).toHaveValue("a");
    expect(
        screen.queryByLabelText("billingPostalCodeError")
    ).not.toBeInTheDocument();
});

test("billingPostalCode empty input", async () => {
    render(<App />);
    const billingPostalCode = screen.getByLabelText("billingPostalCode");
    await userEvent.click(billingPostalCode);
    billingPostalCode.blur();
    const billingPostalCodeError = await screen.findByLabelText(
        "billingPostalCodeError"
    );
    expect(billingPostalCode).toHaveValue("");
    expect(billingPostalCodeError).toBeInTheDocument();
});

// TODO: Billing Country
