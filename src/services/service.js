import ChangesService from "./dao/mongodb/changes.service.js";
import ItemService from "./dao/mongodb/items.service.js";
import ChangesRepository from "./repository/changes.repository.js";
import ItemRepository from "./repository/items.repository.js";
import UserService from "./dao/mongodb/users.service.js";
import UserRepository from "./repository/users.repository.js";

const itemDAO = new ItemService();
const changesDAO = new ChangesService();
const userDAO = new UserService();

export const userService = new UserRepository(userDAO);
export const itemService = new ItemRepository(itemDAO);
export const changesService = new ChangesRepository(changesDAO);