import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
} from "react-bootstrap";
import countryList from "react-select-country-list";
import { ErrorMessage, Formik, Field } from "formik";
import * as yup from "yup";
import "react-phone-number-input/style.css";
import PhoneNumberInput from "./phone-number-input";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import images from "react-payment-inputs/images";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";

// Firestore imports
import { db } from "./firestore-config";
import { collection, doc, setDoc } from "firebase/firestore/lite";

// Function for adding data to Firebase asynchronously
async function addReceipt(info, bookingsCollection) {
    const bookingDoc = doc(bookingsCollection);
    info.bookingRef = bookingDoc.id;
    await setDoc(bookingDoc, info);
}

let thisYear = new Date().getFullYear();
let yearList = [];
for (let i = 0; i < 21; i++) {
    yearList.push(thisYear + i);
}
let countryOptions = countryList().getLabels();

var valid = require("card-validator");

const schema = yup.object().shape({
    guestFirstName: yup.string().required("Please enter a first name"),
    guestLastName: yup.string().required("Please enter a last name"),
    guestHpNum: yup
        .string()
        .required("Please enter your handphone number")
        .test("hpNumValidation", "Please enter valid Phone Number", (value) => {
            if (value !== undefined) {
                return isPossiblePhoneNumber(value);
            }
        }),
    guestSpecialReq: yup.string(),
    customerFirstName: yup.string().required("Please enter a first name"),
    customerEmail: yup
        .string()
        .email("Please enter a valid email")
        // TODO: Have to fix " "@dsomething.com
        .required("Please enter an email"),
    cardName: yup.string().required("Please enter a first name"),
    cardNumber: yup
        .number()
        .required("Please enter a valid card number")
        .test("validity", "Invalid Card Number", (value) => {
            if (value !== undefined) {
                let data = valid.number(value);
                var response = false;
                if (data.card !== null) {
                    data.card.lengths.forEach((x) => {
                        if (value.length === x) {
                            response = data.isValid;
                            if (response) {
                                return response;
                            }
                        } else {
                            response = data.isValid;
                        }
                    });
                }
                return response;
            }
        }),
    cardMonth: yup.string().required("Please choose a month"),
    cardYear: yup.string().required("Please choose a year"),
    cardCVC: yup
        .number()
        .required("Please enter a valid card CVC number")
        .test("validity", "Invalid CVC Number", (value, context) => {
            return valid.cvv(
                value === undefined ? "" : value.toString(),
                valid.number(context.parent.cardNumber).card
                    ? valid.number(context.parent.cardNumber).card.code.size
                    : 4
            ).isValid;
        }),
    billingAddress: yup.string().required("Please enter a billing address"),
    billingCity: yup.string().required("Please enter a city"),
    billingPostalCode: yup
        .number()
        .min(3, "Please enter a valid postal code")
        .typeError("Please enter a valid postal code")
        .integer("Please enter a valid postal code")
        .positive("Please enter a valid postal code")
        .required("Please enter a valid postal code"),
    billingCountry: yup.string().required("Please choose a country"),
});

