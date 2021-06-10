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
// TODO: sort out types
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
// the base modal that will be used throughout the app.
// close on escape & focus trap implemented without dependencies to conform to
// WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#dialog_modal
function ModalContentsBase(props: any) {
  const [isOpen, setIsOpen] = React.useContext(ModalContext);
  const modalContentsRef: any = React.createRef();

  React.useEffect(() => {
    const previouslyFocused = document?.activeElement;
    const nodes = modalContentsRef?.current?.querySelectorAll('*');

    const focusable =
      nodes && Array.from(nodes).filter((n: any) => n.tabIndex >= 0);

    if (focusable && focusable[1]) {
      focusable[1].focus();
    }
    // focusing on the second focusable child works in this app because
    // the modal will always contain a close button as its first child.
    // Consider whether it would be better to always place the close button
    // at the modal footer (as the WAI-ARIA examples demonstrate), or extract
    // logic to a component and use prop / compound component pattern to
    // specify which element should receive focus when modal is opened.
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      if (e.key === 'Tab' && focusable) {
        // credit for focus trap logic: https://svelte.dev/examples#modal
        let index = focusable.indexOf(document.activeElement);
        if (index === -1 && e.shiftKey) index = 0;

        index += focusable.length + (e.shiftKey ? -1 : 1);
        index %= focusable.length;

        focusable[index].focus();
        e.preventDefault();
      }
    }

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      // focus previously focused element on modal close
      if (previouslyFocused) {
        (previouslyFocused as HTMLElement).focus();
      }
    };
  });

  return isOpen
    ? ReactDOM.createPortal(
        <StyledOverlay>
          <StyledContainer
            role="dialog"
            aria-modal="true"
            ref={modalContentsRef}
            {...props}
          />
        </StyledOverlay>,
        document.body,
      )
    : null;
}

interface ModalContentsProps {
  title: string;
  children: Children;
  // TODO: refactor onClose: can reset fn from react-query be called elsewhere?
  onClose?: () => void;
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
