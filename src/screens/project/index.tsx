import { useParams } from 'react-router-dom';
import {
  useGetProject,
  // refetchListProjects,
  useDeleteProject,
} from 'core/hooks';
import { Button, ErrorMessage } from 'components';
import * as React from 'react';

// TODO: Handle bad URL req e.g. buho/projects/bad-id.
// Current behaviour is constant loading...
// graphql api can't return 404 status!

function ProjectScreen() {
  const { projectId } = useParams();
  const { project, error, isError } = useGetProject({ id: projectId });
  const { deleteProject, isSuccess: isDeleted } = useDeleteProject();

  const { id, title, description, startAt, endAt, createdAt } = project;

  // React.useEffect(() => {
  //   // return () => refetchListProjects();
  // }, []);

  if (isError) {
    return <ErrorMessage error={error as Error} />;
  }

  if (isDeleted) {
    return <p>project deleted</p>;
  }

  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>id: {id}</p>
      <p>start: {startAt}</p>
      <p>end: {endAt}</p>
      <p>created: {createdAt}</p>
      <Button onClick={() => deleteProject({ id })}>Delete</Button>
    </>
  );
}

export { ProjectScreen };
