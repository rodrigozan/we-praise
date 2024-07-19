import { MongoClient, ObjectId } from 'mongodb';

async function run() {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Conectado ao MongoDB');

        const db = client.db('wepraise');

        async function getAllByUser(userId: string) {
            const userObjectId = new ObjectId(userId);

            const posts = await db.collection('posts').find({ author: userObjectId }).toArray();

            const schedules = await db.collection('schedules').find({ members: userObjectId }).toArray();

            const messages = await db.collection('messages').find({ author: userObjectId }).toArray();

            return { posts, schedules, messages };
        }

        const userId = 'ID_DO_USUARIO_AQUI';
        const userDocuments = await getAllByUser(userId);
        console.log(userDocuments);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
