import { Db, WithId, Document } from 'mongodb'
import Database from '..'

export default class BaseRepository {
    private db: Db
    private collectionName: string

    constructor(collectionName: string) {
        this.collectionName = collectionName
        this.db = Database.getDb()
    }

    public async getCollection() {
        return this.db.collection(this.collectionName)
    }

    public DocumentToObject<T>(document: WithId<Document>): T {
        const object = { ...document, id: document._id } as T;
        delete (object as any)._id;
    
        return object;
    }
}