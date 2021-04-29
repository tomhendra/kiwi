import { DataStore } from 'aws-amplify';
import { ErrorMessage, Button, Spinner } from 'components';
import { ModalProvider, ModalOpenButton, Modal, ProjectForm } from 'containers';
import { useAsync } from 'hooks';
import { Project } from 'models';

function CreateProject() {
  const { error, run, isIdle, isLoading, isError, isSuccess } = useAsync();

  const createProject = ({ title, description, startAt, endAt }: Project) =>
    run(
      DataStore.save(
        new Project({
          title,
          description,
          startAt,
          endAt,
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
