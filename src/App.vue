<template>
    <div class="bg-img">
        <menu-view/>
        <router-view/>
        <footer-view/>
    </div>
</template>

<script>
import FooterView from '@/components/FooterView.vue';
import MenuView from './components/MenuView.vue';

export default {
    name: 'App',
    components: { MenuView, FooterView },
    mounted() {
        this.globalToken();
    },
    methods: {
        globalToken() {
            const token = sessionStorage.getItem('token');
            if (token) {
                this.$store.dispatch('storeToken', token);
            }
        },
    },
};
</script>
<style>
body{
    background-image: url('./assets/Image/Background.png');
    background-position: center center;
    background-repeat:  no-repeat;
    background-attachment: fixed;
    background-size:  cover;
    background-color: black;
    min-width: 100%;
    min-height: 100%;

}
.notification{
    background: lightgrey;
    color: black;
    font-size: 110%;
    font-family: "Lucida Console", "Courier New", monospace;
    line-height: 1.25;
    margin-bottom: .5em !important;
    margin-top: .5em !important;
    text-align: center;
    text-transform: uppercase;
}
.border-step2 {
    border-style: solid;
    border-width: .125em 0;
    margin: 0 .25em;
    padding: .5em .375em;
    position: relative;
    z-index: 1;
}
.pagination{
    border-style: solid;
    border-color: black ;
}
</style>
