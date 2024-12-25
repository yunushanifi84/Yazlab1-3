function bufferToBase64(data) {
    if (data && data.type === 'Buffer' && Array.isArray(data.data)) {
        // Buffer yapısını yeniden oluştur
        const buffer = Buffer.from(data.data);
        
        // Base64'e dönüştür
        const base64Flag = 'data:image/jpeg;base64,';
        const base64String = buffer.toString('base64');
        return `${base64Flag}${base64String}`;
    } else {
        console.error('Invalid Buffer data:', data);
        return null;
    }
}

module.exports = bufferToBase64;