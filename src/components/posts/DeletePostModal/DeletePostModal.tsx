/** Libraries */
import { Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

/** Custom hooks */
import { usePostStore } from "../../../hooks";

/** Material UI - Custom components */
import {
  ModalContainer,
  Modal,
  ButtonsContainer,
  ConfirmButton,
  CancelButton,
} from "./styled";

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
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { SocketDeletePost } = usePostStore();

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (pathname.split("/")[1] === "post") navigate("/");
    SocketDeletePost(post_id);
    setOpenModal(false);
  };

  const renderTitle = () => (
    <Typography fontSize="18px" color="GrayText">
      Are you sure you want to delete this post?
    </Typography>
  );

  const renderConfirmButton = () => (
    <ConfirmButton
      variant="contained"
      size="medium"
      color="primary"
      onClick={handleConfirm}
    >
      Confirm
    </ConfirmButton>
  );

  const renderCancelButton = () => (
    <CancelButton
      variant="outlined"
      size="medium"
      color="error"
      onClick={() => setOpenModal(false)}
    >
      Cancel
    </CancelButton>
  );

  return (
    <>
      {openModal && (
        <ModalContainer>
          <Modal>
            {renderTitle()}
            <ButtonsContainer>
              {renderConfirmButton()}
              {renderCancelButton()}
            </ButtonsContainer>
          </Modal>
        </ModalContainer>
      )}
    </>
  );
};
