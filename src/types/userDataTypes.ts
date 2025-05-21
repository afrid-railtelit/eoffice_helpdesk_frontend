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
  role:"EMPLOYEE" | "ADMIN"
};
