import AddEmployee from "@/assets/svgs/undraw_add_employee.svg";
import Award from "@/assets/svgs/undraw_awards.svg";
import Certificate from "@/assets/svgs/undraw_certificate.svg";
import ClientManagement from "@/assets/svgs/undraw_client_management.svg";
import LeaveManagement from "@/assets/svgs/undraw_leave.svg";
import NoticeBoard from "@/assets/svgs/undraw_notice_board.svg";
import EmployeeOvertime from "@/assets/svgs/undraw_overtime.svg";
import Preferences from "@/assets/svgs/undraw_preferences.svg";
import SalaryStatement from "@/assets/svgs/undraw_salary.svg";
import TimeAttendance from "@/assets/svgs/undraw_time_attendance.svg";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { IListViewItem } from "../../interfaces";

export const dashboardBottomSection: IListViewItem[] = [
  {
    id: 1,
    svg: ClientManagement,
    title: "Client Management",
    faIcon: faChevronRight,
    color: "#3F51B5",
    link: "/clientManagement",
  },
  {
    id: 2,
    svg: Certificate,
    title: "NOC/Ex Certification",
    faIcon: faChevronRight,
    color: "#FFB74D",
    link: "#",
  },
  {
    id: 3,
    svg: NoticeBoard,
    title: "Notice",
    faIcon: faChevronRight,
    color: "#3F51B5",
    link: "#",
  },
  {
    id: 4,
    svg: Award,
    title: "Award",
    faIcon: faChevronRight,
    color: "#FFB74D",
    link: "#",
  },
];

export const employeeManagementItems: IListViewItem[] = [
  {
    id: 1,
    svg: AddEmployee,
    title: "Add Employee",
    faIcon: faChevronRight,
    color: "#3F51B5",
    link: "/viewEmployee",
  },
  {
    id: 2,
    svg: TimeAttendance,
    title: "Time Attendance",
    faIcon: faChevronRight,
    color: "#FFB74D",
    link: "/timeAttendance",
  },
  {
    id: 3,
    svg: LeaveManagement,
    title: "Leave Management",
    faIcon: faChevronRight,
    color: "#E57373",
    link: "/leaveManagement",
  },
  {
    id: 4,
    svg: EmployeeOvertime,
    title: "Employee Overtime",
    faIcon: faChevronRight,
    color: "#E57373",
    link: "#",
  },
  {
    id: 5,
    svg: SalaryStatement,
    title: "Salary Statement",
    faIcon: faChevronRight,
    color: "#81C784",
    link: "#",
  },
  {
    id: 6,
    svg: Preferences,
    title: "Preference",
    faIcon: faChevronRight,
    color: "#E57373",
    link: "#",
  },
];
