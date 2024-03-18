import React, { createContext, useState } from 'react';

// Créer le contexte utilisateur
const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Fonction pour mettre à jour l'utilisateur
    const updateUser = (newUser) => {
        setUser(newUser);
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };