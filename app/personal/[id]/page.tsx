import ProjectDetail from '@/components/ProjectDetail';
import { getProjectById } from '@/data';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const description = project.description.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1').substring(0, 160) + "...";

  return {
    title: project.title,
    description: description,
    openGraph: {
      title: project.title,
      description: description,
      images: [project.thumbnail],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: description,
      images: [project.thumbnail],
    },
  };
}

export default ProjectDetail;
