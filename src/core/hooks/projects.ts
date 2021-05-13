import { API, graphqlOperation } from 'aws-amplify';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import * as mutations from 'core/graphql/mutations';
import * as queries from 'core/graphql/queries';
import {
  CreateProjectInput,
  CreateProjectMutation,
  GetProjectQuery,
  GetProjectQueryVariables,
  ListProjectsQuery,
  Project,
} from 'core/models';

const loadingProject = {
  title: 'loading...',
  description: 'loading...',
  startAt: 'loading...',
  endAt: 'loading...',
  createdAt: 'loading...',
};

function useCreateProject() {
  const queryClient = useQueryClient();
  const result = useMutation(
    (projectInput: CreateProjectInput) =>
      API.graphql(
        graphqlOperation(mutations.createProject, {
          input: projectInput,
        }),
      ) as Promise<CreateProjectMutation>,
    { onSettled: () => queryClient.invalidateQueries('projects') },
  );

  return { ...result, create: result.mutate };
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
    projects: projects ?? null,
  };
}

export { useCreateProject, useGetProject, useListProjects };
