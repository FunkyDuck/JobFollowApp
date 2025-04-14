import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
// import { upsert } from './upsert';

PouchDB.plugin(PouchDBFind);

const db = new PouchDB('jobfollow_db');

const addApplication = async (builderFn) => {
    const now = new Date().toISOString();
    const emptyApp = {};
    const application = builderFn(emptyApp); // applique les champs via la callback

    const doc = {
        _id: `application:${crypto.randomUUID()}`,
        type: 'application',
        created_at: now,
        updated_at: now,
        ...application
    };
    
    try {
        await db.put(doc);
        console.log('Application added');
        return doc; // tu peux retourner le doc pour le récupérer ensuite si besoin
    } catch (err) {
        console.error('Failed to add application : ', err);
        throw err;
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
                type: 'application',
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

const resetDb = async () => {
    try {
        const docs = await db.allDocs()
        const deletions = docs.rows.map(row =>({
            _id: row.id,
            _rev: row.value.rev,
            _deleted: true
        }))
        await db.bulkDocs(deletions)
        console.log('Database wiped clean')
    } catch (err) {
        console.error('Failed to reset database : ', err)
    }
}

export default db;
export {
    addApplication,
    updateApplication,
    removeCandidature,
    findCandidatures,
    resetDb
};