import { useState, useEffect } from 'react';
import type { Project } from '../types/project';
import { projectService } from '../services/supabaseProjectService';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectService.getAll();
      // Normalize empty img strings to use first gallery image
      const normalizedData = data.map(project => ({
        ...project,
        img: project.img && project.img.trim() !== '' ? project.img : project.galeria[0] || ''
      }));
      setProjects(normalizedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, error, refetch: fetchProjects };
};

export const useProject = (id: number) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectService.getById(id);
      // Normalize empty img string to use first gallery image
      if (data) {
        const normalizedProject = {
          ...data,
          img: data.img && data.img.trim() !== '' ? data.img : data.galeria[0] || ''
        };
        setProject(normalizedProject);
      } else {
        setProject(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch project');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  return { project, loading, error, refetch: fetchProject };
};
