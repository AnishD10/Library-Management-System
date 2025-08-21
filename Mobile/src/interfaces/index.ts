import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { RelativePathString } from "expo-router";
import { ReactNode } from "react";
import { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";

export interface IFC {
  children: ReactNode;
}

export interface IWelcomeScreenData {
  id: number;
  bgImg: ImageSourcePropType;
  title1: string;
  title2: string;
  description: string;
}

export interface IAuthContextInterface {
  isLoading: boolean;
  isAuthenticated: boolean;
  showSplash: boolean;
  handleSplashDone: () => void;
  checkAuth: () => void;
}

type SvgInHtml = HTMLElement & SVGElement;
export interface IListViewItem {
  id: number;
  svg: SvgInHtml;
  title: string;
  faIcon: IconProp;
  color: string;
  link: RelativePathString;
}

export interface IDashboardTopSection {
  id: number;
  title1: string;
  title2: string;
  svg: SvgInHtml;
  link: RelativePathString;
  color: string;
}

export interface IDashboardSidebar {
  id: number;
  title: string;
  faIcon: IconProp;
  link: RelativePathString;
}

export interface IAppMainLayoutProps {
  topSection: ReactNode;
  bottomSection: ReactNode;
}

export interface ICommonHeaderItem {
  link: RelativePathString;
  title: string;
  desc?: string;
}

export interface ISoraTouchableHighlightsProps {
  children: ReactNode;
  onPress?: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export interface IRNSelectItem {
  key?: string;
  label: string | number;
  value: string | number;
}

export interface IEmployeeForm {
  profilePhoto: ImageSourcePropType | null;
  joiningDate: number; //this is jugad fix
  employeeId: string;
  fullName: string;
  mobileNumber: string;
  designation: string;
  workingDays: number[];
  basicPay: string;
  perDay: boolean;
  gender: string;
  department: string;
}

export interface ISignInForm {
  username: string;
  password: string;
  saveMe: boolean;
}

export interface ISignUpForm {
  username: string;
  email: string;
  mobileNo: string;
  password: string;
  confirmPassword: string;
}

export interface IAttendanceRequest {
  id: number;
  employeeId: string;
  reason: string;
  date: string; // Format: YYYY-MM-DD
  inTime: string; // Format: HH:mm:ss
  outTime: string; // Format: HH:mm:ss
  employeeName: string;
  designation: string;
  image: string;
}

export interface ILeaveRequest {
  id: number;
  employeeId: string;
  reason: string;
  dateFrom: string;
  dateTo: string;
  employeeName: string;
  designation: string;
  image: string;
  type: string;
  duration: string;
}

export interface IUserData {
  currentUser: {
    profilePicture: string;
    employeeId: string;
    name: string;
    role: string;
    token: string;
  };
  status: string;
}
