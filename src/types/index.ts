// src/types/index.ts
export type DefectStatus = "DEFECT" | "UNCERTAIN" | "NORMAL";

export interface BatteryInspection {
  id: string; // 배터리 고유 ID
  line: string; // 생산 라인 번호
  timestamp: string; // 검사 일시
  photoId: string; // 촬영 사진 ID
  defectType: string; // 결함 유형 (Scratch, Dent 등)
  status: DefectStatus; // 검사 상태 결과
  confidence: number; // AI 모델 신뢰도 (%)
  temp: number; // 공정 온도
  dew: number; // 이슬점 상태
}
