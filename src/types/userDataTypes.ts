export type UserDataType = {
  id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  mobileNumber: string;
  initialLogin: boolean;
  disabled: boolean;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  role: "EMPLOYEE" | "ADMIN";
  name?: string;
  level:number
};

export type divisionDataType = {
  divisionCode: string;
  divisionName: string;
};

export type zoneDataType = {
  zoneCode: string;
  zoneName: string;
  zoneDescription: string;
  divisions: divisionDataType[];
  id:string
};

export type lastLoginType = {
  emailId: string
  osName: string;
  browserName: string;
  osVersion: string;
  deviceType: string;
  ip: string;
  updatedAt:string
};
