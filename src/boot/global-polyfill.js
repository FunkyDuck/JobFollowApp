// Patch pour que les libs Node-like fonctionnent dans le navigateur
if (typeof global === 'undefined') {
    // Assure la compatibilité avec pouchdb-upsert
    window.global = window;
}