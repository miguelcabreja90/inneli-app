<template>
    <div>
        <v-app-bar dark>
            <v-toolbar-title>
                <router-link class="navbar-brand" to="/">Inneli</router-link>
            </v-toolbar-title>
            <router-link class="nav-link" to="/">Home</router-link>
            <v-spacer></v-spacer>
            <header-menu></header-menu>
        </v-app-bar>
    </div>
</template>

<script>
    import HeaderMenu from "./header-menu";
    export default {
        name: "nav-bar",
        components: {HeaderMenu},
        data: () => ({
            items: [
                { title: 'Click Me' },
                { title: 'Click Me' },
                { title: 'Click Me' },
                { title: 'Click Me 2' },
            ],
        }),
    }
</script>

<style scoped>

</style>
