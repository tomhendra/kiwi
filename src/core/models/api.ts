/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateProjectInput = {
  id?: string | null,
  title: string,
  description: string,
  startAt: number,
  endAt: number,
};

export type ModelProjectConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  startAt?: ModelIntInput | null,
  endAt?: ModelIntInput | null,
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

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Project = {
  __typename: "Project",
  id?: string,
  title?: string,
  description?: string,
  startAt?: number,
  endAt?: number,
  items?: ModelItemConnection,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelItemConnection = {
  __typename: "ModelItemConnection",
  items?:  Array<Item | null > | null,
  nextToken?: string | null,
};

export type Item = {
  __typename: "Item",
  id?: string,
  title?: string,
  description?: string | null,
  doDate?: number,
  priority?: string,
  status?: string,
  estimate?: string | null,
  projectID?: string,
  project?: Project,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateProjectInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  startAt?: number | null,
  endAt?: number | null,
};

export type DeleteProjectInput = {
  id?: string | null,
};

export type CreateItemInput = {
  id?: string | null,
  title: string,
  description?: string | null,
  doDate: number,
  priority: string,
  status: string,
  estimate?: string | null,
  projectID: string,
};

export type ModelItemConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  doDate?: ModelIntInput | null,
  priority?: ModelStringInput | null,
  status?: ModelStringInput | null,
  estimate?: ModelStringInput | null,
  projectID?: ModelIDInput | null,
  and?: Array< ModelItemConditionInput | null > | null,
  or?: Array< ModelItemConditionInput | null > | null,
  not?: ModelItemConditionInput | null,
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

export type UpdateItemInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  doDate?: number | null,
  priority?: string | null,
  status?: string | null,
  estimate?: string | null,
  projectID?: string | null,
};

export type DeleteItemInput = {
  id?: string | null,
};

export type ModelProjectFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  startAt?: ModelIntInput | null,
  endAt?: ModelIntInput | null,
  and?: Array< ModelProjectFilterInput | null > | null,
  or?: Array< ModelProjectFilterInput | null > | null,
  not?: ModelProjectFilterInput | null,
};

export type ModelProjectConnection = {
  __typename: "ModelProjectConnection",
  items?:  Array<Project | null > | null,
  nextToken?: string | null,
};

