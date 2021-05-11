import * as React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getProject } from 'core/graphql';
import { useParams } from 'react-router-dom';
import { useAsync } from 'core/hooks';

const loadingProject = {
  title: 'loading...',
  description: 'loading...',
  startAt: 'loading...',
  endAt: 'loading...',
  createdAt: 'loading...',
};

function ProjectScreen() {
  const { projectId } = useParams();
  const { data: project, run, isSuccess } = useAsync();

  React.useEffect(() => {
    run(API.graphql(graphqlOperation(getProject, { id: projectId })));
  }, [run, projectId]);

  const { title, description, startAt, endAt, createdAt } = isSuccess
    ? project.data.getProject
    : loadingProject;

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
