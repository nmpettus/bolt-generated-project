import { saveToLocalStorage } from '../utils/storage.js';
import { showStatus } from '../utils/ui.js';
import { displayEvents, displayVisualTimeline } from '../components/timeline/index.js';

export function deleteEvent(events, id) {
    if (confirm('Are you sure you want to delete this event?')) {
        const updatedEvents = events.filter(event => event.id !== id);
        saveToLocalStorage(updatedEvents);
        displayEvents(updatedEvents);
        displayVisualTimeline(updatedEvents);
        showStatus('Event deleted successfully');
        return updatedEvents;
    }
    return events;
}

export function exportData(events) {
    if (events.length === 0) {
        showStatus('No events to export', true);
        return;
    }

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({events}, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `medical-timeline-${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    showStatus('Timeline exported successfully');
}

export function importData() {
    document.getElementById('importFile').click();
}

export function handleImport(event, currentEvents) {
    const file = event.target.files[0];
    if (!file) return currentEvents;

    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (importedData && Array.isArray(importedData.events)) {
                const updatedEvents = importedData.events;
                saveToLocalStorage(updatedEvents);
                displayEvents(updatedEvents);
                displayVisualTimeline(updatedEvents);
                showStatus('Timeline imported successfully');
                return updatedEvents;
            } else {
                showStatus('Invalid timeline format', true);
            }
        } catch (error) {
            console.error('Import error:', error);
            showStatus('Error importing timeline', true);
        }
    };
    
    reader.onerror = function() {
        showStatus('Error reading file', true);
    };
    
    reader.readAsText(file);
    return currentEvents;
}