export default function App() {
    //firestore
    const bookingsCollection = collection(db, "Bookings");

    async function onNumberChange(e, props) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            await props.handleChange(e);
        }
    }

        const {
            meta,
            getCardImageProps,
            getCardNumberProps,
            getExpiryDateProps,
            getCVCProps,
            wrapperProps,
        } = usePaymentInputs();

    return (
        <Container>
            <Row>
                {/* Booking Summary */}
                <Col sm={true} md={{ order: "last" }} className="p-4">
                    <Row className="form-container mb-3">Booking Summary</Row>
                </Col>

                {/* Form */}
                <Col md={{ span: 8 }} className="p-4">
                    <Formik
                        validationSchema={schema}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }, 400);
                        }}
                        // onSubmit={(values, { setSubmitting }) => {
                        //     const guest = {
                        //         firstName: values.guestFirstName,
                        //         lastName: values.guestLastName,
                        //         hpNumber: values.guestHpNum,
                        //     };
                        //     const payee = {
                        //         firstName: values.customerFirstName,
                        //         email: values.customerEmail,
                        //         card: {
                        //             name: values.cardName,
                        //             number: values.cardNumber,
                        //             month: values.cardMonth,
                        //             year: values.cardYear,
                        //             cvc: values.cardCVC,
                        //         },
                        //         billing: {
                        //             address: values.billingAddress,
                        //             city: values.billingCity,
                        //             postal: values.billingPostalCode,
                        //             country: values.billingCountry,
                        //         },
                        //     };
                        //     const info = {
                        //         destinationID: "tbd",
                        //         hotelID: "tbd",
                        //         bookingDisplayInfo: {
                        //             nights: "tbd",
                        //             start: "tbd",
                        //             end: "tbd",
                        //             adults: "tbd",
                        //             children: "tbd",
                        //             message: values.guestSpecialReq,
                        //             roomType: "tbd",
                        //         },
                        //         price: "tbd",
                        //         supplierBookingID: "tbd",
                        //         supplierResponse: {
                        //             cost: "tbd",
                        //             bookingRef: "tbd",
                        //             termsCond: "tbd",
                        //             hotelTermsCond: "tbd",
                        //         },
                        //         bookingRef: "tbd",
                        //         guestInfo: guest,
                        //         payeeInfo: payee,
                        //     };
                        //     try {
                        //         addReceipt(info, bookingsCollection);
                        //         alert("Booking Completed");
                        //     } catch (e) {
                        //         console.log(e);
                        //         alert(e);
                        //     }
                        // }}
                        initialValues={{
                            guestFirstName: "",
                            guestLastName: "",
                            guestHpNum: "",
                            guestSpecialReq: "",
                            customerFirstName: "",
                            customerEmail: "",
                            cardName: "",
                            cardNumber: "",
                            cardMonth: "",
                            cardYear: "",
                            cardCVC: "",
                            billingAddress: "",
                            billingCity: "",
                            billingPostalCode: "",
                            billingCountry: "",
                        }}
                    >
                        {(formik) => (
                            <Form onSubmit={formik.handleSubmit}>
                                {/* Primary Guest*/}
                                <Row className="form-container mb-3">
                                    <Form.Label>Primary Guest</Form.Label>

                                    <Row className="mb-3">
                                        <Form.Group
                                            as={Col}
                                            sm={true}
                                            className="mb-3"
                                            controlId="firstName"
                                        >
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                aria-label="guestFirstName"
                                                placeholder="First Name"
                                                {...formik.getFieldProps(
                                                    "guestFirstName"
                                                )}
                                                isInvalid={
                                                    formik.touched
                                                        .guestFirstName &&
                                                    !!formik.errors
                                                        .guestFirstName
                                                }
                                            />

                                            <ErrorMessage
                                                name="guestFirstName"
                                                render={(errorMessage) => (
                                                    <Form.Control.Feedback
                                                        type="invalid"
                                                        aria-label="guestFirstNameError"
                                                    >
                                                        {errorMessage}
                                                    </Form.Control.Feedback>
                                                )}
                                            />
                                        </Form.Group>

                                        <Form.Group
                                            as={Col}
                                            sm={true}
                                            className="mb-3"
                                            controlId="lastName"
                                        >
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                aria-label="guestLastName"
                                                placeholder="Last Name"
                                                {...formik.getFieldProps(
                                                    "guestLastName"
                                                )}
                                                isInvalid={
                                                    formik.touched
                                                        .guestLastName &&
                                                    !!formik.errors
                                                        .guestLastName
                                                }
                                            />
                                            <ErrorMessage
                                                name="guestLastName"
                                                render={(errorMessage) => (
                                                    <Form.Control.Feedback
                                                        type="invalid"
                                                        aria-label="guestLastNameError"
                                                    >
                                                        {errorMessage}
                                                    </Form.Control.Feedback>
                                                )}
                                            />
                                        </Form.Group>

                                        <Form.Group
                                            as={Col}
                                            sm={true}
                                            className="mb-3"
                                            controlId="hpNum"
                                        >
                                            <Form.Label>
                                                Phone Number
                                            </Form.Label>
                                            <Form.Control
                                                as={PhoneNumberInput}
                                                name="guestHpNum"
                                                formik={formik}
                                                isInvalid={
                                                    formik.touched.test &&
                                                    !!formik.errors.test
                                                }
                                            />
                                            <ErrorMessage
                                                name="guestHpNum"
                                                render={(errorMessage) => (
                                                    <div
                                                        type="invalid"
                                                        aria-label="guestHpNumError"
                                                        class="text-danger"
                                                    >
                                                        <small>
                                                            {errorMessage}
                                                        </small>
                                                    </div>
                                                )}
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Label>Special Request</Form.Label>
                                        <Form.Group>
                                            <Form.Control
                                                as="textarea"
                                                style={{ resize: "none" }}
                                                type="text"
                                                placeholder="Write your special requests here"
                                                maxLength="250"
                                                rows="3"
                                                {...formik.getFieldProps(
                                                    "guestSpecialReq"
                                                )}
                                            />
                                        </Form.Group>
                                    </Row>
                                </Row>
                                {/* Your Details */}
                                <Row className="form-container mb-3">
                                    <Form.Label>Your Details</Form.Label>
                                    <Row className="mb-3">
                                        <Form.Group
                                            as={Col}
                                            sm={true}
                                            className="mb-3"
                                            controlId="customerName"
                                        >
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                aria-label="customerFirstName"
                                                placeholder="First Name"
                                                {...formik.getFieldProps(
                                                    "customerFirstName"
                                                )}
                                                isInvalid={
                                                    formik.touched
                                                        .customerFirstName &&
                                                    !!formik.errors
                                                        .customerFirstName
                                                }
                                            />
                                            <ErrorMessage
                                                name="customerFirstName"
                                                render={(errorMessage) => (
                                                    <Form.Control.Feedback
                                                        type="invalid"
                                                        aria-label="customerFirstNameError"
                                                    >
                                                        {errorMessage}
                                                    </Form.Control.Feedback>
                                                )}
                                            />
                                        </Form.Group>

                                        <Form.Group
                                            as={Col}
                                            sm={true}
                                            className="mb-3"
                                            controlId="customerEmail"
                                        >
                                            <Form.Label>
                                                Email Address
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                aria-label="customerEmail"
                                                placeholder="Email"
                                                {...formik.getFieldProps(
                                                    "customerEmail"
                                                )}
                                                isInvalid={
                                                    formik.touched
                                                        .customerEmail &&
                                                    !!formik.errors
                                                        .customerEmail
                                                }
                                            />
                                            <ErrorMessage
                                                name="customerEmail"
                                                render={(errorMessage) => (
                                                    <Form.Control.Feedback
                                                        type="invalid"
                                                        aria-label="customerEmailError"
                                                    >
                                                        {errorMessage}
                                                    </Form.Control.Feedback>
                                                )}
                                            />
                                        </Form.Group>
                                    </Row>
                                </Row>
                                {/* Payment Information*/}
                                <Row className="form-container mb-3">
                                    {/* Card Details */}
                                    <Form.Label>Payment Information</Form.Label>
                                    <Row className="mb-3">
                                        {/* Card Details 1st Row*/}
                                        <Form.Group
                                            as={Col}
                                            sm={true}
                                            className="mb-3"
                                            controlId="cardName"
                                        >
                                            <Form.Label>
                                                Name on Card
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                aria-label="cardName"
                                                {...formik.getFieldProps(
                                                    "cardName"
                                                )}
                                                isInvalid={
                                                    formik.touched.cardName &&
                                                    !!formik.errors.cardName
                                                }
                                            />
                                            <ErrorMessage
                                                name="cardName"
                                                render={(errorMessage) => (
                                                    <Form.Control.Feedback
                                                        type="invalid"
                                                        aria-label="cardNameError"
                                                    >
                                                        {errorMessage}
                                                    </Form.Control.Feedback>
                                                )}
                                            />
                                        </Form.Group>

                                        <Form.Group
                                            as={Col}
                                            sm={true}
                                            className="mb-3"
                                            controlId="cardNumber"
                                        >
                                            <Row>
                                                <Form.Label>
                                                    Card Number
                                                </Form.Label>
                                            </Row>
                                            <Row>
                                                {/* <Form.Label column sm="2">
                                                    <Image src={logo} thumbnail="true" sm="auto"/>
                                                </Form.Label>
                                                <Col sm="10">
                                                    <Form.Control
                                                        type="text"
                                                        aria-label="cardNumber"
                                                        // pattern="\d*"
                                                        maxLength={valid.number(formik.values.cardNumber).card? valid.number(formik.values.cardNumber).card.lengths.at(-1): 16}
                                                        {...formik.getFieldProps(
                                                            "cardNumber"
                                                        )}
                                                        onChange={(e) => {
                                                            onNumberChange(
                                                                e,
                                                                formik
                                                            );
                                                        }}
                                                        isInvalid={
                                                            formik.touched
                                                                .cardNumber &&
                                                            !!formik.errors
                                                                .cardNumber
                                                        }
                                                    />
                                                    <ErrorMessage
                                                        name="cardNumber"
                                                        render={(
                                                            errorMessage
                                                        ) => (
                                                            <Form.Control.Feedback
                                                                type="invalid"
                                                                aria-label="cardNumberError"
                                                            >
                                                                {errorMessage}
                                                            </Form.Control.Feedback>
                                                        )}
                                                    />
                                                </Col> */}
                                                <PaymentInputsWrapper
                                                    {...wrapperProps}
                                                    styles={{
                                                        input: {
                                                            base: {
                                                                color: "green",
                                                            },
                                                            errored: {
                                                                color: "maroon",
                                                            },
                                                            cardNumber: {
                                                                width: "100%",
                                                            },
                                                        },
                                                    }}
                                                    className="sm-auto"
                                                >
                                                    <svg
                                                        {...getCardImageProps({
                                                            images,
                                                        })}
                                                    />
                                                    <Field>
                                                        {({ field }) => (
                                                            <input
                                                                {...getCardNumberProps(
                                                                    {
                                                                        onBlur: field.onBlur,
                                                                        onChange:
                                                                            field.onChange,
                                                                    }
                                                                )}
                                                                value={
                                                                    formik
                                                                        .values
                                                                        .cardNumber
                                                                }
                                                                maxLength={
                                                                    valid.number(
                                                                        formik
                                                                            .values
                                                                            .cardNumber
                                                                    ).card
                                                                        ? valid
                                                                              .number(
                                                                                  formik
                                                                                      .values
                                                                                      .cardNumber
                                                                              )
                                                                              .card.lengths.at(
                                                                                  -1
                                                                              ) +
                                                                          valid.number(
                                                                              formik
                                                                                  .values
                                                                                  .cardNumber
                                                                          ).card
                                                                              .gaps
                                                                              .size
                                                                        : 16
                                                                }
                                                            />
                                                        )}
                                                    </Field>
                                                </PaymentInputsWrapper>
                                            </Row>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        {/* Card Details 2nd Row*/}
                                        <Form.Group
                                            as={Col}
                                            md={true}
                                            className="mb-3"
                                            controlId="cardExpiry"
                                        >
                                            <Row>
                                                <Form.Label>
                                                    Expiry Date
                                                </Form.Label>
                                            </Row>
                                            <Row>
                                                <Col sm={true}>
                                                    <Form.Select
                                                        className="mb-3"
                                                        aria-label="cardMonth"
                                                        {...formik.getFieldProps(
                                                            "cardMonth"
                                                        )}
                                                        isInvalid={
                                                            formik.touched
                                                                .cardMonth &&
                                                            formik.values
                                                                .cardMonth ===
                                                                ""
                                                        }
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            Month
                                                        </option>
                                                        <option value="jan">
                                                            January
                                                        </option>
                                                        <option value="feb">
                                                            February
                                                        </option>
                                                        <option value="mar">
                                                            March
                                                        </option>
                                                        <option value="apr">
                                                            April
                                                        </option>
                                                        <option value="may">
                                                            May
                                                        </option>
                                                        <option value="jun">
                                                            June
                                                        </option>
                                                        <option value="jul">
                                                            July
                                                        </option>
                                                        <option value="aug">
                                                            August
                                                        </option>
                                                        <option value="sep">
                                                            September
                                                        </option>
                                                        <option value="oct">
                                                            October
                                                        </option>
                                                        <option value="nov">
                                                            November
                                                        </option>
                                                        <option value="dec">
                                                            December
                                                        </option>
                                                    </Form.Select>
                                                    <ErrorMessage
                                                        name="cardMonth"
                                                        render={(
                                                            errorMessage
                                                        ) => (
                                                            <Form.Control.Feedback
                                                                type="invalid"
                                                                aria-label="cardMonthError"
                                                            >
                                                                {errorMessage}
                                                            </Form.Control.Feedback>
                                                        )}
                                                    />
                                                </Col>
                                                <Col sm={true}>
                                                    <Form.Select
                                                        className="mb-3"
                                                        aria-label="cardYear"
                                                        {...formik.getFieldProps(
                                                            "cardYear"
                                                        )}
                                                        isInvalid={
                                                            formik.touched
                                                                .cardYear &&
                                                            formik.values
                                                                .cardYear === ""
                                                        }
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            Year
                                                        </option>
                                                        {yearList.map(
                                                            (year, index) => {
                                                                return (
                                                                    <option
                                                                        value={
                                                                            year
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {year}
                                                                    </option>
                                                                );
                                                            }
                                                        )}
                                                    </Form.Select>
                                                    <ErrorMessage
                                                        name="cardYear"
                                                        render={(
                                                            errorMessage
                                                        ) => (
                                                            <Form.Control.Feedback
                                                                type="invalid"
                                                                aria-label="cardYearError"
                                                            >
                                                                {errorMessage}
                                                            </Form.Control.Feedback>
                                                        )}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        <Form.Group
                                            as={Col}
                                            md={true}
                                            className="mb-3"
                                            controlId="cardCVC"
                                        >
                                            <Form.Label>CVV/CVC</Form.Label>
                                            <Form.Control
                                                type="text"
                                                aria-label="cardCVC"
                                                // pattern="\d*"
                                                maxLength={
                                                    valid.number(
                                                        formik.values.cardNumber
                                                    ).card
                                                        ? valid.number(
                                                              formik.values
                                                                  .cardNumber
                                                          ).card.code.size
                                                        : 4
                                                }
                                                {...formik.getFieldProps(
                                                    "cardCVC"
                                                )}
                                                onChange={(e) =>
                                                    onNumberChange(e, formik)
                                                }
                                                isInvalid={
                                                    formik.touched.cardCVC &&
                                                    !!formik.errors.cardCVC
                                                }
                                            />
                                            <ErrorMessage
                                                name="cardCVC"
                                                render={(errorMessage) => (
                                                    <Form.Control.Feedback
                                                        type="invalid"
                                                        aria-label="cardCVCError"
                                                    >
                                                        {errorMessage}
                                                    </Form.Control.Feedback>
                                                )}
                                            />
                                        </Form.Group>
                                    </Row>

                                    {/*Billing Address*/}
                                    <Form.Label>Billing Address</Form.Label>
                                    {/* Billing Address 1st Row */}
                                    <Row>
                                        {/* Address */}
                                        <Form.Group
                                            as={Col}
                                            md={true}
                                            className="mb-3"
                                            controlId="billingAddress"
                                        >
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                aria-label="billingAddress"
                                                {...formik.getFieldProps(
                                                    "billingAddress"
                                                )}
                                                isInvalid={
                                                    formik.touched
                                                        .billingAddress &&
                                                    !!formik.errors
                                                        .billingAddress
                                                }
                                            ></Form.Control>
                                            <ErrorMessage
                                                name="billingAddress"
                                                render={(errorMessage) => (
                                                    <Form.Control.Feedback
                                                        type="invalid"
                                                        aria-label="billingAddressError"
                                                    >
                                                        {errorMessage}
                                                    </Form.Control.Feedback>
                                                )}
                                            />
                                        </Form.Group>
                                        {/* City */}
                                        <Form.Group
                                            as={Col}
                                            md={true}
                                            className="mb-3"
                                            controlId="billingCity"
                                        >
                                            <Form.Label>City</Form.Label>
                                            <Form.Control
                                                type="text"
                                                aria-label="billingCity"
                                                {...formik.getFieldProps(
                                                    "billingCity"
                                                )}
                                                isInvalid={
                                                    formik.touched
                                                        .billingCity &&
                                                    !!formik.errors.billingCity
                                                }
                                            ></Form.Control>
                                            <ErrorMessage
                                                name="billingCity"
                                                render={(errorMessage) => (
                                                    <Form.Control.Feedback
                                                        type="invalid"
                                                        aria-label="billingCityError"
                                                    >
                                                        {errorMessage}
                                                    </Form.Control.Feedback>
                                                )}
                                            />
                                        </Form.Group>
                                    </Row>

                                    {/* Billing Address 2nd Row */}
                                    <Row>
                                        {/* Postal Code */}
                                        <Form.Group
                                            as={Col}
                                            md={true}
                                            className="mb-3"
                                            controlId="billingPostalCode"
                                        >
                                            <Form.Label>Postal Code</Form.Label>
                                            <Form.Control
                                                type="text"
                                                aria-label="billingPostalCode"
                                                {...formik.getFieldProps(
                                                    "billingPostalCode"
                                                )}
                                                isInvalid={
                                                    formik.touched
                                                        .billingPostalCode &&
                                                    !!formik.errors
                                                        .billingPostalCode
                                                }
                                            ></Form.Control>
                                            <ErrorMessage
                                                name="billingPostalCode"
                                                render={(errorMessage) => (
                                                    <Form.Control.Feedback
                                                        type="invalid"
                                                        aria-label="billingPostalCodeError"
                                                    >
                                                        {errorMessage}
                                                    </Form.Control.Feedback>
                                                )}
                                            />
                                        </Form.Group>
                                        {/* Country */}
                                        <Form.Group
                                            as={Col}
                                            md={true}
                                            className="mb-3"
                                            controlId="billingCountry"
                                        >
                                            <Form.Label>Country</Form.Label>
                                            <Form.Select
                                                className="mb-3"
                                                aria-label="billingCountry"
                                                // value={countryValue}
                                                // onChange={billingCountryHandler}
                                                {...formik.getFieldProps(
                                                    "billingCountry"
                                                )}
                                                isInvalid={
                                                    formik.touched
                                                        .billingCountry &&
                                                    formik.values
                                                        .billingCountry === ""
                                                }
                                            >
                                                <option value="" disabled>
                                                    {""}
                                                </option>
                                                {countryOptions.map(
                                                    (country, index) => {
                                                        return (
                                                            <option
                                                                value={country}
                                                                key={index}
                                                            >
                                                                {country}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </Form.Select>
                                            <ErrorMessage
                                                name="billingCountry"
                                                render={(errorMessage) => (
                                                    <Form.Control.Feedback
                                                        type="invalid"
                                                        aria-label="billingCountry"
                                                    >
                                                        {errorMessage}
                                                    </Form.Control.Feedback>
                                                )}
                                            />
                                        </Form.Group>
                                    </Row>
                                </Row>
                                {/* Submit Button */}
                                <Row className="mb-5">
                                    <Col
                                        lg={{ span: 10, offset: 1 }}
                                        className="d-grid gap-2"
                                    >
                                        <Button
                                            variant="danger"
                                            type="submit"
                                            size="lg"
                                        >
                                            Confirm Booking
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container>
    );
}
