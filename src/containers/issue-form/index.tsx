import * as React from 'react';
import { Issue, IssueFormInput, ReactElement } from 'core/types';
import {
  StyledInput,
  StyledForm,
  StyledFormGroup,
  StyledTextarea,
  StyledSelect,
} from 'components';

interface Props {
  onSubmit: (arg: Issue) => void;
  submitButton: ReactElement;
}

function IssueForm({ onSubmit, submitButton }: Props) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const target = event.target as typeof event.target & IssueFormInput;

    onSubmit({
      assignee: target.assignee.value,
      attachments: target.attachments.value,
      date: target.date.value,
      description: target.description.value,
      tags: target.tags.value,
      name: target.name.value,
      priority: target.priority.value,
      project: target.project.value,
      reporter: target.reporter.value,
      estimate: target.estimate.value,
      status: target.status.value,
      type: target.type.value,
    });
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledFormGroup>
        <label htmlFor="assignee">Assignee</label>
        <StyledInput id="assignee" type="text" />
      </StyledFormGroup>
      <StyledFormGroup>
        <label htmlFor="attachments">Attachments</label>
        <StyledInput id="attachments" type="file" />
      </StyledFormGroup>
      <StyledFormGroup>
        <label htmlFor="date">Do Date</label>
        <StyledInput id="date" type="date" />
      </StyledFormGroup>
      <StyledFormGroup>
        <label htmlFor="description">Description</label>
        <StyledTextarea id="description" />
      </StyledFormGroup>
      <StyledFormGroup>
        <label htmlFor="tags">Tags</label>
        <StyledSelect id="tags" />
      </StyledFormGroup>
      <StyledFormGroup>
        <label htmlFor="name">Title</label>
        <StyledInput id="name" type="text" />
      </StyledFormGroup>
      <StyledFormGroup>
        <label htmlFor="priority">Priority</label>
        <StyledSelect id="priority" />
      </StyledFormGroup>
      <StyledFormGroup>
        <label htmlFor="project">project</label>
        <StyledSelect id="project" />
      </StyledFormGroup>
      <StyledFormGroup>
        <label htmlFor="reporter">reporter</label>
        <StyledSelect id="reporter" />
      </StyledFormGroup>
      <StyledFormGroup>
        <label htmlFor="estimate">estimate</label>
        <StyledInput id="estimate" type="time" />
      </StyledFormGroup>
      <StyledFormGroup>
        <label htmlFor="status">status</label>
        <StyledSelect id="status" />
      </StyledFormGroup>
      <StyledFormGroup>
        <label htmlFor="type">Type</label>
        <StyledInput id="type" type="text" />
      </StyledFormGroup>
      <div>{React.cloneElement(submitButton, { type: 'submit' })}</div>
    </StyledForm>
  );
}

export { IssueForm };
