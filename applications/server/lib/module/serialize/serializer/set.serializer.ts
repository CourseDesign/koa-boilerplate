import { Json } from "@course-design/types";

import Serializer from "./serializer";

class SetSerializer<T> implements Serializer<Set<T>> {
  constructor(private readonly serializer: Serializer<unknown>) {}

  serialize(value: Set<T>): Json | Promise<Json> {
    return this.serializer.serialize(Array.from(value.values()));
  }
}

export default SetSerializer;
