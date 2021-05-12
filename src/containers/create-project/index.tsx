import { API, graphqlOperation } from 'aws-amplify';
import { useMutation } from 'react-query';
import * as mutations from 'core/graphql/mutations';
import { CreateProjectInput } from 'core/models';
import { ErrorMessage, Button, Spinner } from 'components';
import { ModalProvider, ModalOpenButton, Modal, ProjectForm } from 'containers';

function CreateProject() {
  const {
    mutate: create,
    isIdle,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useMutation(
    async (projectInput: CreateProjectInput) =>
      await API.graphql(
        graphqlOperation(mutations.createProject, {
          input: projectInput,
        }),
      ),
    // { onSettled: () => queryClient.invalidateQuery('projects') },

    // invalidating the query 'projects' tells react-query that the cache is
    // invalid, which will trigger the queryFn to be run again to fetch the
    // updated data. This ensures the cache contains the very latest data.

    // Once the mutation finishes it is tempting to manually update the query
    // cache with the data we get back from the mutation, but in practice
    // surgically updating a cache is likely to create a lot of stale data bugs.
  );

  return (
    <ModalProvider>
      <ModalOpenButton>
        <Button variant="primary">Create Project</Button>
      </ModalOpenButton>
      <Modal aria-label="Create project form" title="Create Project">
        {isIdle && (
          <ProjectForm
            onSubmit={create}
            submitButton={<Button variant="primary">Create Project</Button>}
          />
        )}
        {isLoading ? <Spinner /> : null}
        {isError ? <ErrorMessage error={error as Error} /> : null}
        {isSuccess ? (
          <>
            <p>Project created!</p>
            <p>Go back to Dashboard</p>
          </>
        ) : null}
      </Modal>
    </ModalProvider>
  );
}

export { CreateProject };
