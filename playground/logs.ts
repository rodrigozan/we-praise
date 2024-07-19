import { MongoClient, ObjectId } from 'mongodb';

async function run() {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Conectado ao MongoDB');

        const db = client.db('we_praise');

        const logsCollection = db.collection('logs');

        async function logCreation(collectionName: string, document: any) {
            await logsCollection.insertOne({
                event: 'create',
                collection: collectionName,
                documentId: document._id,
                timestamp: new Date()
            });
        }

        async function logUserActivity(userId: string, activity: 'login' | 'logout') {
            await logsCollection.insertOne({
                event: activity,
                userId: new ObjectId(userId),
                timestamp: new Date()
            });
        }

        const usersCollection = db.collection('users');
        const newUser = {
            _id: new ObjectId(),
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'hashed_password',
            profile: 'administrator',
            active: true,
            token: '',
            created_at: new Date(),
            instrument: 'guitar',
            sub_team: 'vocals',
        };
        await usersCollection.insertOne(newUser);
        await logCreation('users', newUser);

        const postsCollection = db.collection('posts');
        const newPost = {
            title: 'First Article',
            content: 'This is the content of the first article.',
            author: newUser._id,
            created_at: new Date(),
            type: 'article',
            visibility: 'public',
            files: [],
        };
        await postsCollection.insertOne(newPost);
        await logCreation('posts', newPost);

        const schedulesCollection = db.collection('schedules');
        const newSchedule = {
            title: 'Sunday Morning Service',
            date: new Date('2024-07-21T10:00:00'),
            service: 'morning',
            members: [newUser._id],
            songs: [],
        };
        await schedulesCollection.insertOne(newSchedule);
        await logCreation('schedules', newSchedule);

        const messagesCollection = db.collection('messages');
        const newMessage = {
            title: 'Meeting Reminder',
            content: 'Reminder for the meeting tomorrow.',
            author: newUser._id,
            sent_at: new Date(),
            recipients: [newUser._id],
        };
        await messagesCollection.insertOne(newMessage);
        await logCreation('messages', newMessage);

        const userId = newUser._id.toString();
        await logUserActivity(userId, 'login');
        console.log('Usuário logado');

        await new Promise(resolve => setTimeout(resolve, 2000));
        await logUserActivity(userId, 'logout');
        console.log('Usuário deslogado');

        console.log('Collections e logs criados com sucesso');
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
