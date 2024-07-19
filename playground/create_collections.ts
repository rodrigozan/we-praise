import { MongoClient, ObjectId } from 'mongodb';

async function run() {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Conectado ao MongoDB');

        const db = client.db('wepraise');

        const usersCollection = db.collection('users');
        await usersCollection.insertMany([
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'hashed_password',
                profile: 'administrator',
                active: true,
                token: '',
                created_at: new Date(),
                instrument: 'guitar',
                sub_team: 'vocals',
            },
            {
                name: 'Editor User',
                email: 'editor@example.com',
                password: 'hashed_password',
                profile: 'editor',
                active: true,
                token: '',
                created_at: new Date(),
                instrument: 'bass',
                sub_team: 'band',
            },
            {
                name: 'Member User',
                email: 'member@example.com',
                password: 'hashed_password',
                profile: 'member',
                active: true,
                token: '',
                created_at: new Date(),
                instrument: 'drums',
                sub_team: 'band',
            },
        ]);

        const postsCollection = db.collection('posts');
        await postsCollection.insertMany([
            {
                title: 'First Article',
                content: 'This is the content of the first article.',
                author: new ObjectId(),
                created_at: new Date(),
                type: 'article',
                visibility: 'public',
                files: [],
            },
            {
                title: 'Second Video',
                content: 'This is the content of the second video.',
                author: new ObjectId(),
                created_at: new Date(),
                type: 'video',
                visibility: 'restricted',
                files: [],
            },
        ]);

        const schedulesCollection = db.collection('schedules');
        await schedulesCollection.insertMany([
            {
                title: 'Sunday Morning Service',
                date: new Date('2024-07-21T10:00:00'),
                service: 'morning',
                members: [new ObjectId(), new ObjectId()],
                songs: [new ObjectId(), new ObjectId()],
            },
            {
                title: 'Sunday Evening Service',
                date: new Date('2024-07-21T18:00:00'),
                service: 'night',
                members: [new ObjectId(), new ObjectId()],
                songs: [new ObjectId(), new ObjectId()],
            },
        ]);

        const messagesCollection = db.collection('messages');
        await messagesCollection.insertMany([
            {
                title: 'Meeting Reminder',
                content: 'Reminder for the meeting tomorrow.',
                author: new ObjectId(),
                sent_at: new Date(),
                recipients: [new ObjectId(), new ObjectId()],
            },
            {
                title: 'Service Update',
                content: 'Update regarding the upcoming service.',
                author: new ObjectId(),
                sent_at: new Date(),
                recipients: [new ObjectId(), new ObjectId()],
            },
        ]);

        console.log('Collections e documents success created');
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
