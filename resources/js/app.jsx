import './bootstrap';
import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

import { route } from 'ziggy-js';

import { useState } from 'react';
import PageLoader from './Components/PageLoader';
import IntroLoader from './Components/IntroLoader';

function AppWrapper({ App, props }) {
    const [showIntro, setShowIntro] = useState(true);

    return (
        <>
            {showIntro ? (
                <IntroLoader onFinish={() => setShowIntro(false)} />
            ) : (
                <PageLoader />
            )}
            <div>
                <App {...props} />
            </div>
        </>
    );
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<AppWrapper App={App} props={props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
