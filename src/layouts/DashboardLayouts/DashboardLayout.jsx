import React, { useContext, useEffect, useState } from "react";
import {
  FaHome, FaTasks, FaUserAlt, FaSignOutAlt, FaCoins,
  FaHistory, FaPlus, FaListAlt, FaCheckCircle, FaUsers,
} from "react-icons/fa";
import { GoMoon } from "react-icons/go";
import { MdNotifications } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
import clsx from "clsx";
import { IoSunnyOutline } from "react-icons/io5";
import LogoBlue from "../../components/Logo/LogoBlue";
import LogoWhite from "../../components/Logo/LogoWhite";
import FullFooter from "./FullFooter";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import DashboardNavBar from "../../components/Dashboard/DashboardNavBar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";


const allNavItems = {
  worker: [
    { name: "Home", icon: <FaHome />, path: "/dashboard/worker-home" },
    { name: "TaskList", icon: <FaTasks />, path: "/dashboard/task-list" },
    { name: "My Submissions", icon: <FaCheckCircle />, path: "/dashboard/my-submissions" },
    { name: "Withdrawals", icon: <FaCoins />, path: "/dashboard/withdrawals" },
    { name: "Withdrawals History", icon: <FaHistory />, path: "/dashboard/withdrawals-history" }
  ],
  buyer: [
    { name: "Home", icon: <FaHome />, path: "/dashboard/buyer-home" },
    { name: "Add New Tasks", icon: <FaPlus />, path: "/dashboard/add-task" },
    { name: "My Tasks", icon: <FaListAlt />, path: "/dashboard/my-tasks" },
    { name: "Purchase Coin", icon: <FaCoins />, path: "/dashboard/purchase-coin" },
    { name: "Payment History", icon: <FaHistory />, path: "/dashboard/payment-history" },
    { name: "Approve Submissions", icon: <FaHistory />, path: "/dashboard/approve-submission" },

  ],
  admin: [
    { name: "Home", icon: <FaHome />, path: "/dashboard/admin-home" },
    { name: "Manage Users", icon: <FaUsers />, path: "/dashboard/manage-users" },
    { name: "Manage Task", icon: <FaTasks />, path: "/dashboard/manage-task" },
    { name: "Withdraw success History", icon: <FaHistory />, path: "/dashboard/success-history" },
  ],
};

const dummyNotifications = [
  "You earned 10 coins from Task A.",
  "Your submission for Task B was approved.",
  "New task available: Design Poster."
];

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  // const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  const { user, logOut, showMobileSidebar, setShowMobileSidebar } = useContext(AuthContext);
  const navigate = useNavigate();


  const { data: roleUsers = [], isLoading } = useQuery({
    queryKey: ['roleUsers'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user.email}`);
      return res.data;
    },
  });


  const userRole = roleUsers[0]?.role;
  const navItems = allNavItems[userRole] || [];
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Dark mode toggle
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const isDarkMode = root.classList.contains('dark');
    setIsDark(isDarkMode);

    // Optional: Listen for class changes (e.g., user toggles theme)
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains('dark'));
    });
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  if (isLoading || !userRole) {
    return <div><Loading></Loading></div>;
  }

  return (
    <div className={`${isDark ? "dark" : ""}`}>
      {/* Topbar */}
      <DashboardNavBar></DashboardNavBar>





      {/* Layout Section */}
      <div className="flex min-h-[calc(100vh-72px)]"> {/* 96px = header + footer */}
        {/* Sidebar */}
        <aside
          className={clsx(
            "bg-gray-800 text-white flex flex-col transition-all duration-300 z-50 md:relative fixed md:flex",
            isCollapsed && !isMobile ? "w-20" : "w-64",
            showMobileSidebar ? "left-0" : "-left-full",
            "top-0 bottom-0 md:static h-full md:h-auto"
          )}
        >
          <div className="p-4 hidden md:block">
            <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-white text-lg">☰</button>
          </div>
          <nav className="flex-1">
            <ul className="space-y-1">
              {navItems.map(({ name, icon, path }) => (
                <li key={name}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      clsx("flex items-center gap-3 px-4 py-2 hover:bg-gray-700",
                        isActive ? "bg-gray-700" : "",
                        isCollapsed && !isMobile ? "justify-center" : ""
                      )
                    }
                  >
                    <span className="text-xl">{icon}</span>
                    {(!isCollapsed || isMobile) && <span>{name}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-700">
            <button className="flex items-center gap-3 w-full hover:bg-gray-700 px-4 py-2">
              <FaUserAlt className="text-xl" />
              {(!isCollapsed || isMobile) && <NavLink to='/dashboard/profile'>Profile</NavLink>}
            </button>
            <button className="flex items-center gap-3 w-full hover:bg-gray-700 px-4 py-2 mt-2">
              <FaSignOutAlt className="text-xl" />
              {(!isCollapsed || isMobile) &&
                <Link
                  onClick={() => {
                    // logOut();
                    // toast("log out successfully");
                    logOut().then(
                      () => {
                        toast("log out successfully");
                        window.location.reload();
                      }
                    )
                    navigate('/'); // redirect to home page
                  }}>Logout
                </Link>}
            </button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col max-h-screen overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
            <Outlet />
          </div>

          {/* Footer */}
          {/* Desktop Footer only for content area */}
          <div className="hidden md:block bg-white dark:bg-gray-800">
            <footer className="text-center text-gray-600 p-3 dark:text-gray-300">
              © {new Date().getFullYear()} CoinLeaf. All rights reserved.
            </footer>
          </div>

          {/* Mobile Full Footer */}
          <div className="block md:hidden">
            <FullFooter />
          </div>
        </div>
      </div>


    </div>
  );
};

export default DashboardLayout;
