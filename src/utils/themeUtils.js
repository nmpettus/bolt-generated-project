import { themes } from '../config/themes.js';
import { saveToLocalStorage, loadFromLocalStorage } from './storage.js';

const THEME_STORAGE_KEY = 'selectedTheme';

export function getCurrentTheme() {
    const savedThemeName = loadFromLocalStorage(THEME_STORAGE_KEY);
    return themes[savedThemeName] || themes.default;
}

export function setTheme(themeName) {
    if (!themes[themeName]) return false;
    
    saveToLocalStorage(themeName, THEME_STORAGE_KEY);
    applyTheme(themes[themeName]);
    
    // Update selector if it exists
    const selector = document.getElementById('theme-select');
    if (selector) {
        selector.value = themeName;
    }
    
    return true;
}

export function applyTheme(theme) {
    if (!theme || !theme.colors) return;
    
    const style = document.getElementById('dynamic-theme') || createThemeStylesheet();
    const css = generateThemeCSS(theme.colors);
    style.textContent = css;
}

function createThemeStylesheet() {
    const style = document.createElement('style');
    style.id = 'dynamic-theme';
    document.head.appendChild(style);
    return style;
}

function generateThemeCSS(colors) {
    return `
        body {
            background-color: ${colors.background};
            color: ${colors.text};
        }
        
        .card {
            background-color: ${colors.card};
            border-color: ${colors.border};
        }
        
        button {
            background-color: ${colors.primary};
            color: white;
        }
        
        button:hover {
            background-color: ${colors.primaryHover};
        }
        
        .export-btn {
            background-color: ${colors.success};
        }
        
        .export-btn:hover {
            background-color: ${colors.successHover};
        }
        
        .delete-btn {
            background-color: ${colors.danger};
        }
        
        .delete-btn:hover {
            background-color: ${colors.dangerHover};
        }
        
        .edit-btn {
            background-color: ${colors.warning};
        }
        
        .edit-btn:hover {
            background-color: ${colors.warningHover};
        }
        
        .timeline-item {
            border-color: ${colors.border};
        }
        
        .timeline-line {
            background-color: ${colors.border};
        }
        
        .month-marker {
            background-color: ${colors.text};
        }
        
        .month-label {
            color: ${colors.text};
        }
        
        ${generateCategoryStyles(colors)}
    `;
}

function generateCategoryStyles(colors) {
    return Object.entries(colors)
        .filter(([category]) => ['Medical', 'Appointments', 'Personal', 'Administrative'].includes(category))
        .map(([category, value]) => `
            .event-marker.category-${category} {
                background-color: ${value.base};
                border-color: ${value.border};
            }
        `).join('\n');
}
