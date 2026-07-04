import ProjectDetail from '@/components/ProjectDetail';
import { getProjectById, projects } from '@/data';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  const description =
    project.description.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').substring(0, 160);

  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      images: [project.sep],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description,
      images: [project.sep],
    },
  };
}

export default ProjectDetail;
