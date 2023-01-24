import { NextPage } from "next";

import ChangePassword from "./ChangePasswordOption";
import UserImage from "./UserImage";

const UserSettings: NextPage = () => {
    return (
        <>
            <ChangePassword/>
            <UserImage/>
        </>
    )
}

export default UserSettings