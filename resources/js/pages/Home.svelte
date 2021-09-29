<script>
    import Checkbox from '../components/Checkbox.svelte';
    import Pill from '../components/Pill.svelte';
    import { movieCategories } from '../utils/categories';

    let isMovie = false;
    let isSeries = false;
    let isGame = false;

    let selectedCategory = { id: 0, text: 'Select' };
    let selectedCategories = [];

    function addSelectedCategory() {
        selectedCategories = [...selectedCategories, selectedCategory.text];
    }

    function getRandomTitle() {}
</script>

<div class="container py-4 text-white">
    <h1 class="text-xl">
        <span class="font-bold">Un</span>boreme
    </h1>

    <div class="flex my-10">
        <div class="flex flex-col">
            <p class="mb-4 font-bold">Type of content</p>
            <Checkbox name={'movie'} bind:checked={isMovie} />
            <Checkbox name={'series'} bind:checked={isSeries} />
            <Checkbox name={'game'} bind:checked={isGame} />
        </div>

        <div class="flex flex-col ml-24 w-1/3">
            <label class="mb-4 font-bold" for="categories">Add a category</label>
            <select
                class="mb-2 text-black rounded-full"
                name="categories"
                id="categories"
                bind:value={selectedCategory}
            >
                <option selected>Select</option>
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

            <p class="mt-4 mb-2 font-bold">Selected categories</p>
            <div class="grid grid-cols-2 grid-rows-2">
                {#each selectedCategories as category}
                    <Pill title={category} bind:categories={selectedCategories} />
                {/each}
            </div>
        </div>
    </div>

    <button
        class="bg-purpleish-light transition text-lg font-bold rounded-full px-14 py-3 hover:bg-purpleish"
        on:click={getRandomTitle}
    >
        UNBORE
    </button>
</div>
