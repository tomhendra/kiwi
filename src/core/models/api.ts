/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateProjectInput = {
  id?: string | null,
  title: string,
  description: string,
  startAt: string,
  endAt: string,
  createdAt?: string | null,
};

export type ModelProjectConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  startAt?: ModelStringInput | null,
  endAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelProjectConditionInput | null > | null,
  or?: Array< ModelProjectConditionInput | null > | null,
  not?: ModelProjectConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Project = {
  __typename: "Project",
  id?: string,
  title?: string,
  description?: string,
  startAt?: string,
  endAt?: string,
  tasks?: ModelTaskConnection,
  createdAt?: string | null,
  updatedAt?: string,
  owner?: string | null,
};

export type ModelTaskConnection = {
  __typename: "ModelTaskConnection",
  items?:  Array<Task | null > | null,
  nextToken?: string | null,
};

export type Task = {
  __typename: "Task",
  id?: string,
  title?: string,
  description?: string | null,
  projectID?: string,
  project?: Project,
  createdAt?: string | null,
  updatedAt?: string,
  owner?: string | null,
};

export type UpdateProjectInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  startAt?: string | null,
  endAt?: string | null,
  createdAt?: string | null,
};

export type DeleteProjectInput = {
  id?: string | null,
};

export type CreateTaskInput = {
  id?: string | null,
  title: string,
  description?: string | null,
  projectID: string,
  createdAt?: string | null,
};

export type ModelTaskConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  projectID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelTaskConditionInput | null > | null,
  or?: Array< ModelTaskConditionInput | null > | null,
  not?: ModelTaskConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateTaskInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  projectID?: string | null,
  createdAt?: string | null,
};

export type DeleteTaskInput = {
  id?: string | null,
};

export type ModelProjectFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  startAt?: ModelStringInput | null,
  endAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelProjectFilterInput | null > | null,
  or?: Array< ModelProjectFilterInput | null > | null,
  not?: ModelProjectFilterInput | null,
};

export type ModelProjectConnection = {
  __typename: "ModelProjectConnection",
  items?:  Array<Project | null > | null,
  nextToken?: string | null,
};

export type ModelTaskFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  projectID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelTaskFilterInput | null > | null,
  or?: Array< ModelTaskFilterInput | null > | null,
  not?: ModelTaskFilterInput | null,
};

