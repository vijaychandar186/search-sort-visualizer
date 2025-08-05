export class ThemeManager {
    constructor() {
        this.initializeTheme();
    }

    initializeTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        this.updateThemeIcon(isDark);
    }

    updateThemeIcon(isDark) {
        const themeIcon = document.getElementById('themeIcon');
        if (!themeIcon) return;
        
        themeIcon.innerHTML = isDark ?
            `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>` :
            `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>`;
    }

    toggleTheme(e) {
        const x = e.clientX;
        const y = e.clientY;
        document.documentElement.style.setProperty('--x', `${x}px`);
        document.documentElement.style.setProperty('--y', `${y}px`);

        const toggle = () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            this.updateThemeIcon(isDark);
        };

        if (document.startViewTransition) {
            document.startViewTransition(toggle);
        } else {
            toggle();
        }
    }
}