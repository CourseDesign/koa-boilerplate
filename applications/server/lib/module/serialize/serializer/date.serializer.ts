import { Json } from "@course-design/types";

import Serializer from "./serializer";

class DateSerializer implements Serializer<Date> {
  // eslint-disable-next-line class-methods-use-this
  serialize(value: Date): Json {
    return value.valueOf();
  }
}

export default DateSerializer;
