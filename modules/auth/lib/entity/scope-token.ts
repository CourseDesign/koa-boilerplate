import BaseEntity from "./base-entity";

class ScopeToken implements BaseEntity {
  id?: string;

  name: string;

  description?: string;

  updatedAt?: Date;

  createdAt?: Date;

  constructor(plain: { name: string; description?: string }) {
    this.name = plain.name;
    this.description = plain.description;
  }

  toString(): string {
    return this.name;
  }

  valueOf(): string | undefined {
    return this.id;
  }
}

export default ScopeToken;
