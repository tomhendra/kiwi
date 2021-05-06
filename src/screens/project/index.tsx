import * as React from 'react';
import { DataStore } from 'aws-amplify';
import { useParams } from 'react-router-dom';
import { useAsync } from 'hooks';
import { Project } from 'models';

const loadingProject = {
  title: 'loading...',
  description: 'loading...',
  startAt: 'loading...',
  endAt: 'loading...',
  createdAt: 'loading...',
};

function ProjectScreen() {
  const { projectId } = useParams();
  const { data, run } = useAsync();

  React.useEffect(() => {
    run(DataStore.query(Project, projectId));
  }, [run, projectId]);

  const { title, description, startAt, endAt, createdAt } =
    data ?? loadingProject;

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
