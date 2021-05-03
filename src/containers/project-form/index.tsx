import * as React from 'react';
import { ReactElement } from 'models/react';
import { Project } from 'models';
import {
  StyledInput,
  StyledForm,
  StyledFormGroup,
  StyledTextarea,
} from 'components';

interface FormElements extends HTMLFormControlsCollection {
  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  startAtInput: HTMLInputElement;
  endAtInput: HTMLInputElement;
}

interface ProjectFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

interface Props {
  onSubmit: (arg: Project) => void;
  submitButton: ReactElement;
}

function ProjectForm({ onSubmit, submitButton }: Props) {
  function handleSubmit(event: React.FormEvent<ProjectFormElements>) {
    event.preventDefault();
    const {
      titleInput,
      descriptionInput,
      startAtInput,
      endAtInput,
    } = event.currentTarget.elements;
    onSubmit({
      id: '',
      title: titleInput.value,
      description: descriptionInput.value,
      startAt: new Date(startAtInput.value).toISOString(),
      endAt: new Date(endAtInput.value).toISOString(),
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
