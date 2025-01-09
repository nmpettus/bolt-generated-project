import { categories } from '../config/categories.js';
import { saveToLocalStorage } from '../utils/storage.js';
import { showStatus } from '../utils/ui.js';
import { displayEvents, displayVisualTimeline } from '../components/timeline/index.js';
import { 
    getFormValue, 
    getFormValues, 
    setFormValues, 
    populateSelect 
} from '../utils/domUtils.js';

export function addEvent(events) {
    const formData = getFormValues([
        'eventDate',
        'eventCategory',
        'eventType',
        'eventTitle',
        'eventSeverity',
        'eventDetails',
        'personalNotes'
    ]);

    if (!formData.eventDate || !formData.eventTitle) {
        showStatus('Please fill in at least the date and title', true);
        return events;
    }

    const newEvent = {
        id: Date.now(),
        date: formData.eventDate,
        category: formData.eventCategory,
        type: formData.eventType,
        title: formData.eventTitle,
        severity: formData.eventSeverity,
        details: formData.eventDetails,
        personalNotes: formData.personalNotes
    };

    const updatedEvents = [...events, newEvent];
    saveToLocalStorage(updatedEvents);
    displayEvents(updatedEvents);
    displayVisualTimeline(updatedEvents);
    clearForm();
    showStatus('Event added successfully');
    return updatedEvents;
}

export function updateEventTypes(isEdit = false) {
    const categoryId = isEdit ? 'editEventCategory' : 'eventCategory';
    const typeId = isEdit ? 'editEventType' : 'eventType';
    
    const category = getFormValue(categoryId);
    populateSelect(typeId, categories[category]);
}

// Export the edit version explicitly
export const updateEditEventTypes = () => updateEventTypes(true);

function clearForm() {
    setFormValues({
        eventDate: '',
        eventTitle: '',
        eventDetails: '',
        personalNotes: '',
        eventSeverity: '1'
    });
}
