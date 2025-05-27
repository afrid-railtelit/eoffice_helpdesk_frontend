interface employeeDataType {
  employeeName: string;
  employeeMobile: string;
  employeeCode: string;
  employeeDateOfBirth: string; // ISO date string
  employeeEmail: string;
}

interface issueDataType {
  issueCode: string;
  issueDescription: string;
  issueId: string;
}
export type ticketRemarkDataType = {
  id: string;
  remark: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  createdBy: string;
  ticketId: string;
};

export interface ticketDataType {
  ticketId: string; // UUID string
  ticketNumber: string; // typo preserved from your example ("tikcetNumber")
  employeeData: employeeDataType;
  issueData: issueDataType;
  createdBy: string; // email string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  ticketStatus: string;
  resolvedBy: string | null;
  criticalLevel: string;
  remarks: ticketRemarkDataType[];
}
