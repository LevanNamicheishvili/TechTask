import React, { createContext, useState } from 'react';

export const SelectedStudentContext = createContext();

export const SelectedStudentProvider = ({ children }) => {
    const [selectedStudent, setSelectedStudent] = useState(null);

    return (
        <SelectedStudentContext.Provider value={{ selectedStudent, setSelectedStudent }}>
            {children}
        </SelectedStudentContext.Provider>
    );
};