export type CreateProjectMutationVariables = {
  input?: CreateProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type CreateProjectMutation = {
  createProject?:  {
    __typename: "Project",
    id: string,
    title: string,
    description: string,
    startAt: string,
    endAt: string,
    tasks?:  {
      __typename: "ModelTaskConnection",
      items?:  Array< {
        __typename: "Task",
        id: string,
        title: string,
        description?: string | null,
        projectID: string,
        createdAt?: string | null,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateProjectMutationVariables = {
  input?: UpdateProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type UpdateProjectMutation = {
  updateProject?:  {
    __typename: "Project",
    id: string,
    title: string,
    description: string,
    startAt: string,
    endAt: string,
    tasks?:  {
      __typename: "ModelTaskConnection",
      items?:  Array< {
        __typename: "Task",
        id: string,
        title: string,
        description?: string | null,
        projectID: string,
        createdAt?: string | null,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteProjectMutationVariables = {
  input?: DeleteProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type DeleteProjectMutation = {
  deleteProject?:  {
    __typename: "Project",
    id: string,
    title: string,
    description: string,
    startAt: string,
    endAt: string,
    tasks?:  {
      __typename: "ModelTaskConnection",
      items?:  Array< {
        __typename: "Task",
        id: string,
        title: string,
        description?: string | null,
        projectID: string,
        createdAt?: string | null,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateTaskMutationVariables = {
  input?: CreateTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type CreateTaskMutation = {
  createTask?:  {
    __typename: "Task",
    id: string,
    title: string,
    description?: string | null,
    projectID: string,
    project?:  {
      __typename: "Project",
      id: string,
      title: string,
      description: string,
      startAt: string,
      endAt: string,
      tasks?:  {
        __typename: "ModelTaskConnection",
        nextToken?: string | null,
      } | null,
      createdAt?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateTaskMutationVariables = {
  input?: UpdateTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type UpdateTaskMutation = {
  updateTask?:  {
    __typename: "Task",
    id: string,
    title: string,
    description?: string | null,
    projectID: string,
    project?:  {
      __typename: "Project",
      id: string,
      title: string,
      description: string,
      startAt: string,
      endAt: string,
      tasks?:  {
        __typename: "ModelTaskConnection",
        nextToken?: string | null,
      } | null,
      createdAt?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteTaskMutationVariables = {
  input?: DeleteTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type DeleteTaskMutation = {
  deleteTask?:  {
    __typename: "Task",
    id: string,
    title: string,
    description?: string | null,
    projectID: string,
    project?:  {
      __typename: "Project",
      id: string,
      title: string,
      description: string,
      startAt: string,
      endAt: string,
      tasks?:  {
        __typename: "ModelTaskConnection",
        nextToken?: string | null,
      } | null,
      createdAt?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetProjectQueryVariables = {
  id?: string,
};

export type GetProjectQuery = {
  getProject?:  {
    __typename: "Project",
    id: string,
    title: string,
    description: string,
    startAt: string,
    endAt: string,
    tasks?:  {
      __typename: "ModelTaskConnection",
      items?:  Array< {
        __typename: "Task",
        id: string,
        title: string,
        description?: string | null,
        projectID: string,
        createdAt?: string | null,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListProjectsQueryVariables = {
  filter?: ModelProjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProjectsQuery = {
  listProjects?:  {
    __typename: "ModelProjectConnection",
    items?:  Array< {
      __typename: "Project",
      id: string,
      title: string,
      description: string,
      startAt: string,
      endAt: string,
      tasks?:  {
        __typename: "ModelTaskConnection",
        nextToken?: string | null,
      } | null,
      createdAt?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetTaskQueryVariables = {
  id?: string,
};

export type GetTaskQuery = {
  getTask?:  {
    __typename: "Task",
    id: string,
    title: string,
    description?: string | null,
    projectID: string,
    project?:  {
      __typename: "Project",
      id: string,
      title: string,
      description: string,
      startAt: string,
      endAt: string,
      tasks?:  {
        __typename: "ModelTaskConnection",
        nextToken?: string | null,
      } | null,
      createdAt?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListTasksQueryVariables = {
  filter?: ModelTaskFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTasksQuery = {
  listTasks?:  {
    __typename: "ModelTaskConnection",
    items?:  Array< {
      __typename: "Task",
      id: string,
      title: string,
      description?: string | null,
      projectID: string,
      project?:  {
        __typename: "Project",
        id: string,
        title: string,
        description: string,
        startAt: string,
        endAt: string,
        createdAt?: string | null,
        updatedAt: string,
        owner?: string | null,
      } | null,
      createdAt?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateProjectSubscriptionVariables = {
  owner?: string,
};

export type OnCreateProjectSubscription = {
  onCreateProject?:  {
    __typename: "Project",
    id: string,
    title: string,
    description: string,
    startAt: string,
    endAt: string,
    tasks?:  {
      __typename: "ModelTaskConnection",
      items?:  Array< {
        __typename: "Task",
        id: string,
        title: string,
        description?: string | null,
        projectID: string,
        createdAt?: string | null,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateProjectSubscriptionVariables = {
  owner?: string,
};

export type OnUpdateProjectSubscription = {
  onUpdateProject?:  {
    __typename: "Project",
    id: string,
    title: string,
    description: string,
    startAt: string,
    endAt: string,
    tasks?:  {
      __typename: "ModelTaskConnection",
      items?:  Array< {
        __typename: "Task",
        id: string,
        title: string,
        description?: string | null,
        projectID: string,
        createdAt?: string | null,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteProjectSubscriptionVariables = {
  owner?: string,
};

export type OnDeleteProjectSubscription = {
  onDeleteProject?:  {
    __typename: "Project",
    id: string,
    title: string,
    description: string,
    startAt: string,
    endAt: string,
    tasks?:  {
      __typename: "ModelTaskConnection",
      items?:  Array< {
        __typename: "Task",
        id: string,
        title: string,
        description?: string | null,
        projectID: string,
        createdAt?: string | null,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateTaskSubscriptionVariables = {
  owner?: string,
};

export type OnCreateTaskSubscription = {
  onCreateTask?:  {
    __typename: "Task",
    id: string,
    title: string,
    description?: string | null,
    projectID: string,
    project?:  {
      __typename: "Project",
      id: string,
      title: string,
      description: string,
      startAt: string,
      endAt: string,
      tasks?:  {
        __typename: "ModelTaskConnection",
        nextToken?: string | null,
      } | null,
      createdAt?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateTaskSubscriptionVariables = {
  owner?: string,
};

export type OnUpdateTaskSubscription = {
  onUpdateTask?:  {
    __typename: "Task",
    id: string,
    title: string,
    description?: string | null,
    projectID: string,
    project?:  {
      __typename: "Project",
      id: string,
      title: string,
      description: string,
      startAt: string,
      endAt: string,
      tasks?:  {
        __typename: "ModelTaskConnection",
        nextToken?: string | null,
      } | null,
      createdAt?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteTaskSubscriptionVariables = {
  owner?: string,
};

export type OnDeleteTaskSubscription = {
  onDeleteTask?:  {
    __typename: "Task",
    id: string,
    title: string,
    description?: string | null,
    projectID: string,
    project?:  {
      __typename: "Project",
      id: string,
      title: string,
      description: string,
      startAt: string,
      endAt: string,
      tasks?:  {
        __typename: "ModelTaskConnection",
        nextToken?: string | null,
      } | null,
      createdAt?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
