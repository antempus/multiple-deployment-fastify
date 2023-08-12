import 'dotenv/config'

import fastify from 'fastify'
import services from './src/simple/index.mjs'


const app = fastify({
    logger: {
        level: 'debug'
    }
})

// segmented routes
app.register(async instance => {
    // simple loop to enable serices we want to use, change .env to enable/disable
    for (const service in services) {
        const { enableVar, registerFunction, name } = services[service]
        if (process.env[enableVar]) {
            app.log.info(`Registering ${name}`)
            registerFunction(instance)
            continue;
        }
        app.log.info(`Skipping ${name}`)
    }
})

app.listen({ port: 3000 }, (err) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
})