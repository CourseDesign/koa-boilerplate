import SerializerManager from "./serializer-manager";
import DateSerializer from "./date.serializer";

class RootSerializer extends SerializerManager {
  private readonly dateSerializer = new DateSerializer();

  constructor() {
    super();

    this.register(Date, this.dateSerializer);
  }
}

export default RootSerializer;
