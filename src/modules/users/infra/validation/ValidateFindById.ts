import { object } from "zod"

import ValidateDefaultFields from "./ValidateDefaultFields"

export default object({
    id: ValidateDefaultFields.id,
})
