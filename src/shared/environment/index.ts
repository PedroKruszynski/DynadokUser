import { env } from 'process';

require('dotenv').config();

interface IConfig {
    app: {
        env: string
        port: number
    }
    mongo: {
        host: string
        port: number
        database: string | undefined
    }
    redis: {
        disabled: boolean
        host: string
        port: number
    }
    kafka: {
        disabled: boolean
        brokers: string[]
        clientId: string
    }
}

const config : IConfig = {
  app: {
    env: env.NODE_ENV || 'development',
    port: Number(env.APP_PORT) || 3000,
  },
  mongo: {
    host: env.MONGO_HOST || 'localhost',
    port: Number(env.MONGO_PORT) || 27017,
    database: env.MONGO_DATABASE,
  },
  redis: {
    disabled: Boolean(env.REDIS_DISABLED) || false,
    host: env.REDIS_HOST || 'localhost',
    port: Number(env.REDIS_PORT) || 6379,
  },
  kafka: {
    disabled: Boolean(env.KAFKA_DISABLED) || false,
    brokers: env.KAFKA_BROKERS?.split(',') || ['localhost:9092'],
    clientId: env.KAFKA_CLIENT_ID || 'dynadok',
  },
}

export default config;
