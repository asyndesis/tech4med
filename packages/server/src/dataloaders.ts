import DataLoader from "dataloader";

// learn about dataloaders here:
// https://www.apollographql.com/docs/apollo-server/data/fetching-data/

const createUserLoader = (db) =>
  new DataLoader(async (projectIds) => {
    const users = await db.users.find({ projectId: { $in: projectIds } }).toArray();
    const userMap = {};
    users.forEach((user) => {
      if (!userMap[user.projectId]) userMap[user.projectId] = [];
      userMap[user.projectId].push(user);
    });
    return projectIds.map((projectId: any) => userMap[projectId] || []);
  });

const createDeviceLoader = (db) =>
  new DataLoader(async (projectIds) => {
    const devices = await db.devices.find({ projectId: { $in: projectIds } }).toArray();
    const deviceMap = {};
    devices.forEach((device) => {
      if (!deviceMap[device.projectId]) deviceMap[device.projectId] = [];
      deviceMap[device.projectId].push(device);
    });
    return projectIds.map((projectId: any) => deviceMap[projectId] || []);
  });

const createProjectParentLoader = (db) =>
  new DataLoader(async (parentIds) => {
    const projects = await db.projects.find({ parentId: { $in: parentIds } }).toArray();
    const projectMap = {};
    projects.forEach((project) => {
      if (!projectMap[project.parentId]) projectMap[project.parentId] = [];
      projectMap[project.parentId].push(project);
    });
    return parentIds.map((parentId: any) => projectMap[parentId] || []);
  });

const createProjectLoader = (db) =>
  new DataLoader(async (projectIds) => {
    const projects = await db.projects.find({ id: { $in: projectIds } }).toArray();
    const projectMap = {};
    projects.forEach((project) => {
      projectMap[project.id] = project;
    });
    return projectIds.map((projectId: any) => projectMap[projectId]);
  });

export { createUserLoader, createDeviceLoader, createProjectParentLoader, createProjectLoader };
