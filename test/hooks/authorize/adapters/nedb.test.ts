import NeDB from "nedb";
import { Service } from "feathers-nedb";
import makeTests from "./makeTests";
import path from "path";
import { ServiceCaslOptions } from "../../../../lib/types";

// Create a NeDB instance
const Model = new NeDB({
  filename: path.join(__dirname, "../../../.data/tests.db"),
  autoload: true
});

declare module "@feathersjs/adapter-commons" {
  interface ServiceOptions {
    casl: ServiceCaslOptions
  }
}

const makeService = () => {
  return new Service({
    Model,
    multi: true,
    whitelist: ["$not", "$and"],
    casl: {
      availableFields: [
        "id", 
        "userId", 
        "hi", 
        "test", 
        "published",
        "supersecret", 
        "hidden"
      ]
    },
    paginate: {
      default: 10,
      max: 50
    }
  });
};
  
makeTests(
  "feathers-nedb", 
  makeService, 
  async (app, service) => { 
    await service.remove(null);
  },
  { adapter: "feathers-nedb" }
);