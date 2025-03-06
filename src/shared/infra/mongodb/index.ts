import { MongoClient, Db } from 'mongodb'
import config from '@shared/environment'

class Database {
    private client: MongoClient
    private db: Db
    private uriConnection = `mongodb://${config.mongo.host}:${config.mongo.port}`
    
    constructor() {
        this.client = new MongoClient(this.uriConnection + config.mongo.database)
    }
    
    async connect() {
        if (!this.getDb()) {
            await this.client.connect()
            this.db = this.client.db(process.env.MONGODB_DB)
        }
        return this.getDb()
    }
    
    getDb() {
        return this.db
    }
}

export default new Database()