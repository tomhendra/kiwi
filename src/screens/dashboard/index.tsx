import React from 'react';
import { DataStore, Predicates } from 'aws-amplify';
import { ErrorMessage, FullPageSpinner } from 'components';
import { useAsync } from 'core/hooks';
import { Project } from 'core/models';
import { ProjectPreview } from 'components/project-preview';

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
        {projects?.length
          ? projects.map((project: Project) => (
              <ProjectPreview key={project.id} project={project} />
            ))
          : null}
      </>
    );
  }

  return null;
}

export { DashboardScreen };
