import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  LayoutDashboard,
  Search,
  History as HistoryIcon,
  Settings,
} from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // 컴포넌트 상태(State) 선언부 - 자네가 빼먹었던 바로 그 부분이다.
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState("CAM-01");

  // 라우팅 제어부
  const navigate = useNavigate();
  const location = useLocation();
  const currentDate = "2026-02-20";

  // 메뉴 설정
  const menuItems = [
    { path: "/live", icon: LayoutDashboard, label: "실시간 검사" },
    { path: "/detail", icon: Search, label: "검사결과 상세" },
    { path: "/history", icon: HistoryIcon, label: "검증이력" },
    { path: "/settings", icon: Settings, label: "환경설정" },
  ];

  return (
    <div className="flex h-screen w-full bg-[#0f172a] text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${isOpen ? "w-72" : "w-[76px]"} bg-[#1e293b] transition-all duration-300 border-r border-gray-700 flex flex-col z-20 shrink-0`}
      >
        <div className="p-5 flex justify-center border-b border-gray-700 h-20 items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hover:text-blue-400 transition-colors p-2"
          >
            <Menu size={28} />
          </button>
        </div>
        <nav className="flex-1 mt-6">
          {menuItems.map((item) => (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center p-5 cursor-pointer hover:bg-blue-600/30 transition-colors border-l-4 ${
                location.pathname === item.path
                  ? "border-blue-500 bg-blue-900/20 text-blue-400"
                  : "border-transparent text-gray-400"
              }`}
            >
              <item.icon size={24} />
              {isOpen && (
                <span className="ml-5 text-base font-bold whitespace-nowrap opacity-100 transition-opacity duration-300">
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-20 bg-[#1e293b] border-b border-gray-700 flex items-center justify-between px-8 shadow-md z-10 shrink-0">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-black tracking-wider text-white">
              AI INSPECTION SYSTEM
            </h1>
          </div>

          {/* 공정 정보 표시 영역 */}
          <div className="flex items-center gap-8 font-mono">
            {/* 카메라 선택 Select Box */}
            <div className="flex flex-col items-end">
              <span className="text-gray-400 text-xs uppercase mb-1">
                Camera
              </span>
              <select
                value={selectedCamera}
                onChange={(e) => setSelectedCamera(e.target.value)}
                className="bg-gray-900 border border-gray-600 text-blue-400 text-base font-bold rounded px-2 py-0.5 outline-none focus:border-blue-500 hover:bg-gray-800 transition-colors cursor-pointer appearance-none text-right"
                style={{ textAlignLast: "right" }}
              >
                <option value="CAM-01">CAM-01 (Line A)</option>
                <option value="CAM-02">CAM-02 (Line B)</option>
                <option value="CAM-03">CAM-03 (Line C)</option>
              </select>
            </div>

            <div className="w-px h-10 bg-gray-700"></div>
            <div className="flex flex-col items-end">
              <span className="text-gray-400 text-xs uppercase mb-1">
                Model
              </span>
              <span className="font-bold text-yellow-500 text-base">
                v1.4.2
              </span>
            </div>

            <div className="w-px h-10 bg-gray-700"></div>
            <div className="flex flex-col items-end">
              <span className="text-gray-400 text-xs uppercase mb-1">Date</span>
              <span className="font-bold text-gray-200 text-base">
                {currentDate}
              </span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8 bg-[#0f172a]">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
