// https://www.twilio.com/blog/a-guide-to-node-js-logging-jp

import pino from "pino"
import expressPino from "express-pino-logger"

const level = process.env.NODE_ENV === "development" ? "debug" : "info"

export const logger = pino({ level })
export const expressLogger = expressPino({ logger })

logger.info(`Loglevel: ${level}`)