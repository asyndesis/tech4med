const resolvers = {
  Query: {
    projects: async (_, { filters }, { dataLoaders }) => {
      const projects = await dataLoaders.projectLoader.load(`${filters?.parentId ?? null}`);

      return projects?.filter((p) => `${p.parentId}` === `${filters?.parentId ?? null}`);
    },
    projectById: async (_, { id }, { db }) => {
      const projects = await db.projects.getData("/");
      return projects?.find((p) => `${p.id}` === `${id}`);
    },
  },
  Mutation: {
    editProject: async (_, { id, input }, { db }) => {
      const projects = await db.projects.getData("/");
      const index = projects.findIndex((p) => `${p.id}` === `${id}`);

      if (index === -1) {
        throw new Error("Project not found");
      }

      const updatedProject = { ...projects[index], ...input };

      db.projects.push(`/${index}`, updatedProject);

      return updatedProject;
    },
    deleteProject: async (_, { id }, { db }) => {
      const projects = await db.projects.getData("/");
      const index = projects.findIndex((p) => `${p.id}` === `${id}`);

      if (index === -1) {
        throw new Error("Project not found");
      }

      projects.splice(index, 1);

      db.projects.push("/", projects);

      return true;
    },
  },
  Project: {
    users: async (project, _, { dataLoaders }) => {
      return dataLoaders.userLoader.load(project.id);
    },
    devices: async (project, _, { dataLoaders }) => {
      return dataLoaders.deviceLoader.load(project.id);
    },
    projectsCount: async (project, _, { dataLoaders }) => {
      const projects = await dataLoaders.projectLoader.load(project.id);
      return projects?.length ?? 0;
    },
  },
};

export default resolvers;
