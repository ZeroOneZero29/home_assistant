"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "homeassistant",
    synchronize: true,
    logging: true,
    entities: [User_1.User],
    subscribers: [],
    migrations: [],
});
exports.AppDataSource.initialize()
    .then(() => {
    // here you can start to work with your database
})
    .catch((error) => console.log(error));
//# sourceMappingURL=data-souse.js.map