export interface Borrower {
  id: string;
  nama: string;
  age: number;
  dependents: number;
  income: number;
  empyear: number;
  debt: number;
  tenor: number;
  asset: number;
  riskrating: string;
  tanggal: string;
}

export interface User {
  username: string;
  name: string;
  role: 'basic' | 'advanced';
}

export interface PredictionFeatures {
  income: number;
  tenor: number;
  dependents: number;
  age: number;
  empyear: number;
  debt: number;
  asset: number;
}

export interface PredictionResult {
  riskRating: number;
  riskCode: string;
  ratingLabel: string;
  riskCategory: 'Sangat Rendah' | 'Rendah' | 'Sedang' | 'Tinggi' | 'Sangat Tinggi';
  colorBadge: string;
  borderBadge: string;
  textBadge: string;
  decisionRule: string[];
}
