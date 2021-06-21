import { sendSms } from '../lib/utils/twilio.js';
import Order from '../lib/models/Order.js';

export default class OrderService {
  static async create({ quantity }) {
    const order = await Order.insert({ quantity });

    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order Recieved for ${quantity}`
    );
    return order;
  }

  static async update({ quantity, id }) {
    const order = await Order.update({ quantity, id });

    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order has been updated to ${quantity}`
    );
    return order;
  }
}

