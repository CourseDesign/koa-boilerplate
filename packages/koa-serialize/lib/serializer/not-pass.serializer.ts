import { Json } from "@course-design/types";

import Serializer from "./serializer";

class NotPassSerializer<T> implements Serializer<T> {
  // eslint-disable-next-line class-methods-use-this
  serialize(): Json {
    return undefined;
  }
}

export default NotPassSerializer;
