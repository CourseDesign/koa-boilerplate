import { Json } from "@course-design/types";

import Serializer from "./serializer";

class ArraySerializer<T> implements Serializer<T[]> {
  constructor(private readonly serializer: Serializer<unknown>) {}

  serialize(value: T[]): Promise<Json> {
    return Promise.all(
      value.map((element) => this.serializer.serialize(element))
    );
  }
}

export default ArraySerializer;
