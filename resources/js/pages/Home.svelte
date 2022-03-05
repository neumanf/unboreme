<script>
    import Checkbox from '../components/Checkbox.svelte';
    import Pill from '../components/Pill.svelte';
    import { imdbCategories } from "../utils/categories";

    let currentData;

    let isLoading = false;
    let isMovie = false;
    let isSeries = false;
    let isGame = false;

    let selectedGenre;
    let selectedGenres = [];

    function addSelectedCategory() {
        if (selectedGenre.id !== 0 && !selectedGenres.includes(selectedGenre.text)) {
            selectedGenres = [...selectedGenres, selectedGenre.text];
        }
    }

    async function getData() {
        if (selectedGenres.length === 0) return;

        let types = [];

        if (isMovie) types.push('movie');
        if (isSeries) types.push('series');
        // if(isGame) categories.push("game");

        isLoading = true;

        try {
            const res = await fetch('/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    types,
                    genres: selectedGenres,
                }),
            });

            if (res.status !== 200) {
                throw new Error();
            }

            const json = await res.json();
            const data = json['data'];

            if (data) {
                currentData = data;
            }
        } catch (error) {
            console.log(error);
        }

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
            <Checkbox name={'Movie'} bind:checked={isMovie} />
            <Checkbox name={'TV Series'} bind:checked={isSeries} />
            <!-- <Checkbox name={'game'} bind:checked={isGame} /> -->
        </div>

        <div class="flex flex-col ml-24 w-1/3">
            <label class="mb-4 font-bold" for="categories">Add a category</label>
            <select
                class="mb-2 text-black rounded-full"
                name="categories"
                id="categories"
                bind:value={selectedGenre}
            >
                {#if isMovie || isSeries}
                    {#each imdbCategories as category}
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
                {#if selectedGenres.length === 0}
                    <p class="text-sm pt-2">No category selected</p>
                {:else}
                    {#each selectedGenres as category}
                        <Pill title={category} bind:categories={selectedGenres} />
                    {/each}
                {/if}
            </div>
        </div>
    </div>

    <button
        class="bg-purpleish-light w-52 transition text-lg font-bold rounded-full px-14 py-3 hover:bg-purpleish"
        on:click={getData}
        disabled={isLoading}
    >
        {#if isLoading}
            <i class="fas fa-spinner animate-spin" />
        {:else}
            UNBORE
        {/if}
    </button>

    {#if currentData}
        <div class="flex bg-white my-8 w-2/3 text-black rounded-lg">
            <a href={currentData.url}>
                <img src={currentData.img_url} alt="cover" />
            </a>
            <div class="flex flex-col justify-center px-8 py-4">
                <p class="text-xl text-purpleish">
                    {currentData.title}
                    {currentData.year}
                    <i class="fas fa-star text-yellow-300" />
                    {currentData.rating}/10
                </p>
                <p class="text-lg">
                    {currentData.description}
                </p>
                <p class="mt-4">
                    <i class="pr-2 fas fa-stream text-purpleish-light" />{currentData.categories}
                </p>
                <p>
                    <i class="pr-2 far fa-clock text-purpleish-light" />{currentData.duration}
                </p>
                <p>
                    <i class="pr-2 fas fa-user-edit text-purpleish-light" />{currentData.director}
                </p>
            </div>
        </div>
    {/if}
</div>
