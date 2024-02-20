import db from ".";
import BaseModel from "./BaseModel";

class BaseModel {
  static insert(obj) {
    throw new Error('Method insert() must be implemented by derived class');
  }

  static update(id, obj) {
    throw new Error('Method update() must be implemented by derived class');
  }

  static delete(id, softDelete = true) {
    throw new Error('Method delete() must be implemented by derived class');
  }

  static getAll(searchObj) {
    throw new Error('Method getAll() must be implemented by derived class');
  }

  static getById(id) {
    throw new Error('Method getById() must be implemented by derived class');
  }
}

export default BaseModel;