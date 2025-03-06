interface IRedisBaseRepository {
    save(key: string, value: any): Promise<'OK'>
    recover(key: string): Promise<string | null>
    invalidate(key: string): Promise<number>
}

export default IRedisBaseRepository;
