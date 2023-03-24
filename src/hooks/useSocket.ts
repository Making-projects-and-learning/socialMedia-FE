/** Libraries */
import { useState, useEffect } from "react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import { closeSnackbar, useSnackbar } from "notistack";

/** Store */
import { RootState, AppDispatch } from "../store";

/** Store */
import { setSocket } from "../store/slices/socket.slice";

/** Sockets */
import { getSocketInstance, socketEvents } from "../sockets";

const { CONNECT, DISCONNECT } = socketEvents;

const useSocket = () => {
  /** Notifications */
  const { enqueueSnackbar } = useSnackbar();

  /** useDispatch setting */
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();

  /** useSelector setting */
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const socket = useAppSelector((state: RootState) => state.socket.socket);
  const { _id } = useAppSelector((state: RootState) => state.auth);

  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [snackbarId, setSnackbarId] = useState<any>();

  useEffect(() => {
    const socketInstance = getSocketInstance();
    if (_id && !socket) {
      dispatch(setSocket(socketInstance));
    }

    return () => {
      socketInstance.disconnect();
      dispatch(setSocket(null));
    };
  }, [dispatch, _id]);

  /** Create post listener */
  useEffect(() => {
    if (socket) {
      socket.on(CONNECT, () => {
        setIsOnline(true);
      });
    }

    return () => {
      if (socket) {
        socket.off(CONNECT);
      }
    };
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on(DISCONNECT, () => {
        setIsOnline(false);
      });
    }

    return () => {
      if (socket) {
        socket.off(DISCONNECT);
      }
    };
  }, [socket]);

  /** Offline/online notification */
  useEffect(() => {
    if (isOnline) {
      closeSnackbar(snackbarId);
    } else {
      if (socket?.connected !== undefined) {
        setSnackbarId(
          enqueueSnackbar("No connection!", {
            variant: "error",
            anchorOrigin: { horizontal: "center", vertical: "bottom" },
            persist: true,
          })
        );
      }
    }
  }, [isOnline]);

  return socket;
};

export default useSocket;
