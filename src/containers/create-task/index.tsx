import { DataStore } from 'aws-amplify';
import { ErrorMessage, Button, Spinner } from 'components';
import { ModalProvider, ModalOpenButton, Modal, TaskForm } from 'containers';
import { useAsync } from 'hooks';
import { Task } from 'models';

function CreateTask() {
  const { error, run, isIdle, isLoading, isError, isSuccess } = useAsync();

  const createTask = ({ title, description }: Task) =>
    run(
      DataStore.save(
        new Task({
          title,
          description,
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
          <TaskForm
            onSubmit={createTask}
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

export { CreateTask };
