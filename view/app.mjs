import {Model} from "./model.mjs";
import {View} from "./view.mjs";
import {Controller} from "./controller.mjs";

const model = new Model()
const view = new View()
new Controller(model,view)