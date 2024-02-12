<script lang="ts">
    export let id: String
</script>

<div class="flex w-full justify-between">
    <a href={`/anime/${id}`}>Overview</a>
    <a href={`/anime/characters/${id}`}>Character</a>
    <a href={`/anime/episodes/${id}`}>Episodes</a>
</div>