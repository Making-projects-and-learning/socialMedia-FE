/** Libraries */
import { useEffect, useRef, useState } from "react";

import { Button, TextField, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import { styled } from "@mui/material/styles";

import { useFormik } from "formik";

/** Utils */
import {
  socketEvents,
  uploadImageToCloudinary,
  YupPostValidations,
} from "../../utils";

/** Custom hooks */
import { useAuthStore, usePostStore, useUiStore } from "../../hooks";

/** Interfaces */
import { Post } from "../../interfaces/post.interface";

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

const CustomTextField = styled(TextField)(({ theme }) => ({
  height: "auto",
  width: "100%",
  border: "none",
  fontFamily: "Arial",
  fontSize: "18px",
  resize: "none",

  "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
    display: "none",
  },
  ":focus-visible": {
    outline: "none",
  },
}));

const ButtonAndCounterContainer = styled("div")(({ theme }) => ({
  width: "35%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    width: "50%",
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
  height: "auto",
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
}));

const CloseIconContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  marginTop: "1.5%",
  marginLeft: "1.5%",
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

/** Types allowed to be charged on a post */
const imageTypesAllowed = [
  "image/jpg",
  "image/jpeg",
  "image/avif",
  "image/png",
  "image/webp",
];

const { POST } = socketEvents;

export const PostCreateArea = (): JSX.Element => {
  const {
    socket,
    socketRequests,
    setCloseSocketLikeRequest,
    setCloseSocketUnLikeRequest,
    SocketNewPost,
    LoadNewPost,
    UpdatePost,
    DeletePost,
  } = usePostStore();

  const { startUiOpenLikeNotification } = useUiStore();

  const { _id, username } = useAuthStore();

  /** The next code with useEffects is to validate if
   * the like responde is comming from the server or not */

  /** We are going to like or unlike a post from the client,
   * but if we don't recive any response from the server that means
   * that something goes wrong so we are going to go back with the
   * like or unlike action on the post.
   */

  /** Like */
  const estadoRef = useRef<boolean>();
  useEffect(() => {
    estadoRef.current = socketRequests.like.status;
  }, [socketRequests.like.status]);
  useEffect(() => {
    let timer: number;
    if (estadoRef.current) {
      timer = setTimeout(() => {
        /** If the server doesn't respond */
        console.log("The response is not comming");
        if (socketRequests.like.post) UpdatePost(socketRequests.like.post);
        setCloseSocketLikeRequest();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [estadoRef.current]);

  /** UnLike */
  const unLikeRef = useRef<boolean>();
  useEffect(() => {
    unLikeRef.current = socketRequests.unLike.status;
  }, [socketRequests.unLike.status]);
  useEffect(() => {
    let timer: number;
    if (unLikeRef.current) {
      timer = setTimeout(() => {
        /** If the server doesn't respond */
        console.log("The response is not comming");
        if (socketRequests.unLike.post) UpdatePost(socketRequests.unLike.post);
        setCloseSocketUnLikeRequest();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [unLikeRef.current]);

  /** useEffects used as a listeners of events since this point */
  /** Create post listener */
  useEffect(() => {
    if (socket) {
      socket.on(POST.create, (data: Post) => {
        LoadNewPost(data);
        console.log("New post loaded!");
      });
    }

    return () => {
      socket.off(POST.create);
    };
  }, [socket]);

  /** Delete post listener */
  useEffect(() => {
    socket.on(POST.delete, (data: Post) => {
      console.log("POST DELETED");
      DeletePost(data);
    });

    return () => {
      socket.off(POST.delete);
    };
  }, [socket]);

  /** Like a posts listener */
  useEffect(() => {
    if (socket) {
      socket.on(
        POST.like,
        ({ postDB, user_name }: { postDB: Post; user_name: string }) => {
          console.log("POST LIKED");
          setCloseSocketLikeRequest();
          if (postDB.owner._id === _id && user_name !== username) {
            startUiOpenLikeNotification(user_name);
          }
        }
      );
    }
    return () => {
      socket.off(POST.like);
    };
  }, [socket]);

  /** UnLike a posts listener */
  useEffect(() => {
    if (socket) {
      socket.on(POST.unLike, (postDB: Post) => {
        console.log("POST UNLIKED");
        setCloseSocketUnLikeRequest();
      });
    }
    return () => {
      socket.off(POST.unLike);
    };
  }, [socket]);

  /** Code totally related to this component since this point */
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

  return (
    <PostAreaContainer>
      <AvatarContainer>
        <Stack>
          <Avatar
            alt="Lucas Ojeda"
            src="https://pbs.twimg.com/profile_images/1600166202218844162/wOaz3mlG_400x400.jpg"
            /** Default avatar */
            // src="https://res.cloudinary.com/the-kings-company/image/upload/v1671396595/user-ecommerce/Avatar-Profile-PNG-Free-Image_yeonm0.png"
          />
        </Stack>
      </AvatarContainer>
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
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
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
          <ImageIconButton
            onClick={() => imageRef.current!.click()}
            disabled={!!file}
          >
            <ImageIcon color={!file ? "primary" : "disabled"} />
          </ImageIconButton>
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
    </PostAreaContainer>
  );
};
