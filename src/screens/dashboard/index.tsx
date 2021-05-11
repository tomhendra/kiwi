import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { ErrorMessage, FullPageSpinner } from 'components';
import { useAsync } from 'core/hooks';
import { Project } from 'core/models';
import { ProjectPreview } from 'components/project-preview';
import { listProjects } from 'core/graphql';

function DashboardScreen() {
  const {
    isIdle,
    isLoading,
    isError,
    isSuccess,
    run,
    data: projects,
    error,
  } = useAsync();

  React.useEffect(() => {
    run(API.graphql(graphqlOperation(listProjects)));
  }, [run]);

  if (isIdle || isLoading) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  if (isSuccess) {
    const allProjects = projects.data.listProjects.items;
    return (
      <>
        <h2>Projects</h2>
        {allProjects.length
          ? allProjects.map((project: Project) => (
              <ProjectPreview key={project.id} project={project} />
            ))
          : null}
      </>
    );
  }

  return null;
}

export { DashboardScreen };
