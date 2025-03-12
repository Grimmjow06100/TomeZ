
import { getUserFromSession } from "auth/core/session"

export const userPage = () => {
    const user = getUserFromSession();
    return (
        <div>
            <h1>{user}</h1>
        </div>
    )
}