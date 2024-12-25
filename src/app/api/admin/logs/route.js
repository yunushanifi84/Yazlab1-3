import Log from '@/models/LogModel';
import CustomerLog from '@/models/CustomerLogModel';
import db from '@/lib/mongodb';
//tüm logları getir
export async function POST(req, res) {
    try {
        const body = await req.json();
        const {logType} = body;
        let logs;
        console.log(logType);
        if(logType === "admin") {
        logs = await Log.find({}, null, { sort: { LogDate: -1 } });
        } else {
        logs = await CustomerLog.find({}, null, { sort: { LogDate: -1 } });
        }
        console.log(logs);
        return new Response(JSON.stringify(logs), { status: 200 });
    } catch (error) {
        console.error("Error during fetch:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch logs' }), { status: 500 });
    }
}