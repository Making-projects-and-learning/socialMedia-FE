/** Libraries */
import { useEffect, useRef, useState } from "react";

import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import Tooltip from "@mui/material/Tooltip";

import { useFormik } from "formik";

/** Utils */
import { uploadImageToCloudinary, YupPostValidations } from "../../../utils";

/** Custom hooks */
import { useAuthStore, usePostStore } from "../../../hooks";

/** Material UI - Custom components */
import {
  PostAreaContainer,
  AvatarContainer,
  FormContainer,
  ItemsContainer,
  CustomTextField,
  ButtonAndCounterContainer,
  SubmitButton,
  ImageIconButton,
  InputFile,
  ImageContainer,
  Image,
  CloseIconContainer,
  CloseButton,
} from "./styled";

/** Types allowed to be charged on a post */
const imageTypesAllowed = [
  "image/jpg",
  "image/jpeg",
  "image/avif",
  "image/png",
  "image/webp",
];

export const PostCreateArea = (): JSX.Element => {
  const { picture } = useAuthStore();
  const { SocketNewPost } = usePostStore();

  const [file, setFile] = useState<string | null>(null);
  const [isPostFocused, setIsPostFocused] = useState<boolean>(false);
  const [submitChecking, setSubmitChecking] = useState<boolean>(false);

  const imageRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      description: "",
    },

    validationSchema: YupPostValidations,
    onSubmit: async ({ description }, { resetForm }) => {
      setSubmitChecking(true);
      if (file) {
        const image = await uploadImageToCloudinary(file);
        SocketNewPost(description, image);
      } else {
        SocketNewPost(description);
      }
      setFile(null);
      resetForm();
      setSubmitChecking(false);
    },
  });

  const handelChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);

      reader.onload = () => {
        const base64 = reader.result as string;
        const type = base64.split(";")[0].split(":")[1];
        if (imageTypesAllowed.includes(type))
          return base64 ? setFile(base64) : setFile(null);
      };
    } else {
      setFile(null);
    }
  };

  const renderAvatar = () => (
    <AvatarContainer>
      <Stack>
        <Avatar alt="Avatar" src={picture} />
      </Stack>
    </AvatarContainer>
  );

  const renderForm = () => (
    <FormContainer onSubmit={formik.handleSubmit}>
      <CustomTextField
        multiline
        variant="outlined"
        name="description"
        autoComplete="description"
        placeholder="What are you thinking about?"
        value={formik.values.description}
        onChange={formik.handleChange}
        onFocus={() => setIsPostFocused(true)}
        onBlur={() => setIsPostFocused(false)}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
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
        <Tooltip title="Load image" arrow>
          <ImageIconButton
            onClick={() => imageRef.current!.click()}
            disabled={!!file}
          >
            <ImageIcon color={!file ? "primary" : "disabled"} />
          </ImageIconButton>
        </Tooltip>
        <ButtonAndCounterContainer>
          <Typography
            sx={{
              visibility:
                isPostFocused || formik.values.description.length !== 0
                  ? "visible"
                  : "hidden",
              fontSize: "14px",
              color:
                formik.values.description.length > 264 ||
                formik.values.description.length < 6
                  ? "red"
                  : "green",
            }}
          >
            {formik.values.description.length} / 264
          </Typography>
          <SubmitButton
            disabled={submitChecking}
            variant="contained"
            type="submit"
          >
            Post
          </SubmitButton>
        </ButtonAndCounterContainer>
      </ItemsContainer>
    </FormContainer>
  );

  return (
    <PostAreaContainer>
      {renderAvatar()}
      {renderForm()}
    </PostAreaContainer>
  );
};
