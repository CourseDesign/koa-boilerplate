import { Json, Type } from "@course-design/types";
import { toJSON } from "koa-serialize";

import Serializer from "./serializer";

class SerializerManager implements Serializer<unknown> {
  readonly serializers = new Map<unknown, Serializer<unknown>>();

  serialize(value: unknown): Json | Promise<Json> {
    const serializer = this.get(value);
    if (serializer != null) {
      return serializer.serialize(value);
    }

    return toJSON(value);
  }

  register<T>(type: Type<T>, serializer: Serializer<T>): SerializerManager {
    this.serializers.set(type.prototype, serializer);
    return this;
  }

  get<T>(value: T): Serializer<T> | undefined {
    let prototype = Object.getPrototypeOf(value);
    while (prototype != null) {
      const serializer = this.serializers.get(prototype);
      if (serializer != null) {
        return serializer;
      }
      prototype = Object.getPrototypeOf(prototype);
    }

    return undefined;
  }
}

export default SerializerManager;
