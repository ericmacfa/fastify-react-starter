const getHealth = async (request, reply) => {
    return { status: 'UP' };
};

module.exports = { getHealth };
