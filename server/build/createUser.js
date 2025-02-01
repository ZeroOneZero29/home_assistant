"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./entity/User");
const data_souse_1 = require("./data-souse");
const user = new User_1.User();
user.name = "Me and Bears";
user.description = "TEST";
user.isPublished = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function createUser(user) {
    await data_souse_1.AppDataSource.manager.save(user);
    console.log("Photo has been saved. Photo id is", user.id);
}
createUser(user);
//# sourceMappingURL=createUser.js.map