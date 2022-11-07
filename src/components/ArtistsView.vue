<template>
    <div class="column is-2">
        <div class="card" v-if="artist !== null">
            <div class="card has-text-black">
                <div class="card-image">
                    <figure class="image is-3by4">
                        <img
                        v-bind:alt="artist.name"
                        v-bind:src="artist.imgURL">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="content has-text-centered">
                        <div class="has-text-weight-bold">
                            {{ artist.name }}
                        </div>
                        <div >{{ artist.character }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ArtistsVue',
    props: {
        artist: Object,
    },
};
</script>

<style>

</style>
