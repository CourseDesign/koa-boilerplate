import { interfaces } from "cheeket";
import { Connection, createConnection } from "typeorm";
import { ConnectionOptions } from "typeorm/connection/ConnectionOptions";

function connectionProvider(
  options: ConnectionOptions
): interfaces.Provider<Connection> {
  return async () => createConnection(options);
}

export default connectionProvider;
