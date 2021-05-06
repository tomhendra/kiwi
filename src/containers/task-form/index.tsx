import * as React from 'react';
import { ReactElement } from 'models/react';
import { Task } from 'models';
import {
  StyledInput,
  StyledForm,
  StyledFormGroup,
  StyledTextarea,
} from 'components';

interface FormElements extends HTMLFormControlsCollection {
  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
}

interface TaskFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

interface Props {
  onSubmit: (arg: Task) => void;
  submitButton: ReactElement;
}

function TaskForm({ onSubmit, submitButton }: Props) {
  function handleSubmit(event: React.FormEvent<TaskFormElements>) {
    event.preventDefault();

    const { titleInput, descriptionInput } = event.currentTarget.elements;

    onSubmit({
      id: '',
      title: titleInput.value,
      description: descriptionInput.value,
    });
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledFormGroup>
        <label htmlFor="titleInput">Title</label>
        <StyledInput id="titleInput" type="text" />
      </StyledFormGroup>
      <StyledFormGroup>
        <label htmlFor="descriptionInput">Description</label>
        <StyledTextarea id="descriptionInput" />
      </StyledFormGroup>
      <div>{React.cloneElement(submitButton, { type: 'submit' })}</div>
    </StyledForm>
  );
}

export { TaskForm };
