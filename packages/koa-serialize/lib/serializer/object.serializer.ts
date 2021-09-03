import { Json, JsonObject } from "@course-design/types";

import Serializer from "./serializer";

// eslint-disable-next-line @typescript-eslint/ban-types
class ObjectSerializer<T extends object> implements Serializer<T> {
  constructor(private readonly serializer: Serializer<unknown>) {}

  async serialize(value: T): Promise<Json> {
    if (value == null) {
      return null;
    }

    const result: JsonObject = {};
    await Promise.all(
      // eslint-disable-next-line @typescript-eslint/no-shadow
      Object.entries(value).map(async ([key, value]) => {
        if (typeof key === "symbol") return;

        const parsed = await this.serializer.serialize(value);
        if (parsed !== undefined) {
          result[key] = parsed;
        }
      })
    );

    return result;
  }
}

export default ObjectSerializer;
