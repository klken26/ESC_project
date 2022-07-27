import PhoneInput from "react-phone-number-input";
import { useField } from "formik";
import "react-phone-number-input/style.css";
// https://codesandbox.io/s/formik-react-phone-number-input-p5jvs?file=/src/FormikPhoneInput.js
const PhoneNumberInput = ({ onChange, formik, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <PhoneInput
            international
            {...field}
            onChange={(e) => {
                formik.setFieldValue(field.name, e);
                if (e == null) {
                    formik.setFieldValue(field.name, "");
                }
            }}
        />
    );
};

export default PhoneNumberInput;
