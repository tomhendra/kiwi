import { ErrorMessage, Button, Spinner } from 'components';
import { Modal, ModalOpenButton, ModalContents, ProjectForm } from 'containers';
import { useUpdateProject } from 'core/hooks';
import { Project } from 'core/models';

type props = {
  project: Project;
};

function UpdateProject({ project }: props) {
  const { update, isIdle, isLoading, isError, isSuccess, error } =
    useUpdateProject();

  return (
    <Modal>
      <ModalOpenButton>
        <Button variant="primary">Update</Button>
      </ModalOpenButton>
      <ModalContents aria-label="Update project form" title="Update Project">
        {isIdle ? (
          <ProjectForm
            onSubmit={update}
            submitButton={<Button variant="primary">Update Project</Button>}
            project={project}
          />
        ) : null}
        {isLoading ? <Spinner /> : null}
        {isError ? <ErrorMessage error={error as Error} /> : null}
        {isSuccess ? (
          <>
            <p>Project updated!</p>
            <p>Go back to Dashboard</p>
          </>
        ) : null}
      </ModalContents>
    </Modal>
  );
}

export { UpdateProject };
