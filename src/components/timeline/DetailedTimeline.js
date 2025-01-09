import { formatDate } from '../../utils/dateUtils.js';

export function createTimelineItem(event) {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.id = `event-${event.id}`;
    item.innerHTML = `
        <div class="event-header">
            <div>
                <div class="event-title">${event.title}</div>
                <div class="event-date">${formatDate(event.date)} - ${event.category} - ${event.type}</div>
                <div class="severity-badge">Impact Level: ${event.severity}/5</div>
            </div>
            <div class="event-actions">
                <button class="edit-btn" onclick="openEditModal(${event.id})">Edit</button>
                <button class="delete-btn" onclick="deleteEvent(${event.id})">Delete</button>
            </div>
        </div>
        ${event.details ? `
            <div class="event-details">
                <strong>Medical Details:</strong>
                <p>${event.details}</p>
            </div>
        ` : ''}
        ${event.personalNotes ? `
            <div class="event-details">
                <strong>Personal Notes:</strong>
                <p>${event.personalNotes}</p>
            </div>
        ` : ''}
    `;
    return item;
}

export function displayEvents(events = []) {
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '';
    
    // Ensure events is an array
    const eventArray = Array.isArray(events) ? events : [];
    
    if (eventArray.length === 0) {
        timeline.innerHTML = '<div style="padding: 20px;">No events added yet</div>';
        return;
    }

    // Create a copy of the array before sorting
    const sortedEvents = [...eventArray].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sortedEvents.forEach(event => {
        timeline.appendChild(createTimelineItem(event));
    });
}
