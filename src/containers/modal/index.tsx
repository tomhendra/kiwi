/** @jsxImportSource @emotion/react */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HideVisually } from 'components';
import { StyledOverlay, StyledCloseButton, StyledContent } from './styled';
import { callAll } from 'core/utils';
import { Children, ReactElement } from 'core/types';
import FocusTrap from 'focus-trap-react';

type ContextState = [
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
];

const ModalContext = React.createContext({} as ContextState);

function ModalProvider(props: any) {
  const [isOpen, setIsOpen] = React.useState(false);
  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />;
}

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

function ModalWrapper(props: any) {
  const [isOpen] = React.useContext(ModalContext);
  if (isOpen) {
    return ReactDOM.createPortal(
      <StyledOverlay aria-modal={true}>
        <FocusTrap active={isOpen}>
          <StyledContent role="dialog" {...props} />
        </FocusTrap>
      </StyledOverlay>,
      document.body,
    );
  } else {
    return null;
  }
}

interface ModalContentsProps {
  title: string;
  children: Children;
  props?: any;
}

function ModalContents({ title, children, ...props }: ModalContentsProps) {
  return (
    <ModalWrapper {...props}>
      <ModalDismissButton>
        <StyledCloseButton aria-label="close modal">
          <HideVisually>Close</HideVisually>
          <p aria-hidden>X</p>
        </StyledCloseButton>
      </ModalDismissButton>
      <h3 css={{ textAlign: 'center', fontSize: '2em' }}>{title}</h3>
      {children}
    </ModalWrapper>
  );
}

export { ModalProvider, ModalOpenButton, ModalContents };
