import { formatDate, getYearWindow, getAllMonthsBetween, calculateTimelineWidth, isDateInRange } from '../utils/dateUtils.js';

let currentViewDate = new Date();

export function createVisualTimeline(events, container) {
    container.innerHTML = '';
    
    const timelineLine = document.createElement('div');
    timelineLine.className = 'timeline-line';
    container.appendChild(timelineLine);

    if (events.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.padding = '20px';
        emptyMessage.textContent = 'No events added yet';
        container.appendChild(emptyMessage);
        return;
    }

    // Get the year window for the current view
    const { startDate, endDate } = getYearWindow(events, currentViewDate);
    const timeRange = endDate.getTime() - startDate.getTime();
    const months = getAllMonthsBetween(startDate, endDate);

    // Set timeline width based on number of months
    const timelineWidth = calculateTimelineWidth(startDate, endDate);
    container.style.width = `${timelineWidth}px`;

    // Create navigation buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'timeline-nav prev';
    prevButton.innerHTML = '←';
    prevButton.onclick = () => {
        currentViewDate.setMonth(currentViewDate.getMonth() - 12);
        createVisualTimeline(events, container);
    };

    const nextButton = document.createElement('button');
    nextButton.className = 'timeline-nav next';
    nextButton.innerHTML = '→';
    nextButton.onclick = () => {
        currentViewDate.setMonth(currentViewDate.getMonth() + 12);
        createVisualTimeline(events, container);
    };

    container.appendChild(prevButton);
    container.appendChild(nextButton);

    // Create month markers and labels
    months.forEach(monthDate => {
        const position = ((monthDate.getTime() - startDate.getTime()) / timeRange) * 100;
        
        const marker = document.createElement('div');
        marker.className = 'month-marker';
        marker.style.left = `${position}%`;
        container.appendChild(marker);

        const label = document.createElement('div');
        label.className = 'month-label';
        label.textContent = monthDate.toLocaleDateString('en-US', { 
            month: 'short', 
            year: 'numeric' 
        });
        label.style.left = `${position}%`;
        container.appendChild(label);
    });

    // Filter and sort events within the current window
    const visibleEvents = events
        .filter(event => isDateInRange(event.date, startDate, endDate))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Group events by date
    const eventsByDate = new Map();
    visibleEvents.forEach(event => {
        const dateKey = event.date;
        if (!eventsByDate.has(dateKey)) {
            eventsByDate.set(dateKey, []);
        }
        eventsByDate.get(dateKey).push(event);
    });

    // Create event markers
    eventsByDate.forEach((dateEvents, dateKey) => {
        const eventDate = new Date(dateKey).getTime();
        const horizontalPosition = ((eventDate - startDate.getTime()) / timeRange) * 100;

        dateEvents.forEach((event, index) => {
            const verticalOffset = index * 25;
            
            const markerContainer = document.createElement('div');
            markerContainer.className = 'event-marker-container';
            markerContainer.style.left = `${horizontalPosition}%`;
            markerContainer.style.top = '50%';
            
            const marker = document.createElement('div');
            marker.className = `event-marker category-${event.category}`;
            marker.style.transform = `translateY(-${verticalOffset}px)`;
            
            const tooltip = document.createElement('div');
            tooltip.className = 'event-tooltip';
            tooltip.innerHTML = `
                <div class="tooltip-title">${event.title}</div>
                <div class="tooltip-content">
                    <div><strong>Date:</strong> ${formatDate(event.date)}</div>
                    <div><strong>Type:</strong> ${event.type}</div>
                    <div><strong>Impact:</strong> ${event.severity}/5</div>
                    ${event.details ? `<div class="tooltip-details">${event.details}</div>` : ''}
                </div>
            `;
            marker.appendChild(tooltip);
            
            markerContainer.onclick = () => {
                const detailElement = document.getElementById(`event-${event.id}`);
                if (detailElement) {
                    detailElement.scrollIntoView({ behavior: 'smooth' });
                    detailElement.style.backgroundColor = '#fff7ed';
                    setTimeout(() => {
                        detailElement.style.backgroundColor = '';
                    }, 2000);
                }
            };

            markerContainer.appendChild(marker);
            container.appendChild(markerContainer);
        });
    });

    // Add timeline period indicator
    const periodIndicator = document.createElement('div');
    periodIndicator.className = 'timeline-period';
    periodIndicator.textContent = `${formatDate(startDate)} - ${formatDate(endDate)}`;
    container.parentElement.insertBefore(periodIndicator, container);
}
