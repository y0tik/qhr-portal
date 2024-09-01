export type SessionUser = {
  uname: string;
  email: string;
  role: Role;
  id: string;
  cid: string;
};
export interface MenuItem {
  to: string;
  name: string;
}
export type Role = "admin" | "hr" | "employee" | "support";

export type EntityUser = {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  last_login_at: string;
  role: Role;
};

export type EntityAlumni = {
  id: number;
  username: string;
  emp_id: string;
  email: string;
  created_at: string;
  updated_at: string;
  last_login_at: string;
  fileCount: number;
  requestCount: number;
  last_working_date: string;
  joining_date: string;
};

export type EntityJob = {
  id: string;
  created_by_id: string;
  created_by_name: string;
  created_on: string;
  updated_on: string;
  jobDescription: {
    title: string;
    shortDescription: string;
    description: string;
    tags: string[];
    area: string;
    department: string;
    salary: {
      min?: number;
      max?: number;
      currency?: string;
      show: boolean;
    };
    experience: string;
    skills: string;
    education: string;
  };
  expRequired: {
    blockId: string;
    type: "experience" | "skills" | "education";
    title: string;
    description?: string;
    experienceInYears?: number;
    required: boolean;
    goodToHave: boolean;
  }[];
  customQuestionPanel: {
    blockId: string;
    type: "text" | "number" | "select" | "multiSelect";
    title: string;
    description: string;
    constraint?: {
      required?: boolean;
      min?: number;
      max?: number;
    };
  }[];
  setting: {
    slug: string;
    sharable: boolean;
    jobStatus: "draft" | "published";
  };
  companyInfo: {
    company: string;
    location: string;
    wesbite?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
};
