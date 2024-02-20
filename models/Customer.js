import User from "./User";

class Customer extends User {
  constructor(address, phone) {
    this.address = address;
    this.phone = phone;
  }
}

export default Customer;