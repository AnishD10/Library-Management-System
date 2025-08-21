// export interface Employee {
//     profilePhoto: string;
//     joiningDate: number;
//     employeeId: string;
//     fullName: string;
//     mobileNumber: string;
//     designation: string;
//     workingDays: number[];
//     basicPay: string;
//     perDay: boolean;
//     gender: string;
//     department: string;
// }

import { IEmployeeForm } from "../../interfaces";

export const tempEmployeeListData: IEmployeeForm[] = [
  {
    profilePhoto: "https://randomuser.me/api/portraits/men/1.jpg",
    joiningDate: 1672531200000, // Jan 1, 2023
    employeeId: "EMP001",
    fullName: "John Doe",
    mobileNumber: "9876543210",
    designation: "Software Engineer",
    workingDays: [1, 2, 3, 4, 5],
    basicPay: "50000",
    perDay: false,
    gender: "Male",
    department: "Engineering",
  },
  {
    profilePhoto: "https://randomuser.me/api/portraits/women/2.jpg",
    joiningDate: 1675209600000, // Feb 1, 2023
    employeeId: "EMP002",
    fullName: "Jane Smith",
    mobileNumber: "9123456789",
    designation: "HR Manager",
    workingDays: [1, 2, 3, 4, 5],
    basicPay: "60000",
    perDay: false,
    gender: "Female",
    department: "Human Resources",
  },
  {
    profilePhoto: "https://randomuser.me/api/portraits/men/3.jpg",
    joiningDate: 1677628800000, // Mar 1, 2023
    employeeId: "EMP003",
    fullName: "Amit Kumar",
    mobileNumber: "9988776655",
    designation: "Accountant",
    workingDays: [1, 2, 3, 4, 5, 6],
    basicPay: "40000",
    perDay: true,
    gender: "Male",
    department: "Finance",
  },
  {
    profilePhoto: "https://randomuser.me/api/portraits/women/4.jpg",
    joiningDate: 1680307200000, // Apr 1, 2023
    employeeId: "EMP004",
    fullName: "Priya Singh",
    mobileNumber: "9876501234",
    designation: "UI/UX Designer",
    workingDays: [1, 2, 3, 4, 5],
    basicPay: "45000",
    perDay: false,
    gender: "Female",
    department: "Design",
  },
  {
    profilePhoto: "https://randomuser.me/api/portraits/men/5.jpg",
    joiningDate: 1682899200000, // May 1, 2023
    employeeId: "EMP005",
    fullName: "Rahul Sharma",
    mobileNumber: "9123409876",
    designation: "Marketing Lead",
    workingDays: [1, 2, 3, 4, 5],
    basicPay: "55000",
    perDay: false,
    gender: "Male",
    department: "Marketing",
  },
];
