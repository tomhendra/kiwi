/** @jsxImportSource @emotion/react */
import React from 'react';
import { DataStore, Predicates } from 'aws-amplify';
import { ErrorMessage, FullPageSpinner } from 'components';
import { useAsync } from 'hooks';
import { Project } from 'models';
import { theme } from 'theme';

function ProjectsScreen() {
  const {
    isIdle,
    isLoading,
    isError,
    isSuccess,
    run,
    data: projects,
    error,
  } = useAsync();

  console.log({
    isIdle,
    isLoading,
    isError,
    isSuccess,
    run,
    projects,
    error,
  });

  React.useEffect(() => {
    run(DataStore.query(Project, Predicates.ALL));
  }, [run]);

  if (isIdle || isLoading) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  if (isSuccess) {
    return (
      <>
        <h2>Projects</h2>
        {projects?.map((project: Project) => (
          <div
            key={project.id}
            css={{
              background: theme.colors.white,
              padding: theme.space[4],
              marginBottom: theme.space[3],
              borderRadius: theme.radii.lg,
            }}
          >
            <p>id: {project.id}</p>
            <p>title: {project.title}</p>
            <p>description: {project.description}</p>
            <p>start: {project.startAt}</p>
            <p>end: {project.endAt}</p>
          </div>
        ))}
      </>
    );
  }

  return null;
}

export { ProjectsScreen };
