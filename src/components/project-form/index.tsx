import * as React from 'react';
import { ReactElement, Project } from 'core/models';
import { StyledInput, StyledForm, StyledFormGroup } from 'components';

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  description: HTMLInputElement;
  startAt: HTMLInputElement;
  endAt: HTMLInputElement;
}

interface ProjectFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

interface Props {
  onSubmit: any; // TODO: work out the correct type for this
  submitButton: ReactElement;
  project?: Project;
}

function ProjectForm({ onSubmit, submitButton, project }: Props) {
  const initialFormState = {
    id: project?.id ?? null,
    title: project?.title ?? '',
    description: project?.description ?? '',
    startAt: project?.startAt ?? '',
    endAt: project?.endAt ?? '',
  };

  const [formState, setFormState] = React.useState(initialFormState);

  function handleSubmit(event: React.FormEvent<ProjectFormElements>) {
    event.preventDefault();
    onSubmit(formState);
  }

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const { id, value } = event.currentTarget;
    setFormState({ ...formState, [id]: value });
  }

  const { title, description, startAt, endAt } = formState;

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledFormGroup>
        <label htmlFor="title">Title</label>
        <StyledInput
          id="title"
          type="text"
          onChange={handleChange}
          value={title}
        />
      </StyledFormGroup>
      <StyledFormGroup>
        <label htmlFor="description">Description</label>
        <StyledInput
          id="description"
          onChange={handleChange}
          value={description}
        />
      </StyledFormGroup>
      <StyledFormGroup>
        <label htmlFor="startAt">Do Date</label>
        <StyledInput
          id="startAt"
          type="date"
          onChange={handleChange}
          value={startAt}
        />
      </StyledFormGroup>
      <StyledFormGroup>
        <label htmlFor="endAt">Priority</label>
        <StyledInput
          id="endAt"
          type="date"
          onChange={handleChange}
          value={endAt}
        />
      </StyledFormGroup>
      <div>{React.cloneElement(submitButton, { type: 'submit' })}</div>
    </StyledForm>
  );
}

export { ProjectForm };
