export type UserID = string;

export interface UserData {
  fname: string;
  lname?: string;
  email: string;
  contact: {
    mobile: string;
  };
  address: {
    street: number;
    pin: number;
    country: string;
  };
}

export interface User extends UserData {
  id: UserID;
}

type UserUpdate = Partial<UserData>;

export class InMemoryDB {
  private readonly db = new Map<UserID, User>();

  public insertUser(input: unknown): UserID {
    const user = this.validateUser(input);

    if (this.db.has(user.id)) {
      throw new Error(`User with ID ${user.id} already exists`);
    }

    this.db.set(user.id, user);
    return user.id;
  }

  public getUserById(id: UserID): User {
    this.validateId(id);
    const user = this.db.get(id);

    if (!user) {
      throw new Error(`User with ID ${id} does not exist`);
    }

    return this.cloneUser(user);
  }

  public getAllUsers(): User[] {
    return Array.from(this.db.values(), (user) => this.cloneUser(user));
  }

  public updateUser(id: UserID, input: unknown): User {
    this.validateId(id);
    const existingUser = this.db.get(id);

    if (!existingUser) {
      throw new Error(`User with ID ${id} does not exist`);
    }

    if (!this.isRecord(input)) {
      throw new Error("User update must be an object");
    }

    const updateData: UserUpdate = { ...input };
    const updatedUser = this.validateUser({
      ...existingUser,
      ...updateData,
      id,
    });

    this.db.set(id, updatedUser);
    return this.cloneUser(updatedUser);
  }

  public deleteUser(id: UserID): boolean {
    this.validateId(id);

    if (!this.db.has(id)) {
      throw new Error(`User with ID ${id} does not exist`);
    }

    return this.db.delete(id);
  }

  private validateUser(input: unknown): User {
    if (!this.isRecord(input)) {
      throw new Error("User must be an object");
    }

    const id = this.requireString(input.id, "id");
    const fname = this.requireString(input.fname, "fname");
    const lname =
      input.lname === undefined
        ? undefined
        : this.requireString(input.lname, "lname");
    const email = this.requireString(input.email, "email");

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      throw new Error("email must be a valid email address");
    }

    if (!this.isRecord(input.contact)) {
      throw new Error("contact must be an object");
    }

    const mobile = this.requireString(input.contact.mobile, "contact.mobile");
    if (!/^\+?[0-9][0-9\s-]{6,}$/.test(mobile)) {
      throw new Error("contact.mobile must be a valid phone number");
    }

    if (!this.isRecord(input.address)) {
      throw new Error("address must be an object");
    }

    const street = this.requirePositiveInteger(
      input.address.street,
      "address.street",
    );
    const pin = this.requirePositiveInteger(input.address.pin, "address.pin");
    const country = this.requireString(
      input.address.country,
      "address.country",
    );

    return {
      id,
      fname,
      ...(lname === undefined ? {} : { lname }),
      email,
      contact: { mobile },
      address: { street, pin, country },
    };
  }

  private validateId(id: UserID): void {
    if (typeof id !== "string" || id.trim() === "") {
      throw new Error("id must be a non-empty string");
    }
  }

  private requireString(value: unknown, field: string): string {
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error(`${field} must be a non-empty string`);
    }

    return value.trim();
  }

  private requirePositiveInteger(value: unknown, field: string): number {
    if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
      throw new Error(`${field} must be a positive integer`);
    }

    return value;
  }

  private isRecord(value: unknown): value is Record<string, any> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  private cloneUser(user: User): User {
    return {
      ...user,
      contact: { ...user.contact },
      address: { ...user.address },
    };
  }
}

const myDb = new InMemoryDB();

myDb.insertUser({
  id: "1",
  fname: "Piyush",
  email: "piyush@email.com",
  contact: { mobile: "9999999" },
  address: {
    country: "IN",
    pin: 147001,
    street: 1,
  },
});

myDb.updateUser("1", { lname: "Kumar" });
console.log(myDb.getUserById("1"));
