import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({isPublic, isAuthorized}) {
    return (isPublic || isAuthorized) ? <Outlet /> : <Navigate to='/login' />
}