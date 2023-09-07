import { createContext, useState } from "react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);

    const addUser = (user) => {
        const allUsers = [...users, user];
        setUsers(allUsers);
        localStorage.setItem('users', JSON.stringify(allUsers));
    };

    const actions = {
        addUser
    }

    return (
        <UserContext.Provider value={actions}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;