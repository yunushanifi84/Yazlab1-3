function bufferToBase64(buffer) {
    const base64Flag = 'data:image/jpeg;base64,';
    const imageS=buffer.toString('base64')
    return `${base64Flag}${imageS}`;
}

module.exports = bufferToBase64;