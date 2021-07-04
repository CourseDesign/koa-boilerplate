import { Json, Type } from "@course-design/types";
import { toJSON } from "koa-serialize";

import Serializer from "./serializer";

class SerializerManager implements Serializer<unknown> {
  private readonly serializers = new Map<unknown, Serializer<unknown>>();

  private readonly dynamicSerializers = new Map<
    (value: unknown) => boolean,
    Serializer<unknown>
  >();

  private readonly replacer = (key: string, value: unknown) =>
    this.serialize(value);

  serialize(value: unknown): Json | Promise<Json> {
    const serializer = this.get(value);
    if (serializer != null) {
      return serializer.serialize(value);
    }

    return toJSON(value, this.replacer);
  }

  register<T>(type: Type<T>, serializer: Serializer<T>): SerializerManager {
    this.serializers.set(type.prototype, serializer);
    return this;
  }

  dynamicRegister<T>(
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

      // eslint-disable-next-line no-restricted-syntax
      for (const [selector, serializer] of this.dynamicSerializers) {
        if (selector(value)) {
          return serializer;
        }
      }

      return undefined;
    } catch {
      return undefined;
    }
  }
}

export default SerializerManager;
