const resolvers = {
  Query: {
    projects: async (_, { filters }, { db }) => {
      const projects = await db.projects.getData("/");
      return projects
        ?.filter((p) => `${p.parentId}` === `${filters?.parentId ?? null}`)
        ?.filter((p) => `${p.deleted}` === "0");
    },
    projectById: async (_, { id }, { db }) => {
      const projects = await db.projects.getData("/");
      return projects?.find((p) => `${p.id}` === `${id}` && `${p.deleted}` !== "1");
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

      const updatedProject = { ...projects[index], deleted: 1 };

      db.projects.push(`/${index}`, updatedProject);

      return true;
    },
  },
  Project: {
    userIds: async (project, _, { dataLoaders }) => {
      const users = await dataLoaders.userLoader.load(project.id);
      return users?.map((u) => u?.appuserId);
    },
    deviceIds: async (project, _, { dataLoaders }) => {
      const devices = await dataLoaders.deviceLoader.load(project.id);
      return devices?.map((d) => d?.deviceId);
    },
    projectIds: async (project, _, { dataLoaders }) => {
      const projects = await dataLoaders.projectLoader.load(project.id);
      return projects?.map((p) => p?.id);
    },
    users: async (project, _, { dataLoaders }) => {
      return dataLoaders.userLoader.load(project.id);
    },
    devices: async (project, _, { dataLoaders }) => {
      return dataLoaders.deviceLoader.load(project.id);
    },
  },
};

export default resolvers;
