/** Custom hooks */
import { useAuthStore } from "../hooks";

export const HomePage = (): JSX.Element => {

    const { startLogout } = useAuthStore();

    return (
        <>
            <h1>Hola mundo</h1>
            <button onClick={startLogout}>
                Logout
            </button>
        </>
    )
};