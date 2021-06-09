import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { callAll } from 'core/utils';
import { Children, ReactElement } from 'core/models';
import { HideVisually } from 'components';
import {
  StyledOverlay,
  StyledCloseButton,
  StyledContent,
  StyledContainer,
  StyledTitle,
} from './styled';

/**
 * The modal system is based on a compound components pattern which promotes
 * inverse of control. The idea is that the implementation is responsible for
 * defining how the modal is composed rather than exposing a number of props
 * on a single component for a never-ending list of required use cases.
 *
 * The parent component Modal provides context for implicitly shared open state
 * between its children, facilitating flexibility in composition.
 *
 * Example usage:
 *
 * <Modal>
 *  <ModalOpenButton>
 *    <button>anything we like</button>
 *  </ModalOpenButton>
 *  <ModalContents>
 *    <ModalDismissButton>
 *      <button>anything we like</button>
 *    </ModalDismissButton>
 *    {any other content we wish to include}
 *  </ModalContents>
 * </Modal>
 */

type ContextState = [
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
];

const ModalContext = React.createContext({} as ContextState);
// the parent component provides context only
function Modal(props: any) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />;
}
// we use callAll to ensure any onClick passed to a child button is not
// overwritten by onClick: () => setIsOpen()
function ModalDismissButton({ children: child }: { children: ReactElement }) {
  const [, setIsOpen] = React.useContext(ModalContext);
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  });
}

function ModalOpenButton({ children: child }: { children: ReactElement }) {
  const [, setIsOpen] = React.useContext(ModalContext);
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  });
}
// the base modal that will be used throughout the app with styles for
// border / color / padding / position / transitions applied to the container.
// implemented close on escape & focus trap without dependencies (a11y).
function ModalContentsBase(props: any) {
  const [isOpen, setIsOpen] = React.useContext(ModalContext);
  const modalContentsRef: any = React.createRef();
  const previouslyFocused =
    typeof document !== 'undefined' && document.activeElement;

  React.useEffect(() => {
    // credit for handleKeydown: https://svelte.dev/examples#modal
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      if (e.key === 'Tab') {
        // trap focus
        const nodes = modalContentsRef?.current?.querySelectorAll('*');
        console.log({ nodes });

        if (nodes) {
          const tabbable: any[] = Array.from(nodes).filter(
            (n: any) => n.tabIndex >= 0,
          );

          let index = tabbable.indexOf(document.activeElement);
          if (index === -1 && e.shiftKey) index = 0;

          index += tabbable.length + (e.shiftKey ? -1 : 1);
          index %= tabbable.length;

          tabbable[index].focus();
          e.preventDefault();
        }
      }
    }

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      previouslyFocused && (previouslyFocused as HTMLElement).focus();
    };
  });

  return isOpen
    ? ReactDOM.createPortal(
        <StyledOverlay role="dialog" aria-modal="true">
          <StyledContainer ref={modalContentsRef} tabIndex={-1} {...props} />
        </StyledOverlay>,
        document.body,
      )
    : null;
}

interface ModalContentsProps {
  title: string;
  children: Children;
  // TODO: refactor onClose? does this need to be passed as a prop?
  onClose?: () => void; // prop exposed to pass reset fn from react-query
  props?: any;
}
// layout variations can be composed for all of our required use cases!
function ModalContents({ title, children, onClose }: ModalContentsProps) {
  return (
    <ModalContentsBase>
      <ModalDismissButton>
        <StyledCloseButton aria-label="close modal" onClick={onClose}>
          <HideVisually>Close</HideVisually>
          <p aria-hidden>X</p>
        </StyledCloseButton>
      </ModalDismissButton>
      <StyledTitle>{title}</StyledTitle>
      <StyledContent>{children}</StyledContent>
    </ModalContentsBase>
  );
}

export {
  Modal,
  ModalOpenButton,
  ModalDismissButton,
  ModalContentsBase,
  ModalContents,
};
