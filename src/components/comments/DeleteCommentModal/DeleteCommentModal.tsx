/** Libraries */
import { Typography } from "@mui/material";

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
  comment_id: string;
}

export const DeleteCommentModal: React.FC<Props> = ({
  openModal,
  setOpenModal,
  comment_id,
}) => {
  const { SocketDeleteComment } = usePostStore();

  // console.log(comment_id);
  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    SocketDeleteComment(comment_id);
    setOpenModal(false);
  };

  const renderTitle = () => (
    <Typography fontSize="18px" color="GrayText">
      Are you sure you want to delete this comment?
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
