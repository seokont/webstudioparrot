import { listPortfolio } from '../utils/portfolio-store'

export default defineEventHandler(async event => listPortfolio(event))
