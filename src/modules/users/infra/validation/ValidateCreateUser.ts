import { object, string } from "zod"

import ValidateDefaultFields from "./ValidateDefaultFields"

export default object({
    name: ValidateDefaultFields.name,
    email: ValidateDefaultFields.email,
    phone: ValidateDefaultFields.name,
})
