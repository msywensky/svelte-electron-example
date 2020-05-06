<script>
    import Sidemenu from './../common/Sidemenu.svelte';
    import Breadcrumb from './../common/Breadcrumb.svelte';
    import Demo from './../pages/Demo.svelte';
    import Greeting from './../common/Greeting.svelte';
    import { routes } from './../routes';
    import { Router } from 'svelte-hash-router';
    import Top from './../common/Top.svelte';


</script>
<main>
    <Top />
    <div class="container">
        <div class="columns">
            <div class="column is-3 ">
            <Sidemenu />
            </div>
            <div class="column is-9">
                <Breadcrumb />
                <Greeting />
                <Router  />
            </div>
        </div>
    </div>
</main>

<style lang="scss">
	main{
		width: 100%;
		xpadding: 20px;
	}
	h1{
		margin-top: 0;
	}
	
</style>
