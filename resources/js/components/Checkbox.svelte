<script>
    export let name;
    export let checked;
</script>

<div class="my-1">
    <input
        class="transition rounded-full h-5 w-5 text-purpleish-light"
        type="checkbox"
        bind:checked
        {name}
        id={name}
    />
    <label class="ml-2" for={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
</div>
