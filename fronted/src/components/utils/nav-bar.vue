<template>
    <div>
        <v-app-bar dark>
            <v-toolbar-title>
                <router-link class="navbar-brand" to="/">Inneli</router-link>
            </v-toolbar-title>
            <router-link class="nav-link" to="/">Home</router-link>
            <v-spacer></v-spacer>
            <v-menu left bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item-title>
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </v-list-item-title>
                    <v-list-item-title>
                        <router-link class="nav-link" to="/register"> Register</router-link>
                    </v-list-item-title>
                </v-list>
            </v-menu>
        </v-app-bar>
    </div>
</template>

<script>
    export default {
        name: "nav-bar"
    }
</script>

<style scoped>

</style>
