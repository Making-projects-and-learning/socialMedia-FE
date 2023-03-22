/** Libraries */
import * as Yup from "yup";

/** AUTH */
export const YupLoginValidations = Yup.object({
  username: Yup.string()
    .min(6, "Username should have at least 6 characters.")
    .required("Field required"),
  password: Yup.string()
    .min(8, "Password should have at least 6 characters.")
    .required("Field required"),
});

export const YupRegisterValidations = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(5, "Name should be at least 5 characters long"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address please make sure to correct it"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "password should be at least 8 characters long"),
  repeated_password: Yup.string()
    .required("this field is required")
    .oneOf(["password"], "Password should match"),
});

/** POSTS */
export const YupPostValidations = Yup.object({
  description: Yup.string()
    .min(6, "Description should have at least 6 characters.")
    .max(264, "Description must have not more than 264 characters.")
    .required("Field required"),
});

export const YupCommentValidations = Yup.object({
  content: Yup.string()
    .min(6, "Content should have at least 6 characters.")
    .max(264, "Content must have not more than 264 characters.")
    .required("Field required"),
});
