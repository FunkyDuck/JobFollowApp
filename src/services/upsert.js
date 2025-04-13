export async function upsert(db, docId, diffFn) {
    try {
      const doc = await db.get(docId);
      const updated = diffFn({ ...doc });
  
      // Si diffFn n’a rien changé, on évite un PUT inutile
      if (JSON.stringify(updated) === JSON.stringify(doc)) {
        return { updated: false, doc };
      }
  
      return await db.put(updated);
    } catch (err) {
      if (err.status === 404) {
        const newDoc = diffFn({ _id: docId });
        return await db.put(newDoc);
      } else {
        throw err;
      }
    }
  }