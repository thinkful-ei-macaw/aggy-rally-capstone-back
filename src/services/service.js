/**
 * Extensible Knex instance class to interact with PSQL database
 */
class Service {

  /**
   * Instantiates the Service class
   * @param {string} table_name PSQL table to be queried
   */
  constructor(table_name) {
    this.table = table_name;
  }

  /**
   * returns a list of all items in the table
   * @param {{}} db an instance of the Knex database object
   */
  getAllItems(db) {
    return db
      .from(this.table)
      .select();
  }

  /**
   * returns a single item at the specified ID from the table
   * @param {{}} db an instance of the Knex database object
   * @param {string} id the ID of the record to be queried
   */
  getItemById(db, id) {
    return db
      .from(this.table)
      .select()
      .where({ id })
      .first();
  }

  getProfileByUid(db, userid) {
    return db
      .from(this.table)
      .select()
      .where({ userid })
      .first();
  }

  //
  getMatches(db, match) {
    return db
      .from(this.table)
      .select()
      .where({
        gamemaster: false,
        genre: match.genre,
        romance: match.romance,
        pvp: match.pvp
       })
  }

  /**
   * inserts a single item into the table
   * @param {{}} db an instance of the Knex database object
   * @param {{}} item object with data to be inserted
   */
  insertItem(db, item) {
    return db
      .into(this.table)
      .insert(item)
      .returning('*')
      .then(rows => rows[0]);
  }

  /**
   * updates a single item at the specified ID in the table
   * @param {{}} db an instance of the Knex database object
   * @param {string} id the ID of the record to be updated
   * @param {{}} data object with data to merge into the current record
   */
  updateItem(db, id, data) {
    return db
      .from(this.table)
      .where({ id })
      .update(data);
  }

  /**
   * removes a single record at the specified ID from the table
   * @param {{}} db an instance of the Knex database object
   * @param {string} id the ID of the record to be deleted
   */
  deleteItem(db, id) {
    return db
      .from(this.table)
      .where({ id })
      .delete();
  }
}

module.exports = Service;