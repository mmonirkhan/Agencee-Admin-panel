import { Suspense, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { MenuItem, Sidebar, SubMenu, Menu } from "react-pro-sidebar";
import Navbar from "../components/Navbar";
// import { logo } from '../constants/images';

const MainLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showToggleBtn, setShowToggleBtn] = useState(false);

    const toggleSidebar = () => setIsOpen((open) => !open);

    return (
        <div className="flex h-screen">
            <Sidebar
                breakPoint="lg"
                toggled={isOpen}
                onBackdropClick={toggleSidebar}
                onBreakPoint={(broke) => setShowToggleBtn(broke)}
                backgroundColor="#ffffff"
                className="font-sans"
            >
                <div className="h-14 flex items-center justify-center shadow bg-white">
                    <Link to={"/"} className="contents">
                        {/* <img src={logo} alt="" className='h-full object-contain' /> */}
                        <p className="font-bold">AGENSEEE ADMIN</p>
                    </Link>
                </div>
                <Menu>
                    <MenuItem
                        icon={<i className="ri-dashboard-fill"></i>}
                        component={<NavLink to={"/"} />}
                    >
                        Dashboard
                    </MenuItem>
                    <SubMenu
                        icon={<i className="ri-stack-fill"></i>}
                        label="Products"
                    >
                        <MenuItem
                            icon={<i className="ri-price-tag-3-fill"></i>}
                            component={<Link to={"/category"} />}
                        >
                            Category
                        </MenuItem>
                        <MenuItem
                            icon={<i className="ri-price-tag-3-fill"></i>}
                            component={<Link to={"/attribute"} />}
                        >
                            Attribute
                        </MenuItem>
                        <MenuItem
                            icon={<i className="ri-price-tag-3-fill"></i>}
                            component={<Link to={"/product/new"} />}
                        >
                            New Product
                        </MenuItem>
                        <MenuItem
                            icon={<i className="ri-price-tag-3-fill"></i>}
                            component={<Link to={"/product"} />}
                        >
                            Products
                        </MenuItem>
                    </SubMenu>
                    <SubMenu
                        icon={<i className="ri-shopping-cart-2-fill"></i>}
                        label="Order"
                    >
                        <MenuItem
                            icon={<i className="ri-price-tag-3-fill"></i>}
                            component={<Link to={"/order"} />}
                        >
                            Order List
                        </MenuItem>
                        <MenuItem
                            icon={<i className="ri-price-tag-3-fill"></i>}
                            component={<Link to={"/order/new"} />}
                        >
                            New Order
                        </MenuItem>
                    </SubMenu>
                    <MenuItem
                        icon={<i className="ri-price-tag-3-fill"></i>}
                        component={<Link to={"/user"} />}
                    >
                        Users
                    </MenuItem>
                </Menu>
            </Sidebar>
            <main className="h-full overflow-auto grow">
                <div className="h-full flex flex-col">
                    <div>
                        <Navbar
                            showSidebarToggleBtn={showToggleBtn}
                            onSidebarToggle={toggleSidebar}
                        />
                    </div>
                    <div className="grow overflow-auto">
                        <div className="m-4">
                            <Suspense fallback={<p>Loading........</p>}>
                                <Outlet />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
