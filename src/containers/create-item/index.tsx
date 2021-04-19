import { ModalProvider, ModalOpenButton, Modal, ItemForm } from 'containers';
import { Button } from 'components';
import { CreateItemInput, ReactElement } from 'core/models';
import { useAsync } from 'core/hooks/use-async';
import { API, graphqlOperation } from 'aws-amplify';
import { createItem } from 'core/graphql';

interface Props {
  modalOpenButton: ReactElement;
}

function CreateItem({ modalOpenButton }: Props) {
  const { error, run, isIdle, isLoading, isError, isSuccess } = useAsync();

  const createItemCb = (input: CreateItemInput) =>
    run(API.graphql(graphqlOperation(createItem, { input: input })));

  return (
    <ModalProvider>
      <ModalOpenButton>{modalOpenButton}</ModalOpenButton>
      <Modal aria-label="Create item form" title="Create Item">
        {isIdle && (
          <ItemForm
            onSubmit={createItemCb}
            submitButton={<Button variant="primary">Create Issue</Button>}
          />
        )}
        {isLoading && <p>Loading...</p>}
        {isError && <pre>{error}</pre>}
        {isSuccess && <p>Success!</p>}
      </Modal>
    </ModalProvider>
  );
}

export { CreateItem };
