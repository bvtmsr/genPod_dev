import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { ProjectStoreActions, ProjectStoreState } from './types';
import axiosMiddleware from 'src/api/axiosMiddleware';
import { Project } from 'reactflow';

export const useProjectStore = create<
  ProjectStoreState & ProjectStoreActions
>()(
  devtools(
    persist(
      immer((set, get) => {
        return {
          activeProject: [],
          projects: [],
          setActiveProject: projectId => {
          //  console.log('projectId', projectId);
            
            if (!projectId) return set(state => {
              return { activeProject: [] };
            });
            const activePro = get().projects.find(p => p.id == projectId);
              console.log('projectId', projectId, get().projects);
            return set(state => {
              console.log('-------------debug----------------');
              console.log('state.activeProject', activePro);
              
              const newActiveProject = state.activeProject.find(p => p.id == projectId)
                ? state.activeProject
                : [...state.activeProject, activePro];
                
                console.log('projectId', projectId, newActiveProject);
                
                console.log('-------------debugEnd ----------------');
                
              return { activeProject: newActiveProject };
            });
          },
          addProject: (newProject:Project) => {
            set(state => {
              const newActiveProject = [...state.activeProject, newProject];
              return { activeProject: newActiveProject };
            });
          },
          getProjects: () => {
            return get().activeProject;
          },
          setProjects: projects => {
            set({ projects });
          },
          refreshProjects: async () => {
            const { data } = await axiosMiddleware.get(`/projects`);
            const parsedData = JSON.parse(data as unknown as string);
            set({ projects: parsedData });
          },
          removeProject: project => {
            set(state => {
              const newProjects = state.projects.filter(
                p => p.id !== project.id
              );
              return { projects: newProjects };
            });
          }
        };
      }),
      {
        name: 'project-store',
        partialize: (state: ProjectStoreState) => {
          return {
            activeProject: state.activeProject,
            projects: state.projects
          };
        }
      }
    ),
    {
      name: 'project-store'
    }
  )
);
