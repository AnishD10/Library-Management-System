import EmployeeMgmtSvg from "@/assets/svgs/undraw_employee_management.svg";
import ExpenseMgmtSvg from "@/assets/svgs/undraw_expense_management.svg";
import FileMgmtSvg from "@/assets/svgs/undraw_file_management.svg";
import PayrollMgmtSvg from "@/assets/svgs/undraw_payroll_management.svg";
import {
  faIdBadge,
  faInfoCircle,
  faLock,
  faMugHot,
  faPeopleLine,
  faRightFromBracket,
  faWarning,
} from "@fortawesome/free-solid-svg-icons/";
import { faGear } from "@fortawesome/free-solid-svg-icons/faGear";
import { IDashboardSidebar, IDashboardTopSection } from "../../interfaces";

export const dashboardTopSection: IDashboardTopSection[] = [
  {
    id: 1,
    title1: "Employee",
    title2: "Management",
    svg: EmployeeMgmtSvg,
    link: "/employeeManagement",
    color: "#3F51B5",
  },
  {
    id: 2,
    title1: "Expense",
    title2: "Management",
    svg: ExpenseMgmtSvg,
    link: "#",
    color: "#81C784",
  },
  {
    id: 3,
    title1: "Payroll",
    title2: "Management",
    svg: PayrollMgmtSvg,
    link: "#",
    color: "#81C784",
  },
  {
    id: 4,
    title1: "File",
    title2: "Management",
    svg: FileMgmtSvg,
    link: "#",
    color: "#81C784",
  },
];

export const dashboardSidebar: IDashboardSidebar[] = [
  {
    id: 1,
    title: "Setting",
    faIcon: faGear,
    link: "#",
  },
  {
    id: 2,
    title: "Premium Version",
    faIcon: faIdBadge,
    link: "#",
  },
  {
    id: 3,
    title: "Holiday",
    faIcon: faMugHot,
    link: "/leaveManagement",
  },
  {
    id: 4,
    title: "App Lock",
    faIcon: faLock,
    link: "#",
  },
  {
    id: 5,
    title: "Share with Friends",
    faIcon: faPeopleLine,
    link: "#",
  },
  {
    id: 6,
    title: "Terms of Services",
    faIcon: faInfoCircle,
    link: "#",
  },
  {
    id: 7,
    title: "Privacy Policy",
    faIcon: faWarning,
    link: "#",
  },
  {
    id: 8,
    title: "Log Out",
    faIcon: faRightFromBracket,
    link: "#",
  },
];
