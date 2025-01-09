export function saveToLocalStorage(data, key = 'medicalTimelineEvents') {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.log(`Auto-save to localStorage failed for ${key}:`, e);
    }
}

export function loadFromLocalStorage(key = 'medicalTimelineEvents') {
    try {
        const savedData = localStorage.getItem(key);
        return savedData ? JSON.parse(savedData) : null;
    } catch (e) {
        console.log(`Loading from localStorage failed for ${key}:`, e);
        return null;
    }
}
