import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || '27017';
        const database = process.env.DB_DATABASE || 'files_manager';

        const url = `mongodb://${host}:${port}`;
        this.client = new MongoClient(url, { useUnifiedTopology: true });
        this.dbName = database;
        
        (async () => {
            try {
                await this.client.connect();
                console.log('Connected to MongoDB successfully');
            } catch (err) {
                console.error('Error connecting to MongoDB:', err);
            }
        })();
    }

    isAlive() {
        try {
            return !!this.client && !!this.client.db(this.dbName);
        } catch {
            return false;
        }
    }
       
    

    async nbUsers() {
        try {
            const db = this.client.db(this.dbName);
            const collection = db.collection('users');
            return await collection.countDocuments();
        } catch (err) {
            console.error('Error counting users:', err);
            return 0;
        }
    }
    
    async nbFiles() {
        try {
            const db = this.client.db(this.dbName);
            const collection = db.collection('files');
            return await collection.countDocuments();
        } catch (err) {
            console.error('Error counting files:', err);
            return 0;
        }
    }
}

const dbClient = new DBClient();
export default dbClient;
