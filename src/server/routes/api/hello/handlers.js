const getHello = async function(request, reply) {
    reply.send('Hello from the server!');
};

module.exports = { getHello };
