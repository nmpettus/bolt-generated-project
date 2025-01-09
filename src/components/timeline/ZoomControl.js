export function createZoomControl(onZoomChange) {
    const container = document.createElement('div');
    container.className = 'zoom-control';
    
    const label = document.createElement('label');
    label.textContent = 'Zoom: ';
    label.htmlFor = 'timeline-zoom';
    
    const zoomValue = document.createElement('span');
    zoomValue.className = 'zoom-value';
    zoomValue.textContent = '100%';
    
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'slider-container';
    
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.id = 'timeline-zoom';
    slider.min = '50';
    slider.max = '200';
    slider.value = '100';
    slider.step = '10';
    
    const tickMarks = document.createElement('div');
    tickMarks.className = 'tick-marks';
    
    // Create tick marks
    [50, 75, 100, 125, 150, 175, 200].forEach(value => {
        const tick = document.createElement('div');
        tick.className = 'tick';
        tick.style.left = `${((value - 50) / 150) * 100}%`;
        tick.setAttribute('data-value', `${value}%`);
        tickMarks.appendChild(tick);
    });
    
    slider.addEventListener('input', () => {
        const value = parseInt(slider.value);
        zoomValue.textContent = `${value}%`;
        onZoomChange(value);
    });
    
    sliderContainer.appendChild(tickMarks);
    sliderContainer.appendChild(slider);
    
    container.appendChild(label);
    container.appendChild(sliderContainer);
    container.appendChild(zoomValue);
    
    return container;
}
