import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../contexts/userContext";
import styles from "./Layout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../slices/user";
const Layout = () => {
    const {user} = useSelector((state) => state.userState)
    const { pathname } = useLocation();
    const dispatch = useDispatch();
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
          <div className="p-4 mx-auto w-full flex justify-center">
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="25" cy="25" r="25" fill="#EFECE8" />
              <path
                d="M27.7 23.0001L21.45 18.5376C20.575 17.9126 19.4125 17.9126 18.55 18.5376L12.3 23.0001C11.6375 23.4751 11.25 24.2251 11.25 25.0376V35.0001C11.25 35.6876 11.8125 36.2501 12.5 36.2501H17.5V28.7501H22.5V36.2501H27.5C28.1875 36.2501 28.75 35.6876 28.75 35.0001V25.0376C28.75 24.2251 28.3625 23.4751 27.7 23.0001Z"
                fill="#C4C4C4"
              />
              <path
                d="M36.2875 13.75H24.9625C23.6 13.75 22.5 14.85 22.5 16.2125L22.6125 16.325C22.7125 16.3875 22.8125 16.4375 22.9125 16.5L29.1625 20.9625C30.1125 21.6375 30.7875 22.6375 31.0875 23.75H33.75V26.25H31.25V28.75H33.75V31.25H31.25V36.25H36.2875C37.65 36.25 38.75 35.15 38.75 33.7875V16.2125C38.75 14.85 37.65 13.75 36.2875 13.75ZM33.75 21.25H31.25V18.75H33.75V21.25Z"
                fill="#C4C4C4"
              />
            </svg>
          </div>
          {menus.map((menu, index) => (
            <MenuItem
              path={menu.path}
              name={menu.name}
              child={menu.child}
              key={index}
            />
          ))}
        </div>
        <div className={`${styles.rightContent}`}>
          <div className={`${styles.header}`}>
            <div
              onClick={() => {
                dispatch(logOut());
              }}
            >
              Trường đại học
            </div>
            <div>
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="17.5" cy="17.5" r="17.5" fill="#EFECE8" />
                <mask
                  id="mask0_237_14157"
                  style={{
                    maskType: "alpha",
                  }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="35"
                  height="35"
                >
                  <circle cx="17.5" cy="17.5" r="17.5" fill="#8993A4" />
                </mask>
                <g mask="url(#mask0_237_14157)">
                  <mask
                    id="mask1_237_14157"
                    style={{
                      maskType: "alpha",
                    }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="35"
                    height="35"
                  >
                    <circle cx="17.5" cy="17.5" r="17.5" fill="#8993A4" />
                  </mask>
                  <g mask="url(#mask1_237_14157)">
                    <path
                      d="M31 37V33.3333C31 31.3884 30.2888 29.5232 29.023 28.1479C27.7571 26.7726 26.0402 26 24.25 26H10.75C8.95979 26 7.2429 26.7726 5.97703 28.1479C4.71116 29.5232 4 31.3884 4 33.3333V37"
                      fill="white"
                    />
                    <path
                      d="M17.5 21C20.5376 21 23 18.5376 23 15.5C23 12.4624 20.5376 10 17.5 10C14.4624 10 12 12.4624 12 15.5C12 18.5376 14.4624 21 17.5 21Z"
                      fill="white"
                    />
                  </g>
                </g>
                <circle cx="17.5" cy="17.5" r="17" stroke="#EFECE8" />
              </svg>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    );
}

const MenuItem = ({ path, name, child }) => {
    const { pathname } = useLocation();
    const [open, setOpen] = useState(false);

    if (!child) {
        return (
          <div className={styles.link}>
            <Link to={path}>
              <div className={pathname === path ? styles.active : null}>
                {name}
              </div>
            </Link>
          </div>
        );
    }

    return (
        <div className={styles.link}>
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