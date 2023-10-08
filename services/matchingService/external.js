const crypto = require("crypto");

async function generateUID(username) {
    const cleaned = username.replace(/\s/g, '').toLowerCase();
    const hash = crypto.createHash('sha256').update(cleaned).digest('hex');
    return hash;
}

module.exports( generateUID );