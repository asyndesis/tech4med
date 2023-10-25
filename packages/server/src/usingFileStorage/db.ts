import { JsonDB, Config } from "node-json-db";
import { join } from "path";

const baseDir = __dirname;

const createJsonDB = (filename: string) =>
  new JsonDB(new Config(join(baseDir, `data/${filename}`), true, true, "/"));

const fileDb = {
  devices: createJsonDB("device"),
  users: createJsonDB("user"),
  projects: createJsonDB("project"),
};

export default fileDb;
