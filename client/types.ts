export interface Streak {
  id: number;
  currentStreak: number
}

export interface HabitType {
  id: number;
  userId: string;
  name: string;
  description?: string;
  goalStreak: number;
  reminder: boolean;
  streak?: Streak | null;
}
export interface CheckInType {
  id: number;
  habitId: number;
  date: string;
}