import * as React from 'react';
import { ReactElement, CreateProjectInput } from 'core/models';
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
  onSubmit: (arg: CreateProjectInput) => void;
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
      title: titleInput.value,
      description: descriptionInput.value,
      startAt: new Date(startAtInput.value).toISOString(),
      endAt: new Date(endAtInput.value).toISOString(),
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
      <StyledFormGroup>
        <label htmlFor="startAtInput">Do Date</label>
        <StyledInput id="startAtInput" type="date" />
      </StyledFormGroup>
      <StyledFormGroup>
        <label htmlFor="endAtInput">Priority</label>
        <StyledInput id="endAtInput" type="date" />
      </StyledFormGroup>
      <div>{React.cloneElement(submitButton, { type: 'submit' })}</div>
    </StyledForm>
  );
}

export { ProjectForm };
