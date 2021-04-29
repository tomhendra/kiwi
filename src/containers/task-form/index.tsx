import * as React from 'react';
import { ReactElement } from 'models/react';
import { Task } from 'models';
import {
  StyledInput,
  StyledForm,
  StyledFormGroup,
  StyledTextarea,
} from 'components';

interface Props {
  onSubmit: (arg: Task) => void;
  submitButton: ReactElement;
}

function TaskForm({ onSubmit, submitButton }: Props) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      title: { value: string };
      description: { value: string };
    };

    onSubmit({
      id: '',
      title: target.title.value,
      description: target.description.value,
    });
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledFormGroup>
        <label htmlFor="title">Title</label>
        <StyledInput id="title" type="text" />
      </StyledFormGroup>
      <StyledFormGroup>
        <label htmlFor="description">Description</label>
        <StyledTextarea id="description" />
      </StyledFormGroup>
      <div>{React.cloneElement(submitButton, { type: 'submit' })}</div>
    </StyledForm>
  );
}

export { TaskForm };
