import '../css/app.css';
import { createInertiaApp } from '@inertiajs/inertia-svelte';

createInertiaApp({
    resolve: (name) => require(`./pages/${name}.svelte`),
    setup({ el, App, props }) {
        new App({ target: el, props });
    },
});
