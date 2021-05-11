import { API, graphqlOperation } from 'aws-amplify';
import { ErrorMessage, Button, Spinner } from 'components';
import { ModalProvider, ModalOpenButton, Modal, ProjectForm } from 'containers';
import { useAsync } from 'core/hooks';
import { CreateProjectInput } from 'core/models';
import * as mutations from 'core/graphql/mutations';

function CreateProject() {
  const { error, run, isIdle, isLoading, isError, isSuccess } = useAsync();

  const createProject = ({
    title,
    description,
    startAt,
    endAt,
  }: CreateProjectInput) =>
    run(
      API.graphql(
        graphqlOperation(mutations.createProject, {
          input: { title, description, startAt, endAt },
        }),
      ),
    );

  return (
    <ModalProvider>
      <ModalOpenButton>
        <Button variant="primary">Create Project</Button>
      </ModalOpenButton>
      <Modal aria-label="Create project form" title="Create Project">
        {isIdle && (
          <ProjectForm
            onSubmit={createProject}
            submitButton={<Button variant="primary">Create Project</Button>}
          />
        )}
        {isLoading ? <Spinner /> : null}
        {isError ? <ErrorMessage error={error} /> : null}
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
