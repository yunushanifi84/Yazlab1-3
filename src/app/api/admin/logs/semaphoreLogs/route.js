import db from '@/lib/mongodb';
import SemaphoreLog from '@/models/SemaphoreLogModel';

// Tüm semaphore loglarını getiren endpoint
export async function GET(req) {
    try {

        // Tüm logları orderId ile birlikte getir
        const logs = await SemaphoreLog.find().populate('orderId');
        console.log('logs', logs);
        // Başarılı durumda logları döndür
        return new Response(JSON.stringify(logs), { status: 200 });
    } catch (error) {
        console.error('Error fetching semaphore logs:', error);
        return new Response(JSON.stringify({ error: 'Error fetching semaphore logs' }), { status: 500 });
    }
}