export type ModelItemFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  doDate?: ModelIntInput | null,
  priority?: ModelStringInput | null,
  status?: ModelStringInput | null,
  estimate?: ModelStringInput | null,
  projectID?: ModelIDInput | null,
  and?: Array< ModelItemFilterInput | null > | null,
  or?: Array< ModelItemFilterInput | null > | null,
  not?: ModelItemFilterInput | null,
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
    startAt: number,
    endAt: number,
    items?:  {
      __typename: "ModelItemConnection",
      items?:  Array< {
        __typename: "Item",
        id: string,
        title: string,
        description?: string | null,
        doDate: number,
        priority: string,
        status: string,
        estimate?: string | null,
        projectID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    startAt: number,
    endAt: number,
    items?:  {
      __typename: "ModelItemConnection",
      items?:  Array< {
        __typename: "Item",
        id: string,
        title: string,
        description?: string | null,
        doDate: number,
        priority: string,
        status: string,
        estimate?: string | null,
        projectID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    startAt: number,
    endAt: number,
    items?:  {
      __typename: "ModelItemConnection",
      items?:  Array< {
        __typename: "Item",
        id: string,
        title: string,
        description?: string | null,
        doDate: number,
        priority: string,
        status: string,
        estimate?: string | null,
        projectID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateItemMutationVariables = {
  input?: CreateItemInput,
  condition?: ModelItemConditionInput | null,
};

export type CreateItemMutation = {
  createItem?:  {
    __typename: "Item",
    id: string,
    title: string,
    description?: string | null,
    doDate: number,
    priority: string,
    status: string,
    estimate?: string | null,
    projectID: string,
    project?:  {
      __typename: "Project",
      id: string,
      title: string,
      description: string,
      startAt: number,
      endAt: number,
      items?:  {
        __typename: "ModelItemConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateItemMutationVariables = {
  input?: UpdateItemInput,
  condition?: ModelItemConditionInput | null,
};

export type UpdateItemMutation = {
  updateItem?:  {
    __typename: "Item",
    id: string,
    title: string,
    description?: string | null,
    doDate: number,
    priority: string,
    status: string,
    estimate?: string | null,
    projectID: string,
    project?:  {
      __typename: "Project",
      id: string,
      title: string,
      description: string,
      startAt: number,
      endAt: number,
      items?:  {
        __typename: "ModelItemConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteItemMutationVariables = {
  input?: DeleteItemInput,
  condition?: ModelItemConditionInput | null,
};

export type DeleteItemMutation = {
  deleteItem?:  {
    __typename: "Item",
    id: string,
    title: string,
    description?: string | null,
    doDate: number,
    priority: string,
    status: string,
    estimate?: string | null,
    projectID: string,
    project?:  {
      __typename: "Project",
      id: string,
      title: string,
      description: string,
      startAt: number,
      endAt: number,
      items?:  {
        __typename: "ModelItemConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    startAt: number,
    endAt: number,
    items?:  {
      __typename: "ModelItemConnection",
      items?:  Array< {
        __typename: "Item",
        id: string,
        title: string,
        description?: string | null,
        doDate: number,
        priority: string,
        status: string,
        estimate?: string | null,
        projectID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
      startAt: number,
      endAt: number,
      items?:  {
        __typename: "ModelItemConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetItemQueryVariables = {
  id?: string,
};

export type GetItemQuery = {
  getItem?:  {
    __typename: "Item",
    id: string,
    title: string,
    description?: string | null,
    doDate: number,
    priority: string,
    status: string,
    estimate?: string | null,
    projectID: string,
    project?:  {
      __typename: "Project",
      id: string,
      title: string,
      description: string,
      startAt: number,
      endAt: number,
      items?:  {
        __typename: "ModelItemConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListItemsQueryVariables = {
  filter?: ModelItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListItemsQuery = {
  listItems?:  {
    __typename: "ModelItemConnection",
    items?:  Array< {
      __typename: "Item",
      id: string,
      title: string,
      description?: string | null,
      doDate: number,
      priority: string,
      status: string,
      estimate?: string | null,
      projectID: string,
      project?:  {
        __typename: "Project",
        id: string,
        title: string,
        description: string,
        startAt: number,
        endAt: number,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateProjectSubscription = {
  onCreateProject?:  {
    __typename: "Project",
    id: string,
    title: string,
    description: string,
    startAt: number,
    endAt: number,
    items?:  {
      __typename: "ModelItemConnection",
      items?:  Array< {
        __typename: "Item",
        id: string,
        title: string,
        description?: string | null,
        doDate: number,
        priority: string,
        status: string,
        estimate?: string | null,
        projectID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateProjectSubscription = {
  onUpdateProject?:  {
    __typename: "Project",
    id: string,
    title: string,
    description: string,
    startAt: number,
    endAt: number,
    items?:  {
      __typename: "ModelItemConnection",
      items?:  Array< {
        __typename: "Item",
        id: string,
        title: string,
        description?: string | null,
        doDate: number,
        priority: string,
        status: string,
        estimate?: string | null,
        projectID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteProjectSubscription = {
  onDeleteProject?:  {
    __typename: "Project",
    id: string,
    title: string,
    description: string,
    startAt: number,
    endAt: number,
    items?:  {
      __typename: "ModelItemConnection",
      items?:  Array< {
        __typename: "Item",
        id: string,
        title: string,
        description?: string | null,
        doDate: number,
        priority: string,
        status: string,
        estimate?: string | null,
        projectID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateItemSubscription = {
  onCreateItem?:  {
    __typename: "Item",
    id: string,
    title: string,
    description?: string | null,
    doDate: number,
    priority: string,
    status: string,
    estimate?: string | null,
    projectID: string,
    project?:  {
      __typename: "Project",
      id: string,
      title: string,
      description: string,
      startAt: number,
      endAt: number,
      items?:  {
        __typename: "ModelItemConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateItemSubscription = {
  onUpdateItem?:  {
    __typename: "Item",
    id: string,
    title: string,
    description?: string | null,
    doDate: number,
    priority: string,
    status: string,
    estimate?: string | null,
    projectID: string,
    project?:  {
      __typename: "Project",
      id: string,
      title: string,
      description: string,
      startAt: number,
      endAt: number,
      items?:  {
        __typename: "ModelItemConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteItemSubscription = {
  onDeleteItem?:  {
    __typename: "Item",
    id: string,
    title: string,
    description?: string | null,
    doDate: number,
    priority: string,
    status: string,
    estimate?: string | null,
    projectID: string,
    project?:  {
      __typename: "Project",
      id: string,
      title: string,
      description: string,
      startAt: number,
      endAt: number,
      items?:  {
        __typename: "ModelItemConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
