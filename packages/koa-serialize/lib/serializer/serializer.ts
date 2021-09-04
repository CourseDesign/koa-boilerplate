import { Json } from "@course-design/types";

interface Serializer<T> {
  serialize(value: T): Json | Promise<Json>;
}

export default Serializer;
