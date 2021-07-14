import { Json, Type } from "@course-design/types";

import Serializer from "./serializer";

class SerializerManager implements Serializer<unknown> {
  private readonly serializers = new Map<unknown, Serializer<unknown>>();

  private readonly dynamicSerializers = new Map<
    (value: unknown) => boolean,
    Serializer<unknown>
  >();

  serialize(value: unknown): Json | Promise<Json> {
    const serializer = this.get(value);
    if (serializer != null) {
      return serializer.serialize(value);
    }

    throw new Error("Can't find serializer");
  }

  bind<T>(type: Type<T>, serializer: Serializer<T>): SerializerManager {
    this.serializers.set(type.prototype, serializer);
    return this;
  }

  dynamicBind<T>(
    selector: (value: unknown) => boolean,
    serializer: Serializer<T>
  ): SerializerManager {
    this.dynamicSerializers.set(selector, serializer);
    return this;
  }

  get<T>(value: T): Serializer<T> | undefined {
    try {
      let prototype = Object.getPrototypeOf(value);
      while (prototype != null) {
        const serializer = this.serializers.get(prototype);
        if (serializer != null) {
          return serializer;
        }
        prototype = Object.getPrototypeOf(prototype);
      }
      // eslint-disable-next-line no-empty
    } catch {}

    // eslint-disable-next-line no-restricted-syntax
    for (const [selector, serializer] of this.dynamicSerializers) {
      if (selector(value)) {
        return serializer;
      }
    }

    return undefined;
  }
}

export default SerializerManager;
