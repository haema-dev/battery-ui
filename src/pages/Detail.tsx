import { useState } from "react";
import {
  Search,
  ZoomIn,
  Download,
  UserCheck,
  CheckCircle2,
} from "lucide-react";

const Detail = () => {
  const [selectedId, setSelectedId] = useState("B12345");

  const defectItems = [
    { id: "B12345", type: "Scratch", status: "critical" },
    { id: "B67890", type: "Dimension", status: "minor" },
    { id: "B34567", type: "Dent", status: "critical" },
    { id: "B89012", type: "Pollution", status: "minor" },
  ];

  return (
    <div className="flex flex-col h-full gap-8 text-white font-sans">
      {/* 상단 통계 바 */}
      <div className="flex justify-center gap-6">
        <SummaryCard label="Critical Defects" count={23} color="bg-red-500" />
        <SummaryCard label="Minor Issues" count={8} color="bg-yellow-500" />
        <SummaryCard label="Good Products" count={145} color="bg-blue-500" />
      </div>

      {/* 메인 작업 영역 */}
      <div className="grid grid-cols-12 gap-8 flex-1 min-h-0">
        {/* 좌측: 불량 제품 정보 (리스트) */}
        <div className="col-span-3 bg-[#1e293b] rounded-xl border border-gray-700 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-base font-bold uppercase tracking-wider mb-4">
              불량 리스트
            </h3>
            <select className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm outline-none font-bold">
              <option>Battery ID</option>
              <option>Date</option>
            </select>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {defectItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedId === item.id
                    ? "bg-blue-600 border-white"
                    : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                }`}
              >
                <div className="flex justify-between items-center text-sm">
                  <div className="space-y-1">
                    <p className="font-bold text-base">ID: {item.id}</p>
                    <p className="text-gray-300">Type: {item.type}</p>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full shadow-lg ${item.status === "critical" ? "bg-red-500" : "bg-yellow-500"}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 중앙: 불량 이미지 확인 영역 */}
        <div className="col-span-5 bg-[#1e293b] rounded-xl border border-gray-700 flex flex-col p-6 relative">
          <h3 className="text-base font-bold uppercase tracking-wider mb-4 flex items-center gap-3">
            <Search size={20} /> 불량 이미지
          </h3>
          <div className="flex-1 bg-black rounded-xl border border-gray-800 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center text-gray-700 text-sm font-bold tracking-widest">
              PHOTO AREA (BATTERY: {selectedId})
            </div>

            <div className="w-32 h-32 border-4 border-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_30px_rgba(239,68,68,0.5)]"></div>

            <div className="absolute bottom-6 right-6 flex gap-3">
              <button className="bg-gray-800/80 p-3 rounded-lg hover:bg-gray-700 text-white">
                <ZoomIn size={20} />
              </button>
              <button className="bg-gray-800/80 p-3 rounded-lg hover:bg-gray-700 text-white">
                <Download size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* 우측: LLM 분석 및 판단 기준 */}
        <div className="col-span-4 flex flex-col gap-6">
          <div className="flex-1 bg-[#1e293b] rounded-xl border border-gray-700 p-6 flex flex-col">
            <h3 className="text-base font-bold uppercase tracking-wider mb-4 flex items-center gap-2 text-blue-400">
              LLM 분석 결과
            </h3>
            <div className="bg-gray-900/50 p-6 rounded-xl text-sm leading-relaxed border border-gray-800 flex-1">
              <p className="font-bold text-blue-300 mb-3 text-base">
                [분석 시작]
              </p>
              <p className="text-gray-200 mb-4">
                배터리{" "}
                <span className="font-bold text-white">{selectedId}</span>{" "}
                케이스 상단에서 0.5mm 깊이의 긁힘이 감지되었습니다. 이는 생산
                공정 중 충격에 의한 것으로 추정됩니다.
              </p>
              <p className="text-red-400 font-bold text-base mt-4">
                ▶ 품질 기준 미달 (불량 판정)
              </p>
            </div>
          </div>

          <div className="bg-[#1e293b] rounded-xl border border-gray-700 p-6">
            <div className="space-y-4 mb-6">
              <h3 className="text-sm font-bold text-gray-400 uppercase">
                판단 기준
              </h3>
              <ul className="text-sm text-gray-300 space-y-2 bg-gray-900/50 p-4 rounded-lg">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>{" "}
                  표면 손상: 길이 0.3mm 이상 불가
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>{" "}
                  깊이: 0.2mm 이상 불가
                </li>
              </ul>
            </div>
            <div className="flex gap-4">
              <button className="flex-1 bg-gray-700 hover:bg-gray-600 py-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                <UserCheck size={18} /> 수동 검토
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-500 py-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                <CheckCircle2 size={18} /> 조치 완료
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ label, count, color }: any) => (
  <div className="flex flex-col items-center min-w-[180px] bg-[#1e293b] p-4 rounded-xl border border-gray-700 shadow-md">
    <div
      className={`w-14 h-14 ${color} rounded-full flex items-center justify-center text-xl font-black mb-3 shadow-lg`}
    >
      {count}
    </div>
    <span className="text-sm text-gray-400 font-bold uppercase tracking-wider">
      {label}
    </span>
  </div>
);

export default Detail;
