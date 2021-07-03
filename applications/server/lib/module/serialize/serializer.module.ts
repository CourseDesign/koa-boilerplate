import { SimpleModule } from "@cheeket/koa";
import { Container, inContainerScope } from "cheeket";
import {
  arraySerializerProvider,
  dateSerializerProvider,
  serializerManagerProvider,
} from "./provider";
import SerializeTokens from "./serialize.tokens";
import { SerializerManager } from "./serializer";

class SerializerModule extends SimpleModule {
  private readonly serializerManagerProvider = inContainerScope(
    serializerManagerProvider()
  );

  private readonly dateSerializerProvider = inContainerScope(
    dateSerializerProvider()
  );

  private readonly arraySerializerProvider = inContainerScope(
    arraySerializerProvider(SerializeTokens.SerializerManager)
  );

  configureRoot(container: Container): void {
    container.bind(
      SerializeTokens.SerializerManager,
      this.serializerManagerProvider.bind()
    );
    container.bind(
      SerializeTokens.DateSerializer,
      this.dateSerializerProvider.bind()
    );
    container.bind(
      SerializeTokens.ArraySerializer,
      this.arraySerializerProvider.bind()
    );

    const listener = async (value: unknown, done: () => void) => {
      if (value instanceof SerializerManager) {
        const dateSerializer = await container.resolve(
          SerializeTokens.DateSerializer
        );
        const arraySerializer = await container.resolve(
          SerializeTokens.ArraySerializer
        );

        value.register(Date, dateSerializer);
        value.register(Array, arraySerializer);

        container.removeListener("create:async", listener);
      }

      done();
    };

    container.on("create:async", listener);
  }
}

export default SerializerModule;
