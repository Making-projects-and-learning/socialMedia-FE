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

export const YupPostValidations = Yup.object({
  description: Yup.string()
    .min(6, "Description should have at least 6 characters.")
    .max(264, "Description must have not more than 264 characters.")
    .required("Field required"),
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
