(function() {
    const THEME_KEY = 'docmd-selected-theme';
    
    window.switchDocTheme = function(themeName) {
        // 1. Find key elements
        // We use docmd-main as a reference point for where to insert/find the theme CSS
        const mainLink = document.querySelector('link[href*="docmd-main.css"]');
        if (!mainLink) {
            console.error('Critical: docmd-main.css not found.');
            return;
        }

        // 2. Determine the base path (e.g., "../../assets/css/") from the main link
        const mainHref = mainLink.getAttribute('href');
        const basePath = mainHref.split('docmd-main.css')[0];

        // 3. Find existing theme link (if any)
        let themeLink = document.querySelector('link[href*="docmd-theme-"]');

        // 4. Handle "Default" Theme (Remove specific theme file)
        if (themeName === 'default') {
            if (themeLink) themeLink.remove();
            localStorage.setItem(THEME_KEY, 'default');
            console.log('Switched to Default');
            return;
        }

        // 5. Handle Named Themes (sky, ruby, retro)
        const newHref = `${basePath}docmd-theme-${themeName}.css`;

        if (themeLink) {
            // Update existing
            themeLink.href = newHref;
        } else {
            // Create new
            themeLink = document.createElement('link');
            themeLink.rel = 'stylesheet';
            themeLink.href = newHref;
            // Insert AFTER main css so it overrides correctly
            mainLink.parentNode.insertBefore(themeLink, mainLink.nextSibling);
        }

        localStorage.setItem(THEME_KEY, themeName);
        console.log(`Switched to ${themeName}`);
    };

    // Apply saved preference on load
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme && savedTheme !== 'default') {
        window.switchDocTheme(savedTheme);
    }
})();