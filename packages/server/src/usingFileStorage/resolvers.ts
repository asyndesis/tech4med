import { Resolvers, Project } from "../_types/graphql";

const resolvers: Resolvers = {
  Query: {
    projects: async (_, __, { fileDb }) => {
      return await fileDb.projects.getData("/");
    },
  },
  Mutation: {
    editProject: async (_, { id, input }, { fileDb }) => {
      // Fetch the existing projects
      const projects = await fileDb.projects.getData("/");
      const index = projects.findIndex((p: Project) => `${p.id}` === `${id}`);

      if (index === -1) {
        throw new Error("Project not found");
      }

      // Edit the project with the input
      const updatedProject = { ...projects[index], ...input };

      // Save the edited project back to the database using its index
      fileDb.projects.push(`/${index}`, updatedProject);

      return updatedProject; // Return the updated project
    },
    deleteProject: async (_, { id }, { fileDb }) => {
      // Fetch the existing projects
      const projects = await fileDb.projects.getData("/");
      const index = projects.findIndex((p: Project) => `${p.id}` === `${id}`);

      if (index === -1) {
        throw new Error("Project not found");
      }

      // Remove the project from the array
      projects.splice(index, 1);

      // Save the new list of projects to the database
      fileDb.projects.push("/", projects);

      return true; // Return true if the deletion was successful
    },
  },
  Project: {
    users: async (project: Project, _, { fileDataLoaders }) => {
      return fileDataLoaders.userLoader.load(project.id);
    },
    devices: async (project: Project, _, { fileDataLoaders }) => {
      return fileDataLoaders.deviceLoader.load(project.id);
    },
  },
};

export default resolvers;
