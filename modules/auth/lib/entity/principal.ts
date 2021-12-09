import ScopeToken from "./scope-token";

interface Principal {
  id?: string;
  scope: Set<ScopeToken>;
}

export default Principal;
