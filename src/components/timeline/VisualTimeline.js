import { formatDate } from '../../utils/dateUtils.js';
import { createEventMarker } from './TimelineMarker.js';
import { createZoomControl } from './ZoomControl.js';
import {
    getTimeWindow,
    getMonthsBetween,
    calculatePosition,
    monthIterator
} from '../../utils/timelineUtils.js';

export function displayVisualTimeline(events) {
    // Create container for both timeline and zoom control if it doesn't exist
    let container = document.querySelector('.visual-timeline-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'visual-timeline-container';
        const oldTimeline = document.querySelector('.visual-timeline');
        oldTimeline.parentNode.replaceChild(container, oldTimeline);
    }

    // Create timeline element
    const visualTimeline = document.createElement('div');
    visualTimeline.className = 'visual-timeline';
    
    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'timeline-scroll-container';
    
    const timelineContainer = document.createElement('div');
    timelineContainer.className = 'timeline-container';
    timelineContainer.innerHTML = '<div class="timeline-line"></div>';
    
    scrollContainer.appendChild(timelineContainer);
    visualTimeline.appendChild(scrollContainer);
    
    // Clear and add new elements
    container.innerHTML = '';
    container.appendChild(visualTimeline);

    if (events.length === 0) {
        timelineContainer.innerHTML += '<div style="text-align: center; padding: 20px;">No events added yet</div>';
        return;
    }

    let currentZoom = 100;
    
    const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
    const timeWindow = getTimeWindow(sortedEvents);
    if (!timeWindow) return;

    const { startDate, endDate, timeRange } = timeWindow;
    const monthsDiff = getMonthsBetween(startDate, endDate);
    
    function updateTimelineWidth(zoom) {
        const scale = zoom / 100;
        const baseWidth = Math.max(800, monthsDiff * 100);
        timelineContainer.style.width = `${baseWidth * scale}px`;
    }
    
    // Create month markers
    for (const date of monthIterator(startDate, endDate)) {
        const position = calculatePosition(date, startDate, timeRange);
        
        const marker = document.createElement('div');
        marker.className = 'month-marker';
        marker.style.left = `${position}%`;
        timelineContainer.appendChild(marker);

        const label = document.createElement('div');
        label.className = 'month-label';
        label.textContent = date.toLocaleDateString('en-US', { 
            month: 'short', 
            year: 'numeric' 
        });
        label.style.left = `${position}%`;
        timelineContainer.appendChild(label);
    }

    // Create event markers
    const eventsByDate = new Map();
    sortedEvents.forEach(event => {
        const dateKey = event.date;
        if (!eventsByDate.has(dateKey)) {
            eventsByDate.set(dateKey, []);
        }
        eventsByDate.get(dateKey).push(event);
    });

    eventsByDate.forEach((dateEvents, dateKey) => {
        const position = calculatePosition(new Date(dateKey), startDate, timeRange);
        dateEvents.forEach((event, index) => {
            const marker = createEventMarker(event, position, index);
            timelineContainer.appendChild(marker);
        });
    });

    updateTimelineWidth(currentZoom);

    // Create zoom control as a separate element
    const zoomControl = createZoomControl((zoom) => {
        currentZoom = zoom;
        updateTimelineWidth(zoom);
    });
    
    container.appendChild(zoomControl);
}
