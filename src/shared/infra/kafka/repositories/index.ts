import KafkaConnection from '@shared/infra/kafka';
import IKafkaProducerBaseService from '@shared/infra/kafka/entities';
import { Producer } from 'kafkajs';

export default class KafkaProducer implements IKafkaProducerBaseService {
  private producer: Producer;

  public topic: string;

  constructor(topic: string) {
    this.producer = KafkaConnection.getProducer();
    this.topic = topic;
  }

  async sendMessage(key: string, value: any): Promise<void> {
    await this.producer.send({
      topic: this.topic,
      messages: [{ key, value: JSON.stringify(value) }],
    });
  }
}
