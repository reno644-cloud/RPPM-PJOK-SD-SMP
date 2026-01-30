export interface PedagogicalPractice {
  meetingNumber: number;
  method: string;
}

export interface FormData {
  schoolName: string;
  teacherName: string;
  teacherNip: string;
  principalName: string;
  principalNip: string;
  level: 'SD' | 'SMP' | 'SMA';
  grade: string;
  semester: string;
  subject: string;
  learningOutcomes: string; // CP
  learningObjectives: string; // TP
  material: string;
  meetingCount: number;
  duration: string;
  pedagogicalPractices: PedagogicalPractice[];
  graduateDimensions: string[];
}

export enum PedagogicalMethod {
  InquiryDiscovery = 'Inkuiri-Discovery Learning',
  PjBL = 'Project Based Learning (PjBL)',
  ProblemSolving = 'Problem Based Learning / Problem Solving',
  GameBased = 'Game Based Learning',
  StationLearning = 'Station Learning',
}

export const GRADUATE_DIMENSIONS = [
  'Keimanan & Ketakwaan',
  'Kewargaan',
  'Penalaran Kritis',
  'Kreativitas',
  'Kolaborasi',
  'Kemandirian',
  'Kesehatan',
  'Komunikasi',
];

export const PEDAGOGICAL_OPTIONS = Object.values(PedagogicalMethod);