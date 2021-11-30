import { Dispatch, SetStateAction } from "react";
import { User } from "../../types/types";

export const handleChooseUserHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    allUsers: User[],
    setCurrentUser: Dispatch<SetStateAction<User>>
    ) => {
    const chosenUserButton = (e.target as HTMLButtonElement).value;
    const [chosenUser] = allUsers.filter(existingUser => existingUser.username === chosenUserButton);
    setCurrentUser(chosenUser);
}