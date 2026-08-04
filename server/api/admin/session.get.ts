import { isAdmin } from '../../utils/auth'

export default defineEventHandler(async event => ({ authenticated: await isAdmin(event) }))
