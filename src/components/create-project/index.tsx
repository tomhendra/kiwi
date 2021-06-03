import { ErrorMessage, Button, Spinner } from 'components';
import { Modal, ModalOpenButton, ModalContents, ProjectForm } from 'components';
import { useCreateProject } from 'core/hooks';

function CreateProject() {
  const { create, isIdle, isLoading, isError, isSuccess, error, reset } =
    useCreateProject();

  return (
    <Modal>
      <ModalOpenButton>
        <Button variant="primary">Create Project</Button>
      </ModalOpenButton>
      <ModalContents
        aria-label="Create project form"
        title="Create Project"
        onClose={reset}
      >
        {isIdle ? (
          <ProjectForm
            onSubmit={create}
            submitButton={<Button variant="primary">Create Project</Button>}
          />
        ) : null}
        {isLoading ? <Spinner /> : null}
        {isError ? <ErrorMessage error={error as Error} /> : null}
        {isSuccess ? (
          <>
            <p>Project created!</p>
            <p>Go back to Dashboard</p>
          </>
        ) : null}
      </ModalContents>
    </Modal>
  );
}

export { CreateProject };
