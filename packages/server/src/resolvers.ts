import { IntID } from "./scalars";

const resolvers = {
  IntID,
  Query: {
    projectsByParentId: async (_, { filters, pagination }, { db }) => {
      // defaults to only showing non-deleted root-level (parentId === null) projects
      // if a parentId is supplied, we get direct children of that project
      let query = { parentId: { $eq: null } };

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
      const project = await db.projects.findOne({ id });
      return project;
    },
    allProjects: async (_, { filters, pagination }, { db }) => {
      let query = {};

      if (filters?.search) {
        query["title"] = {
          $regex: new RegExp(filters.title, "i"), // Case-insensitive search
        };
      }

      const rowCount = await db.projects.countDocuments(query);

      // Find projects based on the query
      const allProjects = await db.projects
        .find(query)
        .skip(pagination.page * pagination.pageSize)
        .limit(pagination.pageSize)
        .toArray();

      return {
        projects: allProjects,
        rowCount,
      };
    },
  },
  Mutation: {
    editProject: async (_, { id, input }, { db }) => {
      const updatedProject = await db.projects.findOneAndUpdate(
        { id },
        { $set: input },
        { returnDocument: "after" }
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
        { returnDocument: "after" }
      );

      if (!updatedProject) {
        throw new Error("Project not found");
      }

      return updatedProject;
    },
    restoreProject: async (_, { id }, { db }) => {
      const updatedProject = await db.projects.findOneAndUpdate(
        { id },
        { $set: { deleted: 0 } },
        { returnDocument: "after" }
      );

      if (!updatedProject) {
        throw new Error("Project not found");
      }

      return updatedProject;
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
    parentChain: async (project, _, { db }) => {
      const pipeline = [
        {
          $match: { id: project.id },
        },
        {
          $graphLookup: {
            from: "projects",
            startWith: "$parentId",
            connectFromField: "parentId",
            connectToField: "id",
            as: "ancestors",
            depthField: "depth",
          },
        },
        {
          $unwind: "$ancestors",
        },
        {
          $sort: { "ancestors.depth": -1 },
        },
        {
          $group: {
            _id: "$_id",
            parentChain: {
              $push: "$ancestors",
            },
          },
        },
        {
          $project: {
            parentChain: 1,
          },
        },
      ];

      const [result] = await db.projects.aggregate(pipeline).toArray();
      return result ? result.parentChain : [];
    },
  },
};

export default resolvers;
