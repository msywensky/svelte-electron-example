<script>
    import { routes, active } from 'svelte-hash-router'

    $: links = Object.values($routes)
</script>

<aside class="menu is-hidden-mobile">
    <p class="menu-label">
        General
    </p>
    <ul class="menu-list">
    {#each links.filter(item => item.$$section === "General") as e}
        {#if e.$$name !== '404'}
        <li><a class:active={e === $active} href={e.$$href}>{e.$$name}</a></li>
        {/if}
    {/each}
    </ul>
    <p class="menu-label">
        Administration
    </p>
    <ul class="menu-list">
    {#each links.filter(item => item.$$section === "Administration") as e}
        {#if e.$$name !== '404'}
        <li><a class:active={e === $active} href={e.$$href}>{e.$$name}</a></li>
        {/if}
    {/each}
    </ul>
</aside>
