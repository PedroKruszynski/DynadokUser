import KafkaProducer from '@shared/infra/kafka/repositories';

export default class FakeKafkaUsers extends KafkaProducer {
  constructor() {
    super('users')
  }

  // eslint-disable-next-line no-unused-vars
  async sendMessage(_: string, __: any): Promise<void> {
    // Make nothing
  }
}
