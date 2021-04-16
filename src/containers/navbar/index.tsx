/** @jsxImportSource @emotion/react */
import { theme } from 'core/theme';
import { Button } from 'components';
import {
  ModeToggle,
  ModalProvider,
  ModalOpenButton,
  Modal,
  ItemForm,
} from 'containers';
import { CreateItemInput } from 'core/models';

function Navbar() {
  function createItem(formData: CreateItemInput) {
    console.log('item', formData);
  }

  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <nav
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          '&& > * + *': {
            marginLeft: theme.space[2],
          },
        }}
      >
        <div>
          <ModalProvider>
            <ModalOpenButton>
              <Button variant="primary">Create</Button>
            </ModalOpenButton>
            <Modal aria-label="Create item form" title="Create Item">
              <ItemForm
                onSubmit={createItem}
                submitButton={<Button variant="primary">Create</Button>}
              />
            </Modal>
          </ModalProvider>
        </div>
        <ModeToggle />
      </nav>
    </div>
  );
}

export { Navbar };
