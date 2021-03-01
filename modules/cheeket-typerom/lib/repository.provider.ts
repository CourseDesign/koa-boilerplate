import { inSingletonScope, interfaces } from "cheeket";
import { Connection } from "typeorm";
import { EntityTarget } from "typeorm/common/EntityTarget";
import { Repository } from "typeorm/repository/Repository";

function repositoryProvider<ENTITY>(
  connectionToken: interfaces.Token<Connection>,
  target: EntityTarget<ENTITY>
): interfaces.Provider<Repository<ENTITY>> {
  return inSingletonScope(async (context) => {
    const connection = await context.resolve(connectionToken);
    return connection.getRepository(target);
  });
}

export default repositoryProvider;
