<script>
    import Checkbox from '../components/Checkbox.svelte';
    import Pill from '../components/Pill.svelte';
    import { movieCategories } from '../utils/categories';

    let currentMovie;

    let isLoading = false;
    let isMovie = false;
    let isSeries = false;
    let isGame = false;

    let selectedCategory;
    let selectedCategories = [];

    function addSelectedCategory() {
        if (selectedCategory.id !== 0 && !selectedCategories.includes(selectedCategory.text)) {
            selectedCategories = [...selectedCategories, selectedCategory.text];
        }
    }

    async function getRandomMovie() {
        if (selectedCategories.length === 0) return;

        isLoading = true;

        const res = await fetch('/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                category: selectedCategories.join(','),
            }),
        });

        currentMovie = await res.json();
        isLoading = false;
    }
</script>

<div class="container py-4 text-white">
    <h1 class="text-xl">
        <span class="font-bold">Un</span>boreme
    </h1>

    <div class="flex mt-10 mb-4">
        <div class="flex flex-col">
            <p class="mb-4 font-bold">Type of content</p>
            <Checkbox name={'movie'} bind:checked={isMovie} />
            <!-- <Checkbox name={'series'} bind:checked={isSeries} /> -->
            <!-- <Checkbox name={'game'} bind:checked={isGame} /> -->
        </div>

        <div class="flex flex-col ml-24 w-1/3">
            <label class="mb-4 font-bold" for="categories">Add a category</label>
            <select
                class="mb-2 text-black rounded-full"
                name="categories"
                id="categories"
                bind:value={selectedCategory}
            >
                {#if isMovie}
                    {#each movieCategories as category}
                        <option value={category}>{category.text}</option>
                    {/each}
                {/if}
            </select>
            <button
                class="bg-purpleish-light transition-colors text-sm font-bold rounded-full w-1/3 my-2 px-4 py-2 hover:bg-purpleish"
                on:click={addSelectedCategory}
            >
                Add
            </button>

            <p class="mt-4 font-bold">Selected categories</p>
            <div class="grid grid-cols-2 grid-rows-2">
                {#if selectedCategories.length === 0}
                    <p class="text-sm pt-2">No category selected</p>
                {:else}
                    {#each selectedCategories as category}
                        <Pill title={category} bind:categories={selectedCategories} />
                    {/each}
                {/if}
            </div>
        </div>
    </div>

    <button
        class="bg-purpleish-light w-52 transition text-lg font-bold rounded-full px-14 py-3 hover:bg-purpleish"
        on:click={getRandomMovie}
        disabled={isLoading}
    >
        {#if isLoading}
            <i class="fas fa-spinner animate-spin" />
        {:else}
            UNBORE
        {/if}
    </button>

    {#if currentMovie}
        <div class="flex bg-white my-8 w-2/3 text-black rounded-lg">
            <a href={currentMovie.url}>
                <img src={currentMovie.img_url} alt="cover" />
            </a>
            <div class="flex flex-col justify-center px-8 py-4">
                <p class="text-xl text-purpleish">
                    {currentMovie.title}
                    {currentMovie.year}
                    <i class="fas fa-star text-yellow-300" />
                    {currentMovie.rating}/10
                </p>
                <p class="text-lg">
                    {currentMovie.description}
                </p>
                <p class="mt-4">
                    <i class="pr-2 fas fa-stream text-purpleish-light" />{currentMovie.categories}
                </p>
                <p>
                    <i class="pr-2 far fa-clock text-purpleish-light" />{currentMovie.duration}
                </p>
                <p>
                    <i class="pr-2 fas fa-user-edit text-purpleish-light" />{currentMovie.director}
                </p>
            </div>
        </div>
    {/if}
</div>
