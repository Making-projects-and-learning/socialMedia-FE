/** Libraries */
import { useRef, useState } from "react";

import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import { styled } from "@mui/material/styles";

import { useFormik } from "formik";

/** Utils */
import { uploadImageToCloudinary, YupPostValidations } from "../../utils";

/** Custom hooks */
import { usePostStore } from "../../hooks";

/** Material UI - Custom components */
const PostAreaContainer = styled("div")(({ theme }) => ({
  width: "100%",
  minHeight: "25vh",
  height: "auto",
  paddingTop: "1.5vh",
  borderBottom: "1px solid #E9E9E9",
  display: "flex",
  flexDirection: "row",
  backgroundColor: "#fff",
}));

const AvatarContainer = styled("div")(({ theme }) => ({
  width: "10%",
  minHeight: "25vh",
  height: "max-content",
  paddingLeft: "1.5vw",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "start",
  "& .MuiAvatar-root": {
    height: "50px",
    width: "50px",
  },
}));

const FormContainer = styled("form")(({ theme }) => ({
  width: "90%",
  minHeight: "20vh",
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
  marginTop: "5px",
  paddingTop: "20px",
  marginBottom: "10px",
  borderTop: "1px solid #E9E9E9",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const CustomTextArea = styled(TextareaAutosize)(({ theme }) => ({
  height: "auto",
  width: "100%",
  overflowY: "scroll",
  padding: "10px",
  marginBottom: "10px",
  border: "none",
  fontFamily: "Arial",
  fontSize: "18px",
  resize: "none",

  ":focus-visible": {
    outline: "none",
  },
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

const InputFile = styled("input")(({ theme }) => ({
  position: "absolute",
  visibility: "hidden",
}));

const ImageContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "95%",
  minHeight: "25ch",
  minWidth: "25ch",
  display: "flex",
  alignItems: "start",
  justifyContent: "flex-start",
  mb: 1,
  overflow: "hidden",
  border: "none",
}));

const Image = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "20% 10%",
  borderRadius: "15px",
  border: "1px solid #E9E9E9",
}));

const CloseIconContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  width: "10%",
  height: "10vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  padding: "6px",
  ".MuiSvgIcon-root": {
    color: "#fff",
    fontSize: "20px",
  },
  ":hover": {
    backgroundColor: "rgba(0, 0, 0, 0.40)",
  },
}));

export const PostCreateArea = (): JSX.Element => {
  const { SocketNewPost, posts } = usePostStore();

  const [file, setFile] = useState<string | null>(null);

  const imageRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      description: "",
    },

    validationSchema: YupPostValidations,
    onSubmit: async ({ description }, { resetForm }) => {
      if (file) {
        const image = await uploadImageToCloudinary(file);
        SocketNewPost(description, image);
      } else {
        SocketNewPost(description);
      }
      setFile(null);
      resetForm();
    },
  });

  const handelChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);

      reader.onload = () => {
        const base64 = reader.result as string;

        return base64 ? setFile(base64) : setFile(null);
      };
    } else {
      setFile(null);
    }
  };

  return (
    <PostAreaContainer>
      <AvatarContainer>
        <Stack>
          <Avatar
            alt="Lucas Ojeda"
            src="https://res.cloudinary.com/the-kings-company/image/upload/v1671396595/user-ecommerce/Avatar-Profile-PNG-Free-Image_yeonm0.png"
          />
        </Stack>
      </AvatarContainer>
      <FormContainer onSubmit={formik.handleSubmit}>
        <CustomTextArea
          autoFocus
          placeholder="What are you thinking about?"
          name="description"
          autoComplete="description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />

        <InputFile
          type="file"
          placeholder="Image"
          ref={imageRef}
          name="img"
          value={""}
          onChange={handelChangeImage}
        />

        {file && (
          <ImageContainer>
            <CloseIconContainer>
              <CloseButton onClick={() => setFile(null)}>
                <CloseIcon />
              </CloseButton>
            </CloseIconContainer>
            <Image src={file} alt="Image" />
          </ImageContainer>
        )}

        <ItemsContainer>
          <ImageIconButton
            onClick={() => imageRef.current!.click()}
            disabled={!!file}
          >
            <ImageIcon color={!file ? "primary" : "disabled"} />
          </ImageIconButton>
          <SubmitButton variant="contained" type="submit">
            Post
          </SubmitButton>
        </ItemsContainer>
      </FormContainer>
    </PostAreaContainer>
  );
};
