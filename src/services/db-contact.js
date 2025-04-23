import db from './db-core'

const addContactToApplication = async (builderFn) => {
    const now = new Date().toISOString()
    const emptyContact = {}
    const contact = builderFn(emptyContact) // applique les champs via la callback

    const doc = {
        _id: `contact:${crypto.randomUUID()}`,
        type: 'contact',
        created_at: now,
        updated_at: now,
        ...contact
    }
    
    try {
        await db.put(doc)
        console.log('Contact added')
        return doc 
    } catch (err) {
        console.error('Failed to add contact : ', err)
        throw err
    }
}

const updateContactToApplication = async (id, updates) => {
    try {
        const doc = await db.get(id)
        const updated = {
            ...doc,
            ...updates,
            updated_at: new Date().toISOString()
        }
        await db.put(updated)
        console.log('Contact updated')
    } catch (err) {
        console.error('Failed to update contact : ', err)
    }
}

const removeContactToApplication = async (id) => {
    try {
        const doc = await db.get(id)
        await db.remove(doc)
        console.log('Contact removed')
    } catch (err) {
        console.error('Failed to remove contact : ', err)
    }
}

const findContactsByApplication = async (applicationId) => {
    try {
        await db.createIndex({ index: { fields: ['type', 'application_id'] } })

        const result = await db.find({
            selector: {
                type: 'contact',
                application_id: applicationId
            }
        })

        return result.docs
    } catch (err) {
        console.error('Failed to search contacts : ', err)
        return []
    }
}

export {
    addContactToApplication,
    updateContactToApplication,
    removeContactToApplication,
    findContactsByApplication,
}