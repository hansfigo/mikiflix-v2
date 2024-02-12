<script lang="ts">
    export let id: String

    const tabs = [
        { text: 'Overview', href: `/anime/${id}` },
        { text: 'Character', href: `/anime/characters/${id}` },
        { text: 'Episodes', href: `/anime/episodes/${id}` }
    ];
</script>

<div class="flex w-full justify-between">
    {#each tabs as tab}
        <a data-sveltekit-noscroll href={tab.href}>{tab.text}</a>
    {/each}
</div>