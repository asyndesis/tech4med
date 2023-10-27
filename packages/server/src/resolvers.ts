import { IntID } from "./scalars";

const resolvers = {
  IntID,
  Query: {
    projects: async (_, { filters, pagination }, { db }) => {
      // defaults to only showing non-deleted root-level (parentId === null) projects
      let query = { deleted: 0, parentId: { $eq: null } };

      if (filters?.parentId) {
        query["parentId"] = filters.parentId;
      }

      const rowCount = await db.projects.countDocuments(query);

      const projects = await db.projects
        .find(query)
        .skip(pagination.page * pagination.pageSize)
        .limit(pagination.pageSize)
        .toArray();

      return {
        parentId: filters?.parentId,
        projects,
        rowCount,
      };
    },

    projectById: async (_, { id }, { db }) => {
      const project = await db.projects.findOne({ id, deleted: 0 });
      return project;
    },
  },
  Mutation: {
    editProject: async (_, { id, input }, { db }) => {
      const updatedProject = await db.projects.findOneAndUpdate(
        { id },
        { $set: input },
        { returnDocument: "after" } // Modified option
      );

      if (!updatedProject) {
        throw new Error("Project not found");
      }

      return updatedProject;
    },

    deleteProject: async (_, { id }, { db }) => {
      const updatedProject = await db.projects.findOneAndUpdate(
        { id },
        { $set: { deleted: 1 } },
        { returnOriginal: false }
      );

      if (!updatedProject) {
        throw new Error("Project not found");
      }

      return true;
    },
  },
  PaginatedProjects: {
    parentProject: async (parent, _, { dataLoaders }) => {
      if (parent.parentId) {
        return await dataLoaders.projectLoader.load(parent.parentId);
      }
    },
  },
  Project: {
    userIds: async (project, _, { dataLoaders }) => {
      const users = await dataLoaders.userLoader.load(project.id);
      return users.map((u) => u.appuserId);
    },
    deviceIds: async (project, _, { dataLoaders }) => {
      const devices = await dataLoaders.deviceLoader.load(project.id);
      return devices.map((d) => d.deviceId);
    },
    projectIds: async (project, _, { dataLoaders }) => {
      const projects = await dataLoaders.projectParentLoader.load(project.id);
      return projects.map((p) => p.id);
    },
    users: async (project, _, { dataLoaders }) => {
      return await dataLoaders.userLoader.load(project.id);
    },
    devices: async (project, _, { dataLoaders }) => {
      return await dataLoaders.deviceLoader.load(project.id);
    },
  },
};

export default resolvers;
