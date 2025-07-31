import { useNavigate } from 'react-router-dom';

import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

import Button from '../../components/Button';

const LogoutButton = () => {
    const navigate = useNavigate();

    const logoutUser = async (): Promise<void> => {
        try {
            await signOut(auth);
            navigate('/');
            console.log("Sign‑out successful.");
        } catch (error: any) {
            console.error("Error signing out:", error);
        }
    }

    return (
        <Button
        size="sm"
        text="Log Out"
        variant="primary"
        onClick={logoutUser}
        />
    );
};

export default LogoutButton;