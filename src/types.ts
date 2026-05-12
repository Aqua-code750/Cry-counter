export enum Intensity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  MAX = 'MAX',
}

export interface ActivityEvent {
  id: string;
  type: 'ADD' | 'REMOVE' | 'ACHIEVEMENT';
  timestamp: number;
  message: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  threshold: number;
  unlockedAt?: number;
  icon: string;
}

export interface PRRecord {
  count: number;
  date: number;
  title: string;
}

export interface AppState {
  count: number;
  activities: ActivityEvent[];
  achievements: Achievement[];
  pr?: PRRecord;
  records: PRRecord[];
  settings: {
    particles: boolean;
    animations: boolean;
    glowIntensity: number;
    motionIntensity: number;
    performanceMode: 'ultra' | 'balanced' | 'eco';
  };
}
