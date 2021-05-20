import * as React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
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

const loadingProjects = Array.from({ length: 10 }, (v, index) => ({
  id: `loading-project-${index}`,
  ...loadingProject,
}));

interface ListProjectsResult {
  data: ListProjectsQuery | null;
  error?: Error;
}

const getListProjectsConfig = (queryClient: QueryClient) => ({
  queryKey: ['projects'],
  queryFn: () =>
    API.graphql(
      graphqlOperation(queries.listProjects),
    ) as Promise<ListProjectsResult>,
  /**
   * onSuccess we add the project data fetched from the ListProjects query
   * to the cache for each individual project, so navigating from dashboard
   * screen to project screen doesn't require an additional network request.
   */
  onSuccess: (listProjects: ListProjectsResult) => {
    const projects = listProjects?.data?.listProjects?.items as Project[];
    for (const project of projects) {
      queryClient.setQueryData(['project', project?.id], project);
    }
  },
});

function useListProjects() {
  const queryClient = useQueryClient();
  const result = useQuery(getListProjectsConfig(queryClient));
  const projects = result?.data?.data?.listProjects?.items as Project[];
  return {
    ...result,
    projects: projects ?? loadingProjects,
  };
}

/**
 * prefetchListProjects runs in a cleanup fn on the dashboard screen, so that
 * any changes made to project data is prefetched before the dashboard is
 * subsequently rendered. This has the effect of instant loading of updated
 * data when navigating to the dashboard screen.
 */
function useRefetchListProjects() {
  const queryClient = useQueryClient();
  return React.useCallback(
    async function refetchListProjects() {
      queryClient.removeQueries('projects');
      await queryClient.prefetchQuery(getListProjectsConfig(queryClient));
    },
    [queryClient],
  );
}

interface GetProjectResult {
  data: GetProjectQuery | null;
  error?: Error;
}

function useGetProject({ id }: GetProjectQueryVariables) {
  const result = useQuery({
    queryKey: ['project', id],
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

// ? MUTATIONS................................

function useCreateProject(options?: {}) {
  const queryClient = useQueryClient();
  const result = useMutation(
    (project: CreateProjectInput) =>
      API.graphql(
        graphqlOperation(mutations.createProject, {
          input: project,
        }),
      ) as Promise<CreateProjectMutation>,
    {
      onSettled: () => queryClient.invalidateQueries('projects'),
      ...options,
    },
  );

  return { ...result, create: result.mutate };
}

function useUpdateProject(options?: {}) {
  const queryClient = useQueryClient();
  const result = useMutation(
    (project: UpdateProjectInput) =>
      API.graphql(
        graphqlOperation(mutations.updateProject, {
          input: project,
        }),
      ) as Promise<UpdateProjectMutation>,
    {
      /**
       * optimistic updates -- when updating a project, we assume that the HTTP
       * request will be successful and update the UI instantly, then if there
       * is a subsequent error, we reset the cache to its pre-error state.
       * onMutate accepts the updates being performed on the project...
       */
      onMutate(updatedProject) {
        // we grab the project's current state from the cache...
        const previousProjects = queryClient.getQueryData('projects');
        // we then update the cache with the updated state...
        queryClient.setQueryData('projects', (old: any) => {
          return old?.data?.listProjects?.items?.map((project: Project) =>
            project.id === updatedProject.id
              ? { ...project, updatedProject }
              : project,
          );
        });
        // we return a cleanup function that will fire in the event of an
        // error snd restore the previous project state to the cache...
        return () => queryClient.setQueryData('projects', previousProjects);
      },
      // the cleanup function is handled by our defaultMutationsOptions.
      onSettled: () => queryClient.invalidateQueries('projects'),
      ...options,
    },
  );

  return { ...result, update: result.mutate };
}

function useDeleteProject(options?: {}) {
  const queryClient = useQueryClient();
  const result = useMutation(
    (idObj: DeleteProjectInput) =>
      API.graphql(
        graphqlOperation(mutations.deleteProject, { input: idObj }),
      ) as Promise<DeleteProjectMutation>,
    {
      onMutate(removedItem) {
        const previousItems = queryClient.getQueryData('projects');

        queryClient.setQueryData('projects', (old: any) => {
          // TODO: old should be ListProjectsResult
          return old?.data?.listProjects?.items?.filter(
            (item: any) => item.id !== removedItem.id,
          );
        });

        return () => queryClient.setQueryData('projects', previousItems);
      },
      onSettled: () => queryClient.invalidateQueries('projects'),
      ...options,
    },
  );

  return { ...result, deleteProject: result.mutate };
}

export {
  useListProjects,
  useRefetchListProjects,
  useGetProject,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
};
