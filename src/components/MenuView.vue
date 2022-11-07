<template>
  <nav class="navbar is-black mb-2" role="navigation"
    aria-label="main navigation">
  <div class="navbar-brand">
    <div class="navbar-item">
      <img v-bind:src="puckBerserk" class="is-square" alt="Puck Berserk">
    </div>

    <div role="button" class="navbar-burger" aria-label="menu"
    aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </div>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
            <router-link to="/" class="navbar-item has-text-warning-dark">
            Home
            </router-link>
    </div>

    <div class="navbar-end">
        <router-link to="/history" class="navbar-item has-text-warning-dark"
        v-if="CheckToken">
            History
        </router-link>
        <router-link to="/profile" class="navbar-item has-text-warning-dark"
        v-if="CheckToken">
            Profile
        </router-link>
        <router-link to="/" class="navbar-item has-text-warning-dark"
        v-if="CheckToken"
        @click="Disconnect">
            Logout
        </router-link>
        <router-link to="/signup" class="navbar-item has-text-warning-dark"
        v-if="!CheckToken">
            Sign Up
        </router-link>
        <router-link to="/login" class="navbar-item has-text-warning-dark"
        v-if="!CheckToken">
            Login
        </router-link>

        <router-link to="/about" class="navbar-item has-text-warning-dark">
            About
        </router-link>
    </div>
  </div>
</nav>
</template>

<script>
import puckBerserk from '@/assets/Image/puck-berserk.gif';

export default {
    name: 'MenuView',
    data() {
        return {
            puckBerserk,
        };
    },
    computed: {
        CheckToken() {
            return this.$store.state.token;
        },
    },
    methods: {
        Disconnect() {
            this.$store.dispatch('storeToken', '');
            this.$store.state.history = [];
        },
    },
};
</script>

<style scoped>
.navbar{
    border-style: groove;
    border-width: thick;
}
</style>
