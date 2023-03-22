/** Libraries */
import { useEffect } from "react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

/** Store */
import { RootState, AppDispatch } from "../store";

/** Store */
import { setSocket } from "../store/slices/socket.slice";

/** Sockets */
import { getSocketInstance } from "../sockets";

const useSocket = () => {
  /** useDispatch setting */
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();

  /** useSelector setting */
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const socket = useAppSelector((state: RootState) => state.socket.socket);
  const { _id } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log(socket);
    const socketInstance = getSocketInstance();
    if (_id && !socket) {
      dispatch(setSocket(socketInstance));
    }

    return () => {
      socketInstance.disconnect();
      dispatch(setSocket(null));
    };
  }, [dispatch, _id]);

  return socket;
};

export default useSocket;
