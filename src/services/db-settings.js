import db from './db-core'

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

export {
    resetDb
}