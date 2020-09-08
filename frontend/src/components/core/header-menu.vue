<template>
    <v-menu data-app>
        <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
                <v-icon>mdi-account</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-item v-for="(item, i) in items" :key="i" @click="thisIsAValidMethod()">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
    export default {
        name: "header-menu",
        data() {
            return {
                title: "Home",
                breadcrumbs: [],
                items: [
                    {
                        title: 'Click Me',
                    },
                    {
                        title: 'Click Me',
                    },
                    {
                        title: 'Click Me',
                    },
                    {
                        title: 'Click Me 2',
                    },
                ],
            }
        },
        methods: {
            thisIsAValidMethod() {
                console.log('asdasd');
            },
            computeBreadcrumbs() {
                let breadcrumbs = [
                    {
                        text: "Home",
                        href: "/",
                        disabled: false
                    }
                ];
                let appends = [];
                appends = this.$route.matched.map(item => {
                    return {
                        text: item.meta.title || "",
                        href: item.path || "/",
                        disabled: item.path === this.$route.path
                    }
                });
                this.breadcrumbs = breadcrumbs.concat(appends)
            }
        },
        created() {
            this.computeBreadcrumbs()
        }

    }
</script>

<style scoped>

</style>
