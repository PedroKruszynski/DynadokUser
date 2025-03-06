import { object } from 'zod';
import ValidateDefaultFields from './ValidateDefaultFields';

export default object({
  id: ValidateDefaultFields.id,
  name: ValidateDefaultFields.name.optional(),
  email: ValidateDefaultFields.email.optional(),
  phone: ValidateDefaultFields.name.optional(),
});
