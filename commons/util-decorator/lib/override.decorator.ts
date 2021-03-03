const override: MethodDecorator = (target, propertyKey) => {
  if (process.env.NODE_ENV !== "production") {
    const baseType = Object.getPrototypeOf(target);
    if (typeof baseType[propertyKey] !== "function") {
      throw new Error(
        `Method ${propertyKey.toString()} of ${
          target.constructor.name
        } does not override any base class method`
      );
    }
  }
};

export default override;
