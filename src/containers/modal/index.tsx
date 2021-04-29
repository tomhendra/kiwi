/** @jsxImportSource @emotion/react */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HideVisually } from 'components';
import {
  StyledOverlay,
  StyledCloseButton,
  StyledContent,
  StyledWrapper,
  StyledTitle,
} from './styled';
import { callAll } from 'utils';
import { Children, ReactElement } from 'models/react';
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

/**
 * TODO: fix close on escape for FocusTrap - doesn't work out-of-the-box as it should
 * */

interface ModalProps {
  title: string;
  children: Children;
  props?: any;
}

function Modal({ title, children }: ModalProps) {
  const [isOpen] = React.useContext(ModalContext);

  if (isOpen) {
    return ReactDOM.createPortal(
      <StyledOverlay>
        <FocusTrap active={isOpen}>
          <StyledWrapper>
            <ModalDismissButton>
              <StyledCloseButton aria-label="close modal">
                <HideVisually>Close</HideVisually>
                <p aria-hidden>X</p>
              </StyledCloseButton>
            </ModalDismissButton>
            <StyledTitle>{title}</StyledTitle>
            <StyledContent role="dialog" aria-modal={true}>
              {children}
            </StyledContent>
          </StyledWrapper>
        </FocusTrap>
      </StyledOverlay>,
      document.body,
    );
  } else {
    return null;
  }
}

export { ModalProvider, ModalOpenButton, Modal };
