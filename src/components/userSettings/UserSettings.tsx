import { NextPage } from "next";
import { registerCustom } from "superjson";
import ChangePassword from "./ChangePasswordOption";

const UserSettings: NextPage = () => {
    return (
        <>
            <ChangePassword/>
        </>
    )
}

export default UserSettings