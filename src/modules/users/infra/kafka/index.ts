import KafkaProducer from '@shared/infra/kafka/repositories';

export default class KafkaUsers extends KafkaProducer {
  constructor() {
    super('users')
  }
}
