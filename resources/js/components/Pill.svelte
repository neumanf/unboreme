<script>
    import { fade } from 'svelte/transition';

    export let title;
    export let categories;

    function removeSelectedCategory() {
        categories = categories.filter((category) => category != title);
    }
</script>

<div
    in:fade
    out:fade
    on:click={removeSelectedCategory}
    class="bg-purpleish-light mt-4 py-1 px-2 w-4/6 text-center rounded-full cursor-pointer transition-colors hover:bg-red-500"
>
    <p class="text-sm">{title}</p>
</div>
