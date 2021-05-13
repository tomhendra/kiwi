import API, { graphqlOperation } from '@aws-amplify/api';
import { CreateTaskMutation, CreateTaskInput } from 'core/models';
import { useMutation, useQueryClient } from 'react-query';
import * as mutations from 'core/graphql/mutations';

function useCreateTask() {
  const queryClient = useQueryClient();
  const result = useMutation(
    (taskInput: CreateTaskInput) =>
      API.graphql(
        graphqlOperation(mutations.createTask, taskInput),
      ) as Promise<CreateTaskMutation>,
    { onSettled: () => queryClient.invalidateQueries('projects') },
  );

  return { ...result, create: result.mutate };
}

export { useCreateTask };
