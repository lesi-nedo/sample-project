<script lang="ts">

    let count = $state(0);

</script>

<div class="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10 space-y-4">
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <p class="text-lg">This is a Svelte app with Tailwind CSS.</p>
    <p class="text-lg">Count: {count}</p>
    <!-- Use flexbox for button layout -->
    <div class="flex space-x-2">
        <button class="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick={() => count += 1}>
            Increment
        </button>
        <button class="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onclick={() => count -= 1}>
            Decrement
        </button>
        <button class="flex-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onclick={() => count = 0}>
            Reset
        </button>
    </div>
</div>
