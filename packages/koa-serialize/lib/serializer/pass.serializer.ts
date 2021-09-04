import { Json } from "@course-design/types";

import Serializer from "./serializer";

class PassSerializer<T> implements Serializer<T> {
  // eslint-disable-next-line class-methods-use-this
  serialize(value: T): Json {
    return value as unknown as Json;
  }
}

export default PassSerializer;
