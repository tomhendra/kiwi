/** @jsxImportSource @emotion/react */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HideVisually } from 'components';
import {
  StyledOverlay,
  StyledCloseButton,
  StyledContent,
  StyledContainer,
  StyledTitle,
} from './styled';
import { callAll } from 'core/utils';
import { Children, ReactElement } from 'core/models';
import FocusTrap from 'focus-trap-react';

type ContextState = [
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
];

const ModalContext = React.createContext({} as ContextState);

function Modal(props: any) {
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

// TODO: fix close on escape for FocusTrap - doesn't work out-of-the-box

interface ModalProps {
  title: string;
  children: Children;
  onClose?: () => void;
  props?: any;
}

function ModalContents({ title, children, onClose }: ModalProps) {
  const [isOpen] = React.useContext(ModalContext);

  if (isOpen) {
    return ReactDOM.createPortal(
      <StyledOverlay>
        <FocusTrap active={isOpen}>
          <StyledContainer>
            <ModalDismissButton>
              <StyledCloseButton aria-label="close modal" onClick={onClose}>
                <HideVisually>Close</HideVisually>
                <p aria-hidden>X</p>
              </StyledCloseButton>
            </ModalDismissButton>
            <StyledTitle>{title}</StyledTitle>
            <StyledContent role="dialog" aria-modal={true}>
              {children}
            </StyledContent>
          </StyledContainer>
        </FocusTrap>
      </StyledOverlay>,
      document.body,
    );
  } else {
    return null;
  }
}

export { Modal, ModalOpenButton, ModalDismissButton, ModalContents };
