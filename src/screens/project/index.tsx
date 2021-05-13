import { useParams } from 'react-router-dom';
import { useGetProject } from 'core/hooks';

function ProjectScreen() {
  const { projectId } = useParams();
  const { project } = useGetProject({ id: projectId });
  const { title, description, startAt, endAt, createdAt } = project;

  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>start: {startAt}</p>
      <p>end: {endAt}</p>
      <p>created: {createdAt}</p>
    </>
  );
}

export { ProjectScreen };
