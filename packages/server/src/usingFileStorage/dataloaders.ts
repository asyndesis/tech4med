import DataLoader from "dataloader";
import fileDb from "./db";

// Dataloaders will cache our data into memory so that
// we do not have to query our datapoints multiple times in our Type resolver queries
// https://github.com/graphql/dataloader
const batchUsersByProjectId = async (projectIds: string[]) => {
  const allUsers = await fileDb.users.getData("/");
  const usersGroupedByProjectId = {};

  projectIds.forEach((pid) => {
    usersGroupedByProjectId[pid] = allUsers.filter((user) => `${user.projectId}` === `${pid}`);
  });

  return projectIds.map((pid) => usersGroupedByProjectId[pid]);
};

const batchDevicesByProjectId = async (projectIds: string[]) => {
  const allDevices = await fileDb.devices.getData("/");
  const devicesGroupedByProjectId = {};
  projectIds.forEach((pid) => {
    devicesGroupedByProjectId[pid] = allDevices.filter(
      (device) => `${device.projectId}` === `${pid}`
    );
  });

  return projectIds.map((pid) => devicesGroupedByProjectId[pid]);
};

const userLoader = new DataLoader(batchUsersByProjectId);
const deviceLoader = new DataLoader(batchDevicesByProjectId);

export default { userLoader, deviceLoader };
