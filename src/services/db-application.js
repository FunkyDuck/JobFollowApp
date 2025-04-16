import db from './db-core'

const addApplication = async (builderFn) => {
    const now = new Date().toISOString()
    const emptyApp = {}
    const application = builderFn(emptyApp) // applique les champs via la callback

    const doc = {
        _id: `application:${crypto.randomUUID()}`,
        type: 'application',
        created_at: now,
        updated_at: now,
        ...application
    }
    
    try {
        await db.put(doc)
        console.log('Application added')
        return doc // tu peux retourner le doc pour le récupérer ensuite si besoin
    } catch (err) {
        console.error('Failed to add application : ', err)
        throw err
    }
}

const updateApplication = async (id, updates) => {
    try {
        const doc = await db.get(id)
        const updated = {
            ...doc,
            ...updates,
            updated_at: new Date().toISOString()
        }
        await db.put(updated)
        console.log('Application updated')
    } catch (err) {
        console.error('Failed to update application : ', err)
    }
}

const removeApplication = async (id) => {
    try {
        const doc = await db.get(id)
        await db.remove(doc)
        console.log('Application removed')
    } catch (err) {
        console.error('Failed to remove application : ', err)
    }
}

const findApplications = async (filter = {}) => {
    try {
        await db.createIndex({ index: { fields: ['type'] } })

        const result = await db.find({
            selector: {
                type: 'application',
                ...filter
            },
            sort: ['type']
        })

        return result.docs
    } catch (err) {
        console.error('Failed to search applications : ', err)
        return []
    }
}

export {
    addApplication,
    updateApplication,
    removeApplication,
    findApplications
}