// Layout
import AnonymousLayout from "../layouts/AnonymousLayout";
import MainLayout from "../layouts/MainLayout";
import { renderRoutes } from "./generate-routes";
// pages
import Home from "../pages/Home";
import Login from "../pages/Login";

export const routes = [
    {
        layout: AnonymousLayout,
        routes: [
            {
                name: 'login',
                title: 'login page',
                component: Login,
                path: '/login',
                isPublic: true,
            }
        ]
    },
    {
        layout: MainLayout,
        routes: [
            {
                name: 'Home',
                title: 'Home page',
                component: Home,
                path: '/',
            },
        ]
    }
]

export const Routes = renderRoutes(routes);
