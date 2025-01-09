// Time window calculations
export function getTimeWindow(events) {
    if (!events.length) return null;
    
    const firstEvent = new Date(events[0].date);
    const lastEvent = new Date(events[events.length - 1].date);

    const startDate = new Date(firstEvent);
    startDate.setMonth(startDate.getMonth() - 1);
    
    const endDate = new Date(lastEvent);
    endDate.setMonth(endDate.getMonth() + 1);

    return {
        startDate,
        endDate,
        timeRange: endDate.getTime() - startDate.getTime()
    };
}

export function getMonthsBetween(startDate, endDate) {
    return (endDate.getMonth() - startDate.getMonth()) + 
           (12 * (endDate.getFullYear() - startDate.getFullYear()));
}

export function calculatePosition(date, startDate, timeRange) {
    return ((new Date(date).getTime() - startDate.getTime()) / timeRange) * 100;
}

export function groupEventsByDate(events) {
    return events.reduce((groups, event) => {
        const dateKey = event.date;
        if (!groups.has(dateKey)) {
            groups.set(dateKey, []);
        }
        groups.get(dateKey).push(event);
        return groups;
    }, new Map());
}

// Timeline dimensions
export function calculateTimelineWidth(monthsCount) {
    const minWidth = 800;
    const widthPerMonth = 100;
    return Math.max(minWidth, monthsCount * widthPerMonth);
}

// Date iteration
export function* monthIterator(startDate, endDate) {
    const current = new Date(startDate);
    while (current <= endDate) {
        yield new Date(current);
        current.setMonth(current.getMonth() + 1);
    }
}
