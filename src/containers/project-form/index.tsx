import * as React from 'react';
import { ReactElement } from 'models/react';
import { Project } from 'models';
import {
  StyledInput,
  StyledForm,
  StyledFormGroup,
  StyledTextarea,
} from 'components';

interface Props {
  onSubmit: (arg: Project) => void;
  submitButton: ReactElement;
}

function ProjectForm({ onSubmit, submitButton }: Props) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      title: { value: string };
      description: { value: string };
      startAt: { value: string };
      endAt: { value: string };
    };

    onSubmit({
      id: '',
      title: target.title.value,
      description: target.description.value,
      startAt: new Date(target.startAt.value).toISOString(),
      endAt: new Date(target.endAt.value).toISOString(),
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
