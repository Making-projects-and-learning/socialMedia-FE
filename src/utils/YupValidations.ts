/** Libraries */
import * as Yup from "yup";

export const YupLoginValidations = Yup.object({
  username: Yup.string()
    .min(6, "El username debe tener al menos 6 caracteres")
    .required("El campo es requerido"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("El campo es requerido"),
});

// export const YupRegisterValidations = Yup.object({
//   name: Yup.string()
//     .max(15, 'Debe tener 15 caracteres o menos')
//     .required('El campo es requerido'),
//   email: Yup.string()
//     .email('Email inválido asegurate de colocar "@"')
//     .required('El campo es requerido'),
//   password: Yup.string()
//     .min(6, 'La contraseña debe tener al menos 6 caracteres')
//     .required('El campo es requerido'),
// });

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
