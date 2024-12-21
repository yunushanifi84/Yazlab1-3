import Log from "@/models/LogModel";

//İd'ye göre log getir
export async function GET(req, { params }) {
    try {
        const { logId } = params;
        const log = await Log.findById(logId);

        if (!log) {
            return new Response(JSON.stringify({ error: 'Log not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(log), { status: 200 });
    } catch (error) {
        console.error("Error fetching log:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch log' }), { status: 500 });
    }
}