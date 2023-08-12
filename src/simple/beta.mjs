export default async (instance) => {
    instance.route({
        method: "GET",
        url: '/beta',
        handler: (_, reply) => {
            reply.send("hello from beta")
        }
    })
}