import {useParams} from "react-router-dom";
import Header from "../components/Header";
import SidebarPanel from "../components/SidebarPanel";
import UserDetails from "../components/UserDetails";
import "../styles/User.css";


const User = () => {
    const {addr} = useParams()

    return (
        <>
            <Header/>
            <div className="container">
                <SidebarPanel/>
                <UserDetails
                    user_addr={addr}
                />
            </div>

        </>
    )
};

export default User;
