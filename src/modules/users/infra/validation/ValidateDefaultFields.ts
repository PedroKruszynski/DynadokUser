import { string } from "zod"

const objectIdSchema = string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export default {
    id: objectIdSchema,
    name: string().min(3).max(255),
    email: string().email(),
    phone: string().min(9).max(15),
}
