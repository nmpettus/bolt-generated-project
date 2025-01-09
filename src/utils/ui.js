export function showStatus(message, isError = false) {
    const statusDiv = document.getElementById('statusMessage');
    statusDiv.textContent = message;
    statusDiv.className = 'status-message ' + (isError ? 'status-error' : 'status-success');
    statusDiv.style.display = 'block';
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 3000);
}

export function showTooltip(event, content) {
    const tooltip = document.getElementById('eventTooltip');
    tooltip.innerHTML = content;
    tooltip.style.display = 'block';

    const rect = event.target.getBoundingClientRect();
    const tooltipHeight = tooltip.offsetHeight;
    
    let top = rect.top - tooltipHeight - 10;
    if (top < 10) {
        top = rect.bottom + 10;
    }

    let left = rect.left - (tooltip.offsetWidth / 2) + (rect.width / 2);
    if (left < 10) {
        left = 10;
    } else if (left + tooltip.offsetWidth > window.innerWidth - 10) {
        left = window.innerWidth - tooltip.offsetWidth - 10;
    }

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
}

export function hideTooltip() {
    document.getElementById('eventTooltip').style.display = 'none';
}
