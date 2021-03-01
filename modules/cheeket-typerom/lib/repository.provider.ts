import { inContainerScope, interfaces } from "cheeket";
import { Connection, EntityTarget, Repository } from "typeorm";

function repositoryProvider<ENTITY>(
  connectionToken: interfaces.Token<Connection>,
  target: EntityTarget<ENTITY>
): interfaces.Provider<Repository<ENTITY>> {
  return inContainerScope(async (context) => {
    const connection = await context.resolve(connectionToken);
    return connection.getRepository(target);
  });
}

export default repositoryProvider;
