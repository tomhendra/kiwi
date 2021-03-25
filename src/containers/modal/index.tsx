/** @jsxImportSource @emotion/react */
import * as React from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import {
  StyledCircleButton,
  StyledDialog,
  StyledContentWrapper,
} from './styled';
import { callAll } from 'core/utils';
import { Children, ReactElement } from 'core/types';

type ContextState = [
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
];

const ModalContext = React.createContext({} as ContextState);

function Modal(props: any) {
  const [isOpen, setIsOpen] = React.useState(false);
  // Modal acts a context provider
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

function ModalContentsBase(props: any) {
  const [isOpen, setIsOpen] = React.useContext(ModalContext);
  return (
    <StyledDialog
      isOpen={isOpen}
      onDismiss={() => setIsOpen(false)}
      {...props}
    />
  );
}

interface ModalContentsProps {
  title: string;
  children: Children;
  props?: any;
}

function ModalContents({ title, children, ...props }: ModalContentsProps) {
  return (
    <ModalContentsBase {...props}>
      <StyledContentWrapper>
        <ModalDismissButton>
          <StyledCircleButton>
            <VisuallyHidden>Close</VisuallyHidden>
            <p aria-hidden>X</p>
          </StyledCircleButton>
        </ModalDismissButton>
      </StyledContentWrapper>
      <h3 css={{ textAlign: 'center', fontSize: '2em' }}>{title}</h3>
      {children}
    </ModalContentsBase>
  );
}

export { Modal, ModalDismissButton, ModalOpenButton, ModalContents };
