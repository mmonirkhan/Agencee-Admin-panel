import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

//LAYOUTS
import MainLayout from "../layouts/MainLayout";
import UserDetailsPage from "../pages/user/UserDetailsPage";
import OrderListPage from "../pages/order/OrderListPage";
import NewOrder from "../pages/order/NewOrder";
import OrderDetails from "../pages/order/OrderDetailsPage";

//PAGES
const LoginPage = React.lazy(() => import("../pages/LoginPage"));
const NotFoundPage = React.lazy(() => import("../pages/NotFoundPage"));
const DashboardPage = React.lazy(() => import("../pages/DashboardPage"));
const AttributeListPage = React.lazy(
    () => import("../pages/attribute/AttributeListPage")
);
const EditAttributePage = React.lazy(
    () => import("../pages/attribute/EditAttributePage")
);
const CategoryListPage = React.lazy(
    () => import("../pages/category/CategoryListPage")
);
const ProductListPage = React.lazy(() => import("../pages/ProductListPage"));
const ProductDetailsPage = React.lazy(
    () => import("../pages/ProductDetailsPage")
);
const ProductEditPage = React.lazy(() => import("../pages/ProductEditPage"));
const ProductCreatePage = React.lazy(
    () => import("../pages/ProductCreatePage")
);
const MediaPage = React.lazy(() => import("../pages/MediaPage"));
const UserListPage = React.lazy(() => import("../pages/user/UserListPage"));

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route element={<MainLayout />}>
                        <Route index element={<DashboardPage />} />
                        <Route path="category" element={<CategoryListPage />} />
                        <Route path="attribute">
                            <Route index element={<AttributeListPage />} />
                            <Route
                                path=":attributeId/edit"
                                element={<EditAttributePage />}
                            />
                        </Route>
                        <Route path="product">
                            <Route index element={<ProductListPage />} />
                            <Route path="new" element={<ProductCreatePage />} />
                            <Route
                                path=":productId"
                                element={<ProductDetailsPage />}
                            />
                            <Route
                                path=":productId/edit"
                                element={<ProductEditPage />}
                            />
                        </Route>

                        <Route path="order">
                            <Route index element={<OrderListPage />} />
                            <Route path=":orderId" element={<OrderDetails />} />
                            <Route path="new" element={<NewOrder />} />
                        </Route>
                        <Route path="user">
                            <Route index element={<UserListPage />} />
                            <Route
                                path=":userName"
                                element={<UserDetailsPage />}
                            />
                        </Route>
                        <Route path="media" element={<MediaPage />} />
                    </Route>
                </Route>
                <Route path="login" element={<LoginPage />} />
                <Route path="404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
