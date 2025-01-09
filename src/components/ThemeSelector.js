import { themes } from '../config/themes.js';
import { setTheme } from '../utils/themeUtils.js';

export function createThemeSelector() {
    const container = document.createElement('div');
    container.className = 'theme-selector';
    
    const label = document.createElement('label');
    label.textContent = 'Color Theme: ';
    label.htmlFor = 'theme-select';
    
    const select = document.createElement('select');
    select.id = 'theme-select';
    
    Object.entries(themes).forEach(([key, theme]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = theme.name;
        select.appendChild(option);
    });
    
    select.addEventListener('change', (e) => {
        setTheme(e.target.value);
    });
    
    container.appendChild(label);
    container.appendChild(select);
    
    return container;
}
