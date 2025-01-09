import { formatDate } from '../../utils/dateUtils.js';
import { showTooltip, hideTooltip } from '../../utils/ui.js';

export function createEventMarker(event, position, index) {
    const marker = document.createElement('div');
    marker.className = `event-marker category-${event.category} severity-${event.severity}`;
    marker.style.left = `${position}%`;
    marker.style.top = `${50 - (index * 20)}%`;

    marker.onmouseenter = (e) => {
        const tooltipContent = createTooltipContent(event);
        showTooltip(e, tooltipContent);
    };

    marker.onmouseleave = hideTooltip;
    marker.onclick = () => highlightDetailedEvent(event.id);

    return marker;
}

function createTooltipContent(event) {
    return `
        <strong>${event.title}</strong><br>
        <strong>Date:</strong> ${formatDate(event.date)}<br>
        <strong>Type:</strong> ${event.category} - ${event.type}<br>
        <strong>Impact Level:</strong> ${event.severity}/5
        ${event.details ? '<br><br><strong>Details:</strong><br>' + event.details : ''}
        ${event.personalNotes ? '<br><br><strong>Notes:</strong><br>' + event.personalNotes : ''}
    `;
}

function highlightDetailedEvent(eventId) {
    const detailElement = document.getElementById(`event-${eventId}`);
    if (detailElement) {
        detailElement.scrollIntoView({ behavior: 'smooth' });
        detailElement.style.backgroundColor = '#fff7ed';
        setTimeout(() => {
            detailElement.style.backgroundColor = '';
        }, 2000);
    }
}
