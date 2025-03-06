import { object, string } from "zod"

export default object({
    name: string().min(3).max(255),
    email: string().email(),
    phone: string().min(9).max(15),
})
