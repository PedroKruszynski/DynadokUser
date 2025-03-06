import {
  Db, WithId, Document, InsertOneResult, ObjectId,
} from 'mongodb'
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

  public async createDocument<T>(data: T extends Document ? T : T & Document): Promise<InsertOneResult> {
    const collection = await this.getCollection();

    Object.assign(data, { createdAt: new Date(), updatedAt: new Date() });

    const result = await collection.insertOne(data);

    if (!result.acknowledged) {
      throw new Error('Failed to insert document');
    }

    return result
  }

  public async updateDocument<T>(data: T extends Document ? T : T & Document): Promise<boolean> {
    const collection = await this.getCollection();

    const newDocument = { ...data } as Document;
    const { id } = newDocument;
    delete newDocument.id;

    Object.keys(newDocument).forEach((key) => {
      if (newDocument[key] === undefined) {
        delete newDocument[key];
      }
    });
    Object.assign(newDocument, { updatedAt: new Date() });

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: newDocument },
      { upsert: false },
    );

    if (result.modifiedCount === 0) {
      throw new Error('Failed to update document');
    }

    return true
  }
}
