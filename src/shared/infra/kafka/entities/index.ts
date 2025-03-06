interface IKafkaProducerBaseService {
    sendMessage(key: string, value: any): Promise<void>
}

export default IKafkaProducerBaseService;
