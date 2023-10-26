const resolvers = {
  Query: {
    projects: async (_, __, { fileDb }) => {
      return await fileDb.projects.getData("/");
    },
  },
  Mutation: {
    editProject: async (_, { id, input }, { fileDb }) => {
      const projects = await fileDb.projects.getData("/");
      const index = projects.findIndex((p) => `${p.id}` === `${id}`);

      if (index === -1) {
        throw new Error("Project not found");
      }

      const updatedProject = { ...projects[index], ...input };

      fileDb.projects.push(`/${index}`, updatedProject);

      return updatedProject;
    },
    deleteProject: async (_, { id }, { fileDb }) => {
      const projects = await fileDb.projects.getData("/");
      const index = projects.findIndex((p) => `${p.id}` === `${id}`);

      if (index === -1) {
        throw new Error("Project not found");
      }

      projects.splice(index, 1);

      fileDb.projects.push("/", projects);

      return true;
    },
  },
  Project: {
    users: async (project, _, { fileDataLoaders }) => {
      return fileDataLoaders.userLoader.load(project.id);
    },
    devices: async (project, _, { fileDataLoaders }) => {
      return fileDataLoaders.deviceLoader.load(project.id);
    },
  },
};

export default resolvers;
