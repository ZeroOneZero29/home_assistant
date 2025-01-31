import { User } from "./entity/User";
import { AppDataSource } from "./data-souse";

const user = new User();
user.name = "Me and Bears";
user.description = "TEST";
user.isPublished = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function createUser(user: any) {
  await AppDataSource.manager.save(user);
  console.log("Photo has been saved. Photo id is", user.id);
}
createUser(user);
