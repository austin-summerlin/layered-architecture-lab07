import pool from '../utils/pool.js';

export default class Order {
  id;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.quantity = row.quantity;
  }


  static async insert({ quantity }) {
    const { rows } = await pool.query(
      `INSERT INTO orders (quantity)
    VALUES ($1)
    RETURNING *`,
      [quantity]
    );

    return new Order(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);

    if (!rows[0]) return null;
    return new Order(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM orders');
    return rows.map(row => new Order(row));
  }

  static async update({ quantity, id }) {
    const { rows } = await pool.query(`
        UPDATE orders
        SET quantity = $1
        WHERE id = $2
        RETURNING *`, [quantity, id]);
    console.log(rows);
    return new Order(rows[0]);
  }
}

