import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../contexts/userContext";
import styles from "./Layout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../slices/user";
const Layout = () => {
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.userState)
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        if(!user){
            navigate("/login")
        }
    })
    const menus = [
        {
            path: "/",
            name: "Home"
        },
        {
            path: "/quan-tri-thanh-vien",
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
                    <div onClick={() => {
                        dispatch(logOut())
                    }}>Trường đại học</div>
                    <div>{user?.name}</div>
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