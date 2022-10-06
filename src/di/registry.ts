import { type Container, container } from "./containers.ts";
import { useContainerBuilder } from "./use-container-builder.ts";

// interface definitions
// ---------------------
// deno-lint-ignore no-explicit-any
type Registry = Container<string | symbol, any>;

// implementation (public)
// -----------------------
// this field is used to store service objects
// deno-lint-ignore no-explicit-any
const registry: Registry = container<string | symbol, any>();

const getService = registry.get;
const setServiceValue = registry.setValue;
const setServiceFactory = registry.setFactory;

const useRegistry = useContainerBuilder(registry);

export {
  type Container,
  getService,
  type Registry,
  registry,
  registry as default,
  setServiceFactory,
  setServiceValue,
  useRegistry,
};
