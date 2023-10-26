import DataLoader from "dataloader";
import db from "./db";

// Dataloaders will cache our data into memory so that
// we do not have to query our datapoints multiple times in our Type resolver queries
// https://github.com/graphql/dataloader
const batchUsersByProjectId = async (projectIds: string[]) => {
  const allUsers = await db.users.getData("/");
  const usersGroupedByProjectId = {};

  projectIds.forEach((pid) => {
    usersGroupedByProjectId[pid] = allUsers.filter((user) => `${user.projectId}` === `${pid}`);
  });

  return projectIds.map((pid) => usersGroupedByProjectId[pid]);
};

const batchDevicesByProjectId = async (projectIds: string[]) => {
  const allDevices = await db.devices.getData("/");
  const devicesGroupedByProjectId = {};
  projectIds.forEach((pid) => {
    devicesGroupedByProjectId[pid] = allDevices.filter(
      (device) => `${device.projectId}` === `${pid}`
    );
  });

  return projectIds.map((pid) => devicesGroupedByProjectId[pid]);
};

const batchProjectsByParentId = async (parentIds: string[]) => {
  const allProjects = await db.projects.getData("/"); // assuming your projects data is located at db.projects
  const projectsGroupedByParentId = {};

  parentIds.forEach((parentId) => {
    projectsGroupedByParentId[parentId] = allProjects.filter(
      (project) => `${project.parentId}` === `${parentId}`
    );
  });

  return parentIds.map((parentId) => projectsGroupedByParentId[parentId]);
};

const cacheKeyFn = (prefix) => (key) => `${prefix}:${key}`;

const userLoader = new DataLoader(batchUsersByProjectId, { cacheKeyFn: cacheKeyFn("user") });
const deviceLoader = new DataLoader(batchDevicesByProjectId, { cacheKeyFn: cacheKeyFn("device") });
const projectLoader = new DataLoader(batchProjectsByParentId, {
  cacheKeyFn: cacheKeyFn("project"),
});

export default { userLoader, deviceLoader, projectLoader };
