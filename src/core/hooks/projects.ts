import { API, graphqlOperation } from 'aws-amplify';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import * as mutations from 'core/graphql/mutations';
import * as queries from 'core/graphql/queries';
import {
  CreateProjectInput,
  CreateProjectMutation,
  DeleteProjectInput,
  DeleteProjectMutation,
  GetProjectQuery,
  GetProjectQueryVariables,
  ListProjectsQuery,
  Project,
  UpdateProjectInput,
  UpdateProjectMutation,
} from 'core/models';

/**
 * Composing custom hooks from the hooks that are provided by react-query is
 * a powerful pattern which brings several benefits:
 * 1. We avoid the risk of using the incorrect queryKey or queryFn.
 * 2. We can hide away some implementation details for specific data.
 * 3. We can customize the return value to suit our specific use case.
 */

const loadingProject = {
  title: 'loading...',
  description: 'loading...',
  startAt: 'loading...',
  endAt: 'loading...',
  createdAt: 'loading...',
};

interface ListProjectsResult {
  data: ListProjectsQuery | null;
  error?: Error;
}

function useListProjects() {
  const result = useQuery({
    queryKey: ['projects'],
    queryFn: () =>
      API.graphql(
        graphqlOperation(queries.listProjects),
      ) as Promise<ListProjectsResult>,
  });

  const projects = result?.data?.data?.listProjects?.items as Project[];

  return {
    ...result,
    projects: projects ?? [],
  };
}

interface GetProjectResult {
  data: GetProjectQuery | null;
  error?: Error;
}

function useGetProject({ id }: GetProjectQueryVariables) {
  const result = useQuery({
    queryKey: ['projects', id],
    queryFn: ({ queryKey }) =>
      API.graphql(
        graphqlOperation(queries.getProject, { id: queryKey[1] }),
      ) as Promise<GetProjectResult>,
  });

  const project = result?.data?.data?.getProject as Project;

  return {
    ...result,
    project: project ?? loadingProject,
  };
}

function useCreateProject() {
  const queryClient = useQueryClient();
  const result = useMutation(
    (project: CreateProjectInput) =>
      API.graphql(
        graphqlOperation(mutations.createProject, {
          input: project,
        }),
      ) as Promise<CreateProjectMutation>,
    { onSettled: () => queryClient.invalidateQueries('projects') },
  );

  return { ...result, create: result.mutate };
}

function useUpdateProject() {
  const queryClient = useQueryClient();
  const result = useMutation(
    (project: UpdateProjectInput) =>
      API.graphql(
        graphqlOperation(mutations.updateProject, {
          input: project,
        }),
      ) as Promise<UpdateProjectMutation>,
    { onSettled: () => queryClient.invalidateQueries('projects') },
  );

  return { ...result, update: result.mutate };
}

function useDeleteProject() {
  const queryClient = useQueryClient();
  const result = useMutation(
    (idObj: DeleteProjectInput) =>
      API.graphql(
        graphqlOperation(mutations.deleteProject, { input: idObj }),
      ) as Promise<DeleteProjectMutation>,
    { onSettled: () => queryClient.invalidateQueries('projects') },
  );

  return { ...result, deleteProject: result.mutate };
}

export {
  useListProjects,
  useGetProject,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
};
