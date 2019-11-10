import Level from "../level.js";
import { EntityFactories, json_File_Names } from "../IAT.js";
export declare function createLevelLoader(entotiFactory: EntityFactories): (name: json_File_Names) => Promise<Level>;
