export const auth = {
  SIGNUP_API: "/auth/signup",
  LOGIN_API: "/auth/login",
  LOGOUT_API: "/auth/logout",
};

export const project = {
  CREATE_PROJECT: "/project/new-project",
  UPDATE_PROJECT: "/project/update-project",
  DELETE_PROJECT: (id: string) => `/project/delete-project/${id}`,
  GET_PROJECT: (id: string) => `/project/get-project/${id}`,
  GET_ALL_PROJECTS: "/project/get-all-projects",
};

export const task = {
  CREATE_TASK: "/task/create-task",
  UPDATE_TASK: "/task/update-task",
  DELETE_TASK: (projectId: string) =>(`/task/${projectId}/delete-task`),
  GET_ALL_TASKS: (projectId: string) => `/task/get-all-tasks?projectId=${projectId}`,
};
