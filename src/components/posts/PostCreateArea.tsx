/** Libraries */
import { Link, useNavigate } from "react-router-dom";

import { Grid, TextField, Typography, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";

import { styled } from "@mui/material/styles";

import { useFormik } from "formik";

/** Utils */
import { YupLoginValidations } from "../../utils";

/** Material UI - Custom components */
const PostAreaContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "20vh",
  //   margin: "5px",
  paddingTop: "2.5vh",
  //   borderRadius: "15px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#fff",
}));

const AvatarContainer = styled("div")(({ theme }) => ({
  width: "10%",
  height: "100%",
  marginTop: "7.5px",
  marginLeft: "5px",
}));

const FormContainer = styled("form")(({ theme }) => ({
  width: "90%",
  height: "100%",
  margin: "15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const ItemsContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "5vh",
  marginTop: "15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  fontSize: "14px",
  borderRadius: "20px",
}));

const ImageIconButton = styled(IconButton)(({ theme }) => ({
  ".MuiSvgIcon-root": {
    fontSize: "20px",
  },
}));

export const PostCreateArea = (): JSX.Element => {
  const formik = useFormik({
    initialValues: {
      title: "",
    },

    validationSchema: YupLoginValidations,
    onSubmit: async ({ title }, { resetForm }) => {
      console.log(title);
      resetForm();
    },
  });

  return (
    <PostAreaContainer>
      <AvatarContainer>
        <Stack direction="row">
          <Avatar
            alt="Lucas Ojeda"
            src="https://res.cloudinary.com/the-kings-company/image/upload/v1671396595/user-ecommerce/Avatar-Profile-PNG-Free-Image_yeonm0.png"
          />
        </Stack>
      </AvatarContainer>
      <FormContainer onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          variant="standard"
          size="small"
          id="title"
          // label="Title"
          placeholder="What are you thinking about?"
          name="title"
          autoComplete="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />

        <ItemsContainer>
          <ImageIconButton>
            <PhotoCameraIcon />
          </ImageIconButton>
          <SubmitButton variant="contained" type="submit">
            Create
          </SubmitButton>
        </ItemsContainer>
      </FormContainer>
    </PostAreaContainer>
  );
};
