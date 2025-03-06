import { ObjectId } from 'mongodb'

export default interface IBaseEntity {
  id: ObjectId
  created_at: Date
  updated_at: Date
}
