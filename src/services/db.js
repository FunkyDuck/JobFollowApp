import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import PouchDBUpsert from 'pouchdb-upsert';

PouchDB.plugin(PouchDBFind);
PouchDB.plugin(PouchDBUpsert);

const db = new PouchDB('jobfollow_db');

const addApplication = async (application) => {
    const now = new Date().toISOString();
    const doc = {
        _id: `application:${crypto.randomUUID()}`,
        type: 'application',
        created_at: now,
        updated_at: now,
        ...application
    }
    
    try {
        await db.put(doc);
        console.log('Application added');
    } catch (err) {
        console.error('Failed to add application : ', err);
    }
};

const updateApplication = async (id, updates) => {
    try {
        const doc = await db.get(id);
        const updated = {
            ...doc,
            ...updates,
            updated_at: new Date().toISOString()
        };
        await db.put(updated);
        console.log('Application updated');
    } catch (err) {
        console.error('Failed to update application : ', err);
    }
}

const removeCandidature = async (id) => {
    try {
        const doc = await db.get(id);
        await db.remove(doc);
        console.log('Application removed');
    } catch (err) {
        console.error('Failed to remove application : ', err);
    }
};

const findCandidatures = async (filter = {}) => {
    try {
        await db.createIndex({ index: { fields: ['type'] } });

        const result = await db.find({
            selector: {
                type: 'candidature',
                ...filter
            },
            sort: ['type']
        });

        return result.docs;
    } catch (err) {
        console.error('Failed to search applications : ', err);
        return [];
    }
};

export default db;
export {
    addApplication,
    updateApplication,
    removeCandidature,
    findCandidatures
};