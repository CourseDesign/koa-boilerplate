import { Json } from "@course-design/types";

import Serializer from "./serializer";

// eslint-disable-next-line @typescript-eslint/ban-types
class MapSerializer<K extends Object, V> implements Serializer<Map<K, V>> {
  constructor(private readonly serializer: Serializer<unknown>) {}

  async serialize(value: Map<K, V>): Promise<Json> {
    const result: Record<string, Json> = {};
    await Promise.all(
      // eslint-disable-next-line @typescript-eslint/no-shadow
      Array.from(value.entries()).map(async ([key, value]) => {
        result[key.toString()] = await this.serializer.serialize(value);
      })
    );

    return result;
  }
}

export default MapSerializer;
