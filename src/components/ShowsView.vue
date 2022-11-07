<template>
    <div class="column is-3-desktop is-4-tablet is-12-mobile" v-if="shows !== null">
        <router-link v-bind:to="{name: 'details',
                                params: {tvshowId: parseInt(shows.tvshowId)}}">
            <div class="card has-text-white has-background-black">
                <div class="card-image">
                    <figure class="image is-2-by-6">
                        <img
                        v-bind:alt="shows.title"
                        v-bind:src="shows.imgURL">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="content">
                        <p class="title is-3 has-text-centered
                        has-text-warning-dark" style="color:black">
                            {{ shows.title }}
                        </p>
                        <div class="mb-0">
                            <span class="has-text-weight-bold">Studio: </span>
                            <span>{{ shows.studio.name }}</span>
                        </div>
                        <div class="mb-0">
                            <span class="has-text-weight-bold">Genres: </span>
                            <span>{{
                                    shows.genres.map((e) => e.name)
                                        .join(', ')
                                }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'ShowsView',
    props: {
        shows: Object,
    },
};
</script>

<style>

</style>
