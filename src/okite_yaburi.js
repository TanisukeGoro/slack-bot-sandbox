const axios = require('axios');
const { postMessage } = require('./utils');

const okite_yaburi = iiwake => {
    return `
${iiwake}のため、緊急リリース致します。
しょうがないんです、中橋さん。
`
};

const handleOkiteYaburi = async (channel_id, text) => {
    const iiwake = text || "母が急病";
    postMessage(channel_id, okite_yaburi(iiwake));
};

module.exports = handleOkiteYaburi;