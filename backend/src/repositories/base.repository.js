const Database = require('../database');  // Caminho correto para o arquivo
const BaseEntity = require('../entities/base.entity');
const { HttpInternalServerError } = require('../utils/errors/http.error');
const { v4: uuidv4 } = require('uuid');

class BaseRepository {
  constructor(prefix) {
    this.prefix = prefix;
    this.db = Database.getInstance();
  }

  async add(data) {
    try {
      if (!this.db.data[this.prefix]) {
        this.db.data[this.prefix] = [];
      }
      const newItem = {
        ...data,
        id: uuidv4(),
      };
      this.db.data[this.prefix].push(newItem);
      return newItem;
    } catch (e) {
      throw new HttpInternalServerError();
    }
  }

  async update(filter, data) {
    try {
      if (!this.db.data[this.prefix]) {
        return null;
      }
      const item = this.db.data[this.prefix].find(filter);
      if (item) {
        delete data.id;
        Object.assign(item, data);
        return item;
      }
      return null;
    } catch (e) {
      throw new HttpInternalServerError();
    }
  }

  async findOne(filter) {
    try {
      if (!this.db.data[this.prefix]) {
        return null;
      }
      return this.db.data[this.prefix].find(filter) || null;
    } catch (e) {
      throw new HttpInternalServerError();
    }
  }

  async findAll(filter) {
    try {
      if (!this.db.data[this.prefix]) {
        return [];
      }
      return filter
        ? this.db.data[this.prefix].filter(filter)
        : this.db.data[this.prefix];
    } catch (e) {
      throw new HttpInternalServerError();
    }
  }

  async delete(filter) {
    try {
      if (!this.db.data[this.prefix]) {
        return;
      }

      this.db.data[this.prefix] = this.db.data[this.prefix].filter(filter);
    } catch (e) {
      throw new HttpInternalServerError();
    }
  }
}

module.exports = BaseRepository;






// import Database from '../database';
// import BaseEntity from '../entities/base.entity';
// import { HttpInternalServerError } from '../utils/errors/http.error';
// import { v4 as uuidv4 } from 'uuid';

// type FilterFunction<T> = (item: T) => boolean;

// export default class BaseRepository<T extends BaseEntity> {
//   private prefix: string;
//   private db: Database;

//   constructor(prefix: string) {
//     this.prefix = prefix;
//     this.db = Database.getInstance();
//   }

//   public async add(data: T): Promise<T> {
//     try {
//       if (!this.db.data[this.prefix]) {
//         this.db.data[this.prefix] = [];
//       }
//       const newItem = {
//         ...data,
//         id: uuidv4(),
//       };
//       this.db.data[this.prefix].push(newItem);
//       return newItem;
//     } catch (e) {
//       throw new HttpInternalServerError();
//     }
//   }

//   public async update(
//     filter: FilterFunction<T>,
//     data: Partial<T>
//   ): Promise<T | null> {
//     try {
//       if (!this.db.data[this.prefix]) {
//         return null;
//       }
//       const item = this.db.data[this.prefix].find(filter);
//       if (item) {
//         delete data.id;
//         Object.assign(item, data);
//         return item;
//       }
//       return null;
//     } catch (e) {
//       throw new HttpInternalServerError();
//     }
//   }

//   public async findOne(filter: FilterFunction<T>): Promise<T | null> {
//     try {
//       if (!this.db.data[this.prefix]) {
//         return null;
//       }
//       return this.db.data[this.prefix].find(filter) || null;
//     } catch (e) {
//       throw new HttpInternalServerError();
//     }
//   }

//   public async findAll(filter?: FilterFunction<T>): Promise<T[]> {
//     try {
//       if (!this.db.data[this.prefix]) {
//         return [];
//       }
//       return filter
//         ? this.db.data[this.prefix].filter(filter)
//         : this.db.data[this.prefix];
//     } catch (e) {
//       throw new HttpInternalServerError();
//     }
//   }

//   public async delete(filter: FilterFunction<T>): Promise<void> {
//     try {
//       if (!this.db.data[this.prefix]) {
//         return;
//       }

//       this.db.data[this.prefix] = this.db.data[this.prefix].filter(filter);
//     } catch (e) {
//       throw new HttpInternalServerError();
//     }
//   }
// }
