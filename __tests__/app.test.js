import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Order from '../lib/models/Order.js';

describe('layered routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('creates a new order and sends a text message', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 5 });

    expect(res.body).toEqual({ id: '1', quantity: 5 });
  });

  it('gets an order by id via GET', async () => {
    const order = await Order.insert({
      quantity: 5,
      id: 1
    });

    const res = await request(app).get(`/api/v1/orders/${order.id}`);
    expect(res.body).toEqual(order);
  });

  it('finds all orders via GET', async () => {
    const order1 = await Order.insert({
      quantity: 6543
    });
    const order2 = await Order.insert({
      quantity: 5123
    });
    const order3 = await Order.insert({
      quantity: 3123
    });

    const res = await request(app).get('/api/v1/orders');
    expect(res.body).toEqual([order1, order2, order3]);
  });

  it('updates an order by id via PUT', async () => {
    const order = await Order.insert({
      quantity: 234
    });
    const updatedOrder = ({
      id: '1',
      quantity: 230
    });

    const res = await request(app).put(`/api/v1/orders/${order.id}`).send(updatedOrder);
    expect(res.body).toEqual(updatedOrder);
  });
});

