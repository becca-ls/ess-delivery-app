import DBClient from "../db/client.js";
import { Item, ItemDB } from "../types/item.js";
import envs from "../config/env.js";
import { mapObjectToString, mapObjectToUpdate } from "../utils/mapObject.js";
import { includePromotions } from "../utils/mapItems.js";

type ItemData = Partial<Item>;

export default class ItemService {
  private itemData: ItemData;

  constructor(data: ItemData) {
    this.itemData = { ...data };
  }

  static async insertItem(data: ItemData) {
    const db = new DBClient(<string>envs.DATABASE_URL).connect();

    const itemData = data;
    const categories = itemData.categories;
    delete itemData.categories;

    const { mappedKeys, mappedValues } = mapObjectToString(itemData);

    await new Promise<any>((resolve, reject) => {
      db.run(
        `INSERT INTO Item(${mappedKeys}) VALUES(${mappedValues})`,
        (err: any) => {

          if (err) {
            reject(err);
          }

          resolve(true);
        }
      );
    });

    const dataId = await new Promise<any>((resolve, reject) => {
      db.get(
        `SELECT MAX(id) as id FROM Item LIMIT 1;`,
        (err: any, data: any) => {
          if (err) {
            reject(err);
          }

          resolve(data);
        }
      );
    });

    let catString = categories ? categories?.reduce((prev, val, i) => {
      return (
        prev + `(${dataId.id}, ${val})${i !== categories.length - 1 ? "," : ""}`
        );
      }, "") : '';

    await new Promise<any>((resolve, reject) => {
      db.run(
        `INSERT INTO ItemCategory(itemId, categoryId) VALUES ${catString}`,
        (err: any) => {
          db.close();

          if (err) {
            reject(err);
          }

          resolve(true);
        }
      );
    })
  }

  static async updateItemCategories(categories: any[], itemId: any) {
    // @ts-ignore
    const db = new DBClient(<string>envs.DATABASE_URL).connect();

    const catString = categories?.reduce((prev: string, val: string, i) => {
      return (
        prev + `(${itemId}, ${val})${i !== categories.length - 1 ? "," : ""}`
      );
    }, "");

    // Deletar tudo
    await new Promise<any>((resolve, reject) => {
      db.run(
        `DELETE FROM ItemCategory WHERE itemId = ${itemId}`,
        (err: any) => {

          if (err) {
            reject(err);
          }

          resolve(true);
        }
      );
    });

    // Add tudo de novo
    await new Promise<any>((resolve, reject) => {
      db.run(
        `INSERT INTO ItemCategory(itemId, categoryId) VALUES ${catString}`,
        (err: any) => {
          db.close();

          if (err) {
            reject(err);
          }

          resolve(true);
        }
      );
    });
  }

  static async updateItem(data: ItemData) {
    // @ts-ignore
    const db = new DBClient(<string>envs.DATABASE_URL).connect();
    const itemData = data;

    await this.updateItemCategories(itemData.categories, itemData.id);
    delete itemData.categories;

    const mappedObjToString = mapObjectToUpdate(itemData);

    return new Promise<any>((resolve, reject) => {
      db.run(
        `UPDATE Item SET ${mappedObjToString} WHERE id = ${itemData.id}`,
        (err: any) => {
          db.close();

          if (err) {
            reject(err);
          }

          resolve(true);
        }
      );
    });
  }

  static deleteItem(id: number) {
    // @ts-ignore
    const db = new DBClient(<string>envs.DATABASE_URL).connect();

    return new Promise<any>((resolve, reject) => {
      db.run(`DELETE FROM Item WHERE id = ${id}`, (err: any) => {
        db.close();

        if (err) {
          reject(err);
        }

        resolve(true);
      });
    });
  }

  static async getItem(id: number) {
    const db = new DBClient(<string>envs.DATABASE_URL).connect();

    const item = await new Promise<ItemData>((resolve, reject) => {
      db.get(
        `SELECT * FROM Item WHERE id = ${id}`,
        (err: any, data: ItemData) => {
          db.close();

          if (err) {
            console.error(err.message);
            reject(err);
          }

          resolve(data);
        }
      );
    });

    if (!item) return null;

    const categories = await new Promise<any>((resolve, reject) => {
      db.get(
        `SELECT * FROM ItemCategory LEFT OUTER JOIN Promotions
                WHERE itemId = ${item.id}
                ORDER BY value DSC`,
        (err: any, data: any) => {
          db.close();

          if (err) {
            console.error(err.message);
            reject(err);
          }

          resolve(data);
        }
      );
    });

    item.categories = categories;

    return item;
  }

  static async getItemCategories(itemId: number) {
    const db = new DBClient(<string>envs.DATABASE_URL).connect();

    const categories = await new Promise<ItemDB[]>((resolve, reject) => {
      db.get(
        `SELECT C.id, C.name, C.description FROM Category C
            INNER JOIN ItemCategory IC
            ON C.id = IC.categoryId
            WHERE IC.itemId = ${itemId}`,
        (err: any, data: ItemDB[]) => {
          db.close();

          if (err) {
            console.error(err.message);
            reject(err);
          }

          resolve(data);
        }
      );
    });

    if (!categories) return [];

    return categories;
  }

  static async getCategoryPromotions() {
    const db = new DBClient(<string>envs.DATABASE_URL).connect();

    const categoryPromotions = await new Promise<any[]>((resolve, reject) => {
      db.get(
        `SELECT category_id, name, value, is_percent
                FROM Promotions
                WHERE active = 1
                ORDER BY value DESC`,
        (err: any, data: any[]) => {
          db.close();

          if (err) {
            console.error(err.message);
            reject(err);
          }

          resolve(data);
        }
      );
    });

    if (!categoryPromotions) return [];

    return categoryPromotions;
  }

  static async getItems(
    query?: string | undefined,
    supplierId?: number | undefined
  ) {
    const db = new DBClient(<string>envs.DATABASE_URL).connect();

    let filters = query ? `LOWER(I.name) LIKE ${query.toLowerCase()}` : "";
    filters += supplierId
      ? `${filters ? " AND " : ""}supplierId = ${supplierId}`
      : "";

    console.log(filters);

    const items = await new Promise<ItemDB[]>((resolve, reject) => {
      db.all(
        `SELECT * FROM Item
        ${filters ? `WHERE ${filters}` : ""}`,
        (err: any, data: ItemDB[]) => {
          db.close();

          if (err) {
            console.error(err.message);
            reject(err);
          }

          resolve(data);
        }
      );
    });

    if (!items) return [];
    return items;
  }
}
