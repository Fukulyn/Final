
export interface Student {
  _id?: string;
  id: string; // 編號
  name: string; // 名稱
  attribute: string; // 屬性
  workCompatibility: string; // 工作適配性，逗號分隔的字串
  image: string; // 圖片 URL
}