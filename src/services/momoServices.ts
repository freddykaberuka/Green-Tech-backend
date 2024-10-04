import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

class MomoService {
  private primaryKey: string;
  private userId: string;
  private userSecret: string;
  private callbackHost: string;

  constructor() {
    this.primaryKey = process.env.MOMO_PRIMARY_KEY || '';
    this.userId = process.env.MOMO_USER_ID || '';
    this.userSecret = process.env.MOMO_USER_SECRET || '';
    this.callbackHost = process.env.MOMO_CALLBACK_HOST || 'http://localhost:4000';
  }

  async initiatePayment(phone: string, amount: string) {
    try {
      const { Collections } = require('mtn-momo').create({
        callbackHost: this.callbackHost,
      });

      const collections = Collections({
        userId: this.userId,
        userSecret: this.userSecret,
        primaryKey: this.primaryKey,
      });

      const transactionId = await collections.requestToPay({
        amount: amount,
        currency: 'RWF',
        externalId: uuidv4(),
        payer: {
          partyIdType: 'MSISDN',
          partyId: phone,
        },
        payerMessage: 'Payment for booking',
        payeeNote: 'Thank you for your payment',
      });

      return transactionId;
    } catch (error) {
      console.error('Error initiating payment:', error);
      throw new Error('Payment failed');
    }
  }
}

export default new MomoService();
