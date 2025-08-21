import Img2 from "@/assets/images/undraw_analytics.png";
import Img3 from "@/assets/images/undraw_folder-files.png";
import Img1 from "@/assets/images/undraw_work-time.png";
import { IWelcomeScreenData } from "../../interfaces";

export const welcomeScreenData: IWelcomeScreenData[] = [
  {
    id: 1,
    bgImg: Img1,
    title1: "Keep healthy",
    title2: "work-life balance",
    description:
      "Manage your time efficiently and maintain a healthy balance between your work and personal life.",
  },
  {
    id: 2,
    bgImg: Img2,
    title1: "Track your",
    title2: "performance",
    description:
      "Monitor your progress and analyze your work trends to achieve your professional goals.",
  },
  {
    id: 3,
    bgImg: Img3,
    title1: "Stay organized",
    title2: "and productive",
    description:
      "Plan your tasks and set reminders to stay on top of your responsibilities every day.",
  },
];
