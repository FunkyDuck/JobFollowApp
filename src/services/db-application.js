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
        const history = await addHistory(history => {
            history.application_id = doc._id
            history.status = doc.status
            history.date = doc.date_applied
            return history
        })
        doc.history = history
        return doc 
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

const addHistory = async (builderFn) => {
    const now = new Date().toISOString()
    const emptyHist = {}
    const history = builderFn(emptyHist)

    const doc = {
        _id: `application_history:${crypto.randomUUID()}`,
        type: 'application_history',
        created_at: now,
        ...history
    }

    try {
        await db.put(doc)
        console.log('ADD HISTORY /')
        console.log(doc)
        return doc
    } catch (error) {
        console.error('Problem to add Application history : ', error)
        throw new Error('On addHistory') 
    }
}

const updateHistory = async (id, updates) => {}

const removeHistory = async (id) => {}

const findHistory = async (applicationId) => {
    try {
        await db.createIndex({ index: { fields: ['type', 'application_id'] } })

        const result = await db.find({
            selector: {
                type: 'application_history',
                application_id: applicationId
            },
            sort: ['type']
        })

        console.log(result.docs)

        return result.docs
    } catch (error) {
        console.error('Failed to search Application History : ', error)
    }
}

export {
    addApplication,
    updateApplication,
    removeApplication,
    findApplications,
    addHistory,
    updateHistory,
    removeHistory,
    findHistory
}