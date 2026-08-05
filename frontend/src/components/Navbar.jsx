import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(false);

  const menuItems = [
    { label: "TRANG CHỦ", path: "/" },
    { label: "TẤT CẢ BÁC SĨ", path: "/doctors" },
    { label: "GIỚI THIỆU", path: "/about" },
    { label: "LIÊN HỆ", path: "/contact" },
  ];

  const logOut = () => {
    setToken(false);
    navigate("/");
  };

  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between py-4">
      <button
        className="cursor-pointer"
        onClick={() => navigate("/")}
        type="button"
      >
        <img alt="Prescripto" className="w-36" src={assets.logo} />
      </button>

      {/* Desktop menu */}
      <ul className="hidden items-center gap-6 md:flex">
        {menuItems.map((item) => (
          <NavLink
            className="group flex flex-col items-center"
            key={item.path}
            to={item.path}
          >
            <p className="cursor-pointer font-medium text-gray-600 text-xs transition-colors hover:text-gray-900">
              {item.label}
            </p>
            <hr className="hidden w-4/5 border-gray-600 border-b-2 border-none group-hover:block" />
          </NavLink>
        ))}
      </ul>

      {/* Right side: avatar or create account */}
      <div className="relative flex items-center gap-4">
        {token ? (
          <div className="group relative cursor-pointer">
            <div className="flex items-center gap-2">
              <img
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
                src={assets.profile_pic}
              />
              <img alt="" className="w-3" src={assets.dropdown_icon} />
            </div>
            <div className="absolute top-full right-0 z-10 hidden w-48 rounded-md border border-gray-200 bg-white py-2 shadow-md group-hover:block">
              <button
                className="w-full cursor-pointer px-4 py-2 text-left text-gray-700 text-sm hover:bg-gray-50"
                onClick={() => navigate("/my-profile")}
                type="button"
              >
                Hồ sơ của tôi
              </button>
              <button
                className="w-full cursor-pointer px-4 py-2 text-left text-gray-700 text-sm hover:bg-gray-50"
                onClick={() => navigate("/my-appointments")}
                type="button"
              >
                Lịch hẹn của tôi
              </button>
              <hr className="my-1 border-gray-100" />
              <button
                className="w-full cursor-pointer px-4 py-2 text-left text-gray-700 text-sm hover:bg-gray-50"
                onClick={logOut}
                type="button"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        ) : (
          <button
            className="hidden cursor-pointer rounded-full bg-[#5F6FFF] px-6 py-2.5 font-medium text-sm text-white transition-opacity hover:opacity-90 md:block"
            onClick={() => navigate("/login")}
            type="button"
          >
            Tạo tài khoản
          </button>
        )}

        {/* Mobile menu icon */}
        <button
          className="w-6 cursor-pointer md:hidden"
          onClick={() => setShowMenu(true)}
          type="button"
        >
          <img alt="Menu" src={assets.menu_icon} />
        </button>

        {/* Mobile menu overlay */}
        {showMenu && (
          <div className="fixed inset-0 z-50 bg-white">
            <div className="flex items-center justify-between px-5 py-4">
              <button
                className="cursor-pointer"
                onClick={() => {
                  setShowMenu(false);
                  navigate("/");
                }}
                type="button"
              >
                <img alt="Prescripto" className="w-36" src={assets.logo} />
              </button>
              <button
                className="w-6 cursor-pointer"
                onClick={() => setShowMenu(false)}
                type="button"
              >
                <img alt="Close" src={assets.cross_icon} />
              </button>
            </div>
            <ul className="mt-6 flex flex-col items-center gap-6">
              {menuItems.map((item) => (
                <NavLink
                  className="font-medium text-gray-700 text-lg"
                  key={item.path}
                  onClick={() => setShowMenu(false)}
                  to={item.path}
                >
                  {item.label}
                </NavLink>
              ))}
              {token ? (
                <>
                  <button
                    className="cursor-pointer font-medium text-gray-700 text-lg"
                    onClick={() => {
                      navigate("/my-profile");
                      setShowMenu(false);
                    }}
                    type="button"
                  >
                    Hồ sơ của tôi
                  </button>
                  <button
                    className="cursor-pointer font-medium text-gray-700 text-lg"
                    onClick={() => {
                      navigate("/my-appointments");
                      setShowMenu(false);
                    }}
                    type="button"
                  >
                    Lịch hẹn của tôi
                  </button>
                  <button
                    className="cursor-pointer font-medium text-gray-700 text-lg"
                    onClick={() => {
                      logOut();
                      setShowMenu(false);
                    }}
                    type="button"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <button
                  className="cursor-pointer rounded-full bg-[#5F6FFF] px-8 py-3 font-medium text-base text-white"
                  onClick={() => {
                    navigate("/login");
                    setShowMenu(false);
                  }}
                  type="button"
                >
                  Tạo tài khoản
                </button>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
