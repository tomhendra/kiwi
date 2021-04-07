/** @jsxImportSource @emotion/react */
import { theme } from 'core/theme';
import { Button } from 'components';
import {
  ModeToggle,
  ModalProvider,
  ModalOpenButton,
  Modal,
  IssueForm,
} from 'containers';
import { Issue } from 'core/types';

function Navbar() {
  function createIssue(formData: Issue) {
    console.log('issue', formData);
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
            <Modal aria-label="Create issue form" title="Create Issue">
              <IssueForm
                onSubmit={createIssue}
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
