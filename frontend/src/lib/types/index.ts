export interface Task {
  _id: string;
  name: string;
  status: "completed" | "inprogress" | "pending";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Project {
  _id: string;
  name: string;
  user: string;
  description: string;
  status: "completed" | "not completed";
  tasks: Task[] | string[];
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  projects: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User
}

export interface ProjectResponse {
  success: boolean;
  message: string;
  project?: Project;
  projects?: Project[];
  tasks?: Task[];
  error?: string;
}

export interface TaskResponse {
  success: boolean;
  message: string;
  task?: Task;
  tasks?: Task[];
  error?: string;
}