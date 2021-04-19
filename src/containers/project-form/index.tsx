import * as React from 'react';
import { CreateProjectInput, ReactElement } from 'core/models';
import {
  StyledInput,
  StyledForm,
  StyledFormGroup,
  StyledTextarea,
} from 'components';

interface Props {
  onSubmit: (arg: CreateProjectInput) => void;
  submitButton: ReactElement;
}

function ProjectForm({ onSubmit, submitButton }: Props) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      title: { value: string };
      description: { value: string };
      startAt: { value: number };
      endAt: { value: number };
    };

    onSubmit({
      title: target.title.value,
      description: target.description.value,
      startAt: target.startAt.value,
      endAt: target.endAt.value,
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
      <StyledFormGroup>
        <label htmlFor="startAt">Do Date</label>
        <StyledInput id="startAt" type="date" />
      </StyledFormGroup>
      <StyledFormGroup>
        <label htmlFor="endAt">Priority</label>
        <StyledInput id="endAt" type="date" />
      </StyledFormGroup>
      <div>{React.cloneElement(submitButton, { type: 'submit' })}</div>
    </StyledForm>
  );
}

export { ProjectForm };
