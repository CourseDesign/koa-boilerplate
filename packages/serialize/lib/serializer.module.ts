import { SimpleModule } from "@cheeket/koa";
import { Container, inContainerScope } from "cheeket";
import { Type } from "@course-design/types";

import { serializerManagerProvider } from "./provider";
import SerializeTokens from "./serialize.tokens";
import {
  ArraySerializer,
  DateSerializer,
  MapSerializer,
  NotPassSerializer,
  ObjectSerializer,
  PassSerializer,
  SerializerManager,
  SetSerializer,
} from "./serializer";
import Serializer from "./serializer/serializer";

export type SerializerModuleConfig = {
  register?: (serializerModule: SerializerModule) => void;
};

class SerializerModule extends SimpleModule {
  private readonly serializers = new Map<
    Type<unknown>,
    (manager: SerializerManager) => Serializer<unknown>
  >();

  private readonly dynamicSerializers = new Map<
    (value: unknown) => boolean,
    (manager: SerializerManager) => Serializer<unknown>
  >();

  private readonly serializerManagerProvider = inContainerScope(
    serializerManagerProvider()
  );

  constructor(config: SerializerModuleConfig) {
    super();

    const register = config?.register;
    if (register != null) {
      register(this);
    }
  }

  bind<T>(
    type: Type<T>,
    serializer: (manager: SerializerManager) => Serializer<T>
  ): SerializerModule {
    this.serializers.set(type, serializer);
    return this;
  }

  dynamicBind<T>(
    selector: (value: unknown) => boolean,
    serializer: (manager: SerializerManager) => Serializer<T>
  ): SerializerModule {
    this.dynamicSerializers.set(selector, serializer);
    return this;
  }

  configureRoot(container: Container): void {
    container.bind(
      SerializeTokens.SerializerManager,
      this.serializerManagerProvider.bind()
    );

    const listener = async (value: unknown, done: () => void) => {
      if (value instanceof SerializerManager) {
        Array.from(this.serializers.entries()).forEach(([type, provider]) => {
          const serializer = provider(value);
          value.bind(type, serializer);
        });
        Array.from(this.dynamicSerializers.entries()).forEach(
          ([type, provider]) => {
            const serializer = provider(value);
            value.dynamicBind(type, serializer);
          }
        );

        container.removeListener("create:async", listener);
      }

      done();
    };

    container.on("create:async", listener);
  }
}

export default SerializerModule;
