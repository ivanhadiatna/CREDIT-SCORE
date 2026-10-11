import { Borrower, User } from '../types';

export const INITIAL_USERS: (User & { passwordHash: string })[] = [
  { username: 'user1', passwordHash: 'pass1', name: 'Ivan Hadiatna (Analyst)', role: 'advanced' },
  { username: 'user2', passwordHash: 'pass2', name: 'Petugas Kredit (Officer)', role: 'basic' },
];

export const INITIAL_DEBITUR: Borrower[] = [
  {
    id: 'CNS-1',
    nama: 'Budi Santoso',
    age: 34,
    dependents: 1,
    income: 16.5,
    empyear: 5,
    debt: 0.04,
    tenor: 24,
    asset: 420.0,
    riskrating: '1',
    tanggal: '2023-01-15 09:30:00'
  },
  {
    id: 'CNS-2',
    nama: 'Siti Rahmawati',
    age: 29,
    dependents: 0,
    income: 14.2,
    empyear: 3,
    debt: 0.08,
    tenor: 18,
    asset: 280.5,
    riskrating: '2',
    tanggal: '2023-02-10 11:15:00'
  },
  {
    id: 'CNS-3',
    nama: 'Ahmad Fauzi',
    age: 42,
    dependents: 3,
    income: 18.0,
    empyear: 7,
    debt: 1.25,
    tenor: 36,
    asset: 650.0,
    riskrating: '3',
    tanggal: '2023-03-05 14:00:00'
  },
  {
    id: 'CNS-4',
    nama: 'Dewi Lestari',
    age: 48,
    dependents: 5,
    income: 25.5,
    empyear: 12,
    debt: 3.5,
    tenor: 24,
    asset: 780.0,
    riskrating: '4',
    tanggal: '2023-04-12 10:45:00'
  },
  {
    id: 'CNS-5',
    nama: 'Hendra Gunawan',
    age: 38,
    dependents: 5,
    income: 15.0,
    empyear: 2,
    debt: 8.5,
    tenor: 36,
    asset: 320.0,
    riskrating: '5',
    tanggal: '2023-05-18 16:20:00'
  },
  {
    id: 'CNS-6',
    nama: 'Rina Marlina',
    age: 26,
    dependents: 2,
    income: 11.0,
    empyear: 4,
    debt: 0.03,
    tenor: 12,
    asset: 190.0,
    riskrating: '1',
    tanggal: '2023-06-22 08:30:00'
  },
  {
    id: 'CNS-7',
    nama: 'Eko Prasetyo',
    age: 35,
    dependents: 4,
    income: 22.0,
    empyear: 6,
    debt: 2.1,
    tenor: 48,
    asset: 550.0,
    riskrating: '3',
    tanggal: '2023-07-09 13:10:00'
  },
  {
    id: 'CNS-8',
    nama: 'Nurul Hidayah',
    age: 31,
    dependents: 1,
    income: 8.5,
    empyear: 1,
    debt: 0.12,
    tenor: 12,
    asset: 140.0,
    riskrating: '2',
    tanggal: '2023-08-14 15:00:00'
  }
];

const STORAGE_KEY = 'credit_scoring_debitur_v1';

export function getStoredDebitur(): Borrower[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed reading from localStorage', err);
  }
  return INITIAL_DEBITUR;
}

export function saveStoredDebitur(data: Borrower[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn('Failed saving to localStorage', err);
  }
}
