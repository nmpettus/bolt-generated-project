import { categories } from './config/categories.js';
import { loadFromLocalStorage } from './utils/storage.js';
import { displayEvents, displayVisualTimeline } from './components/timeline/index.js';
import { showTooltip, hideTooltip } from './utils/ui.js';
import { addEvent, updateEventTypes, updateEditEventTypes } from './handlers/eventHandlers.js';
import { openEditModal, closeEditModal, saveEdit } from './handlers/modalHandlers.js';
import { deleteEvent, exportData, importData, handleImport } from './handlers/dataHandlers.js';
import { createThemeSelector } from './components/ThemeSelector.js';
import { getCurrentTheme, applyTheme } from './utils/themeUtils.js';

// Initialize state
let events = loadFromLocalStorage() || [];

// Make functions available globally with proper state management
window.addEvent = () => {
    events = addEvent(events);
};

window.updateEventTypes = updateEventTypes;
window.updateEditEventTypes = updateEditEventTypes;

window.openEditModal = (eventId) => {
    openEditModal(events, eventId);
};

window.closeEditModal = closeEditModal;

window.saveEdit = () => {
    events = saveEdit(events);
};

window.deleteEvent = (id) => {
    events = deleteEvent(events, id);
};

window.exportData = () => {
    exportData(events);
};

window.importData = importData;

window.handleImport = (event) => {
    events = handleImport(event, events);
};

window.showTooltip = showTooltip;
window.hideTooltip = hideTooltip;

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add theme selector to the page
    const themeSelector = createThemeSelector();
    document.querySelector('.button-group').appendChild(themeSelector);

    // Apply current theme
    applyTheme(getCurrentTheme());

    // Initialize the rest of the application
    updateEventTypes();
    displayEvents(events);
    displayVisualTimeline(events);

    // Initialize modal click handler
    window.onclick = function(event) {
        const modal = document.getElementById('editModal');
        if (event.target === modal) {
            closeEditModal();
        }
    };
});
