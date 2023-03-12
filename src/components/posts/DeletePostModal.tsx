/** Libraries */
import { Button, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";

/** Custom hooks */
import { usePostStore } from "../../hooks";

/** Material UI - Custom components */
const ModalContainer = styled("div")(({ theme }) => ({
  position: "fixed",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: "3500",
}));

const Modal = styled("div")(({ theme }) => ({
  width: "60vw",
  height: "30vh",
  borderRadius: "25px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  backgroundColor: "#fff",
  zIndex: "3500",
}));

const ButtonsContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "30%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
}));

const ConfirmButton = styled(Button)(({ theme }) => ({
  fontSize: "14px",
  borderRadius: "none",
}));

const CancelButton = styled(Button)(({ theme }) => ({
  fontSize: "14px",
  borderRadius: "none",
}));

/** Interfaces */
interface Props {
  openModal: boolean;
  setOpenModal: Function;
  post_id: string;
}

export const DeletePostModal: React.FC<Props> = ({
  openModal,
  setOpenModal,
  post_id,
}) => {
  const { SocketDeletePost } = usePostStore();

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    SocketDeletePost(post_id);
    setOpenModal(false);
  };

  return (
    <>
      {openModal && (
        <ModalContainer>
          <Modal>
            <Typography fontSize="18px" color="GrayText">
              Are you sure you want to delete this post?
            </Typography>
            <ButtonsContainer>
              <ConfirmButton
                variant="contained"
                size="medium"
                color="primary"
                onClick={handleConfirm}
              >
                Confirm
              </ConfirmButton>
              <CancelButton
                variant="outlined"
                size="medium"
                color="error"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </CancelButton>
            </ButtonsContainer>
          </Modal>
        </ModalContainer>
      )}
    </>
  );
};
