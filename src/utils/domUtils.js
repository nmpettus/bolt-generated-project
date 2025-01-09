// Form element getters
export function getFormValue(elementId) {
    return document.getElementById(elementId).value;
}

export function getFormValues(ids) {
    return ids.reduce((values, id) => {
        values[id] = getFormValue(id);
        return values;
    }, {});
}

// Form element setters
export function setFormValue(elementId, value) {
    document.getElementById(elementId).value = value;
}

export function setFormValues(values) {
    Object.entries(values).forEach(([id, value]) => {
        setFormValue(id, value);
    });
}

// Element visibility
export function showElement(elementId) {
    document.getElementById(elementId).style.display = 'block';
}

export function hideElement(elementId) {
    document.getElementById(elementId).style.display = 'none';
}

// Element creation
export function createOption(value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    return option;
}

// Select manipulation
export function clearSelect(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = '';
    return select;
}

export function populateSelect(selectId, options) {
    const select = clearSelect(selectId);
    options.forEach(option => {
        select.appendChild(createOption(option, option));
    });
}
