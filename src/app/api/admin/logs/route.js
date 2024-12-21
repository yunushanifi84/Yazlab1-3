import Log from '@/models/LogModel';

//tüm logları getir
export async function GET(req, res) {
    try {
        const logs = await Log.find({});
        return new Response(JSON.stringify(logs), { status: 200 });
    } catch (error) {
        console.error("Error during fetch:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch logs' }), { status: 500 });
    }
}