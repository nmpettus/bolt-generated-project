import { saveToLocalStorage } from '../utils/storage.js';
import { showStatus } from '../utils/ui.js';
import { displayEvents, displayVisualTimeline } from '../components/timeline/index.js';
import { updateEventTypes } from './eventHandlers.js';

export function openEditModal(events, eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    document.getElementById('editEventId').value = event.id;
    document.getElementById('editEventDate').value = event.date;
    document.getElementById('editEventCategory').value = event.category;
    document.getElementById('editEventTitle').value = event.title;
    document.getElementById('editEventSeverity').value = event.severity;
    document.getElementById('editEventDetails').value = event.details;
    document.getElementById('editEventPersonalNotes').value = event.personalNotes;

    updateEventTypes(true);
    document.getElementById('editEventType').value = event.type;
    document.getElementById('editModal').style.display = 'block';
}

export function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

export function saveEdit(events) {
    const eventId = parseInt(document.getElementById('editEventId').value);
    const eventIndex = events.findIndex(e => e.id === eventId);

    if (eventIndex === -1) return events;

    const updatedEvent = {
        id: eventId,
        date: document.getElementById('editEventDate').value,
        category: document.getElementById('editEventCategory').value,
        type: document.getElementById('editEventType').value,
        title: document.getElementById('editEventTitle').value,
        severity: document.getElementById('editEventSeverity').value,
        details: document.getElementById('editEventDetails').value,
        personalNotes: document.getElementById('editEventPersonalNotes').value
    };

    const updatedEvents = [...events];
    updatedEvents[eventIndex] = updatedEvent;
    
    saveToLocalStorage(updatedEvents);
    closeEditModal();
    displayEvents(updatedEvents);
    displayVisualTimeline(updatedEvents);
    
    const editedElement = document.getElementById(`event-${eventId}`);
    if (editedElement) {
        editedElement.scrollIntoView({ behavior: 'smooth' });
        editedElement.style.backgroundColor = '#fff7ed';
        setTimeout(() => {
            editedElement.style.backgroundColor = '';
        }, 2000);
    }
    
    showStatus('Event updated successfully');
    return updatedEvents;
}
