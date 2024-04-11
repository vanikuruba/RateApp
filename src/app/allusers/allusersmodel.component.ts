// user.model.ts
export interface User {
    userId: number;
    fullName: string;
    email: string;
    password: string;
    loggedIn: boolean;
    fileName: string;
    image: string[]; // Assuming image is an array of strings
    createdOn: string;
    createdBy: string;
    modifiedOn: string;
    modifiedBy: string;
    roles: {
      roleId: number;
      roleName: string;
    };
    lanid: string;
  }
  