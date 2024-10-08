import ChangesService from "./dao/mongodb/changes.service.js";
import ItemService from "./dao/mongodb/items.service.js";
import ChangesRepository from "./repository/changes.repository.js";
import ItemRepository from "./repository/items.repository.js";

const itemDAO = new ItemService();
const changesDAO = new ChangesService();

export const itemService = new ItemRepository(itemDAO);
export const changesService = new ChangesRepository(changesDAO);