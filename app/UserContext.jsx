import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [preguntaElegida, setpreguntaElegida] = useState(null);

    const logout = () => {
        setUser(null);
        router.push('/');
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout, preguntaElegida, setpreguntaElegida }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);


