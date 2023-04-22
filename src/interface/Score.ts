import { ReactNode } from "react";

export default interface Score {
  title: string;
  time: number;
  count: number;
  userId: string;
  username: string;
  public: boolean;
  created_at: ReactNode;
}
