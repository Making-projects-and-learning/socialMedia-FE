/** Libraries */
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { Typography } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import Tooltip from "@mui/material/Tooltip";

import { useFormik } from "formik";

/** Utils */
import { uploadImageToCloudinary, YupCommentValidations } from "../../../utils";

/** Material UI - Custom components */
import {
  CommentAreaContainer,
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

/** Custom hooks */
import { useAuthStore, usePostStore, useUiStore } from "../../../hooks";

/** Sockets */
import { socketEvents } from "../../../sockets";

/** Interfaces */
import { Post } from "../../../interfaces/post.interface";

interface Props {
  inputCommentArea: any;
}

/** Types allowed to be charged on a post */
const imageTypesAllowed = [
  "image/jpg",
  "image/jpeg",
  "image/avif",
  "image/png",
  "image/webp",
];

export const CommentCreateArea: React.FC<Props> = ({ inputCommentArea }) => {
  const { id } = useParams();

  const { picture } = useAuthStore();
  const { SocketCreateComment } = usePostStore();

  /** Code totally related to this component since this point */
  const [file, setFile] = useState<string | null>(null);
  const [isPostFocused, setIsPostFocused] = useState<boolean>(false);
  const [submitChecking, setSubmitChecking] = useState<boolean>(false);

  const imageRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      content: "",
    },

    validationSchema: YupCommentValidations,
    onSubmit: async ({ content }, { resetForm }) => {
      setSubmitChecking(true);
      if (file) {
        const image = await uploadImageToCloudinary(file);
        if (id) SocketCreateComment(id, { content, imageUrl: image });
      } else {
        if (id) SocketCreateComment(id, { content });
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
        <Avatar alt="Lucas Ojeda" src={picture} />
      </Stack>
    </AvatarContainer>
  );

  const renderForm = () => (
    <FormContainer onSubmit={formik.handleSubmit}>
      <CustomTextField
        multiline
        ref={inputCommentArea}
        variant="outlined"
        name="content"
        autoComplete="content"
        placeholder="What are you thinking about?"
        value={formik.values.content}
        onChange={formik.handleChange}
        onFocus={() => setIsPostFocused(true)}
        onBlur={() => setIsPostFocused(false)}
        error={formik.touched.content && Boolean(formik.errors.content)}
        helperText={formik.touched.content && formik.errors.content}
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
                isPostFocused || formik.values.content.length !== 0
                  ? "visible"
                  : "hidden",
              fontSize: "14px",
              color:
                formik.values.content.length > 264 ||
                formik.values.content.length < 6
                  ? "red"
                  : "green",
            }}
          >
            {formik.values.content.length} / 264
          </Typography>
          <SubmitButton
            disabled={submitChecking}
            variant="contained"
            type="submit"
          >
            Comment
          </SubmitButton>
        </ButtonAndCounterContainer>
      </ItemsContainer>
    </FormContainer>
  );

  return (
    <CommentAreaContainer>
      {renderAvatar()}
      {renderForm()}
    </CommentAreaContainer>
  );
};
