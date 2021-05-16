/** @jsxImportSource @emotion/react */
import { Project } from 'core/models';
import { Link } from 'react-router-dom';
import { theme } from 'core/theme';
import { Button } from 'components';
import { useDeleteProject } from 'core/hooks';
import { UpdateProject } from 'containers/update-project';

function ProjectPreview({ project }: { project: Project }) {
  const { id, title, description, startAt, endAt } = project;
  const { deleteProject } = useDeleteProject();

  return (
    <div
      css={{
        background: theme.colors.white,
        padding: theme.space[4],
        marginBottom: theme.space[3],
        borderRadius: theme.radii.lg,
      }}
    >
      <Link to={`/projects/${id}`}>
        <p>id: {id}</p>
        <p>title: {title}</p>
        <p>description: {description}</p>
        <p>start: {startAt}</p>
        <p>end: {endAt}</p>
      </Link>
      <div css={{ width: theme.sizes['1/2'], display: 'flex' }}>
        <UpdateProject project={project} />
        <Button
          onClick={() => deleteProject({ id })}
          variant="secondary"
          css={{ marginLeft: theme.sizes[4] }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export { ProjectPreview };
