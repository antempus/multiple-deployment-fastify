
export default async (instance) => {
    instance.route({
        method: "GET",
        url: '/alpha',
        handler: (_, reply) => {
            reply.send("hello from alpha")
        }
    })
}