import React, { createContext, useState } from 'react';

// Create a context
const MyContext = createContext();

// Create a provider component
const MyContextProvider = ({ children }) => {
    const [state, setState] = useState("Completed");

    return (
        <MyContext.Provider value={{ state, setState }}>
            {children}
        </MyContext.Provider>
    );
};

export { MyContext, MyContextProvider };
