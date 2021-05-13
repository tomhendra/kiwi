import { ErrorMessage, FullPageSpinner } from 'components';
import { useListProjects } from 'core/hooks';
import { Project } from 'core/models';
import { ProjectPreview } from 'components/project-preview';

function DashboardScreen() {
  const { projects, isIdle, isLoading, isError, isSuccess, error } =
    useListProjects();

  if (isIdle || isLoading) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return <ErrorMessage error={error as Error} />;
  }

  if (isSuccess) {
    return (
      <>
        <h2>Projects</h2>
        {projects.length
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
