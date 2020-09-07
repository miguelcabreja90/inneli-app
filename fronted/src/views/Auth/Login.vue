<template>
    <v-col align="center" justify="center">
        <v-col class="text-center" cols="12" sm="4">
            <div class="card-header" dark>
                Login
            </div>
            <div class="form-group">
                <label for="email">Email address</label>
                <input
                        id="email"
                        v-model="details.email"
                        :class="{ 'is-invalid': errors.email }"
                        class="form-control"
                        placeholder="Enter email"
                        type="email"
                />
                <div v-if="errors.email" class="invalid-feedback">
                    {{ errors.email[0] }}
                </div>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input id="password" v-model="details.password" :class="{ 'is-invalid': errors.password }"
                        class="form-control" placeholder="Password" type="password"/>
                <div v-if="errors.password" class="invalid-feedback">
                    {{ errors.password[0] }}
                </div>
            </div>
            <button class="btn btn-primary" type="button" @click="login">
                Login
            </button>
        </v-col>
    </v-col>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Home",

        data: function () {
            return {
                details: {
                    email: null,
                    password: null
                }
            };
        },

        computed: {
            ...mapGetters(["errors"])
        },

        mounted() {
            this.$store.commit("setErrors", {});
        },

        methods: {
            ...mapActions("auth", ["sendLoginRequest"]),

            login: function () {
                this.sendLoginRequest(this.details).then(() => {
                    this.$router.push({name: "Home"});
                });
            }
        }
    };
</script>
