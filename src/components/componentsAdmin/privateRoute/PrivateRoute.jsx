import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // Si no hay token, redirigir al login
        return <Navigate to="/login" replace />;
    }

    // Si hay token, renderizar el componente solicitado
    return element;
};

export default PrivateRoute;
