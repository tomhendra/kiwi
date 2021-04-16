import * as React from 'react';
import { CreateItemInput, ReactElement } from 'core/models';
import {
  StyledInput,
  StyledForm,
  StyledFormGroup,
  StyledTextarea,
  StyledSelect,
} from 'components';

interface Props {
  onSubmit: (arg: CreateItemInput) => void;
  submitButton: ReactElement;
}

function ItemForm({ onSubmit, submitButton }: Props) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      title: { value: string };
      description: { value: string };
      doDate: { value: number };
      priority: { value: string };
      status: { value: string };
      estimate: { value: string };
      project: { value: string };
    };

    onSubmit({
      title: target.title.value,
      description: target.description.value,
      doDate: target.doDate.value,
      priority: target.priority.value,
      status: target.status.value,
      estimate: target.estimate.value,
      projectID: target.project.value,
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
        <label htmlFor="date">Do Date</label>
        <StyledInput id="doDate" type="date" />
      </StyledFormGroup>
      <StyledFormGroup>
        <label htmlFor="priority">Priority</label>
        <StyledSelect id="priority" />
      </StyledFormGroup>
      <StyledFormGroup>
        <label htmlFor="status">status</label>
        <StyledSelect id="status" />
      </StyledFormGroup>
      <StyledFormGroup>
        <label htmlFor="estimate">estimate</label>
        <StyledInput id="estimate" type="time" />
      </StyledFormGroup>
      <StyledFormGroup>
        <label htmlFor="project">project</label>
        <StyledSelect id="project" />
      </StyledFormGroup>
      <div>{React.cloneElement(submitButton, { type: 'submit' })}</div>
    </StyledForm>
  );
}

export { ItemForm };
