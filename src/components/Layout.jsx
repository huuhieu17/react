import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import styles from "./Layout.module.css"
import { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import { userContext } from "../contexts/userContext";
const Layout = () => {
    const navigate = useNavigate();
    const userContextData = useContext(userContext);
    const { pathname } = useLocation();

    const menus = [
        {
            path: "/",
            name: "Home"
        },
        {
            path: "/products",
            name: "Quản trị thành viên"
        },
        {
            path: "/danh-muc",
            name: "Danh mục",
            child: [
                {
                    path: "/nganh-nghe",
                    name: "Ngành nghề"
                }
            ]
        }
    ]
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.sideBar}`}>
                {menus.map((menu, index) => (
                   <MenuItem path={menu.path} name={menu.name} child={menu.child} key={index}/>
                ))}

            </div>
            <div className={`${styles.rightContent}`}>
                <div className={`${styles.header}`}>
                    <div>Trường đại học</div>
                    <div>{userContextData?.user?.username}</div>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

const MenuItem = ({ path, name, child }) => {
    const { pathname } = useLocation();
    const [open, setOpen] = useState(false);

    if (!child) {
        return (
            <Link to={path}>
                <div className={pathname === path ? styles.active : null}>{name}</div>
            </Link>
        )
    }

    return (
        <div>
            <div className={pathname.includes(path) ? styles.active : null} onClick={() => {
                setOpen(!open);
            }}>{name}</div>
            {open && child.map((item, index) => (
                <Link to={`${path}${item.path}`} key={index}>
                    <div className={pathname.includes(item.path) ? styles.active : null}>{item.name}</div>
                </Link>
            ))}
        </div>
    )
}

export default Layout