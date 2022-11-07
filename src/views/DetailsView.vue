<template>
  <div class="container" v-if="this.showDetails !== null">
        <div class="columns is-centered" role="main">
            <div class="column is-three-quarters">
                <div class="card mt-6 has-background-black has-text-white">
                    <div class="columns is-multiline">
                        <div class="column">
                            <div class="card-image">
                                <figure class="image is-4by5">
                                <img v-bind:alt="this.showDetails.title"
                                    v-bind:src="this.showDetails.imgURL" >
                                </figure>
                            </div>
                        </div>
                        <div class="column">
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">
                                        <h1 class="title has-text-danger-dark is-2">
                                            {{this.showDetails.title}}</h1>
                                        <dl class="mt-7">
                                            <dt class="has-text-weight-bold">Release year:</dt>
                                            <dd>{{this.showDetails.year}}</dd>
                                            <dt class="has-text-weight-bold">Total episode:</dt>
                                            <dd>{{this.showDetails.episodeCount}}</dd>
                                            <dt class="has-text-weight-bold">Studio:</dt>
                                            <dd>{{this.showDetails.studio.name}}</dd>
                                            <dt class="has-text-weight-bold">Genre:</dt>
                                            <dd>
                                                {{this.showDetails.genres
                                                .map((e) => e.name).join(", ")}}
                                            </dd>
                                            <dt class="has-text-weight-bold">Rating:</dt>
                                            <dd>{{this.showDetails.rating}}/10</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-content">
                            <h1 class="title is-4 has-text-danger-dark">Description</h1>
                            <div class="content">{{this.showDetails.plot}}</div>
                        </div>
                    </div>
                </div>
                <div class="box has-background-black mt-6">
                    <h1 class="title has-text-danger-dark is-2">
                        Actors</h1>
                    <div class="columns is-mobile is-multiline
                    has-background-black scrolling-wrapper-flexbox mt-6">
                        <ArtistsView v-for="a in this.showDetails.roles"
                        v-bind:key="a.roleId"
                        v-bind:artist="a"
                        />
                    </div>
                </div>
                <div class="box has-background-black mt-6">
                    <h1 class="title has-text-danger-dark is-2">
                        Seasons</h1>
                        <div class="columns is-mobile is-multiline scrolling-wrapper-flexbox mt-6">
                        <SeasonsView v-for="season in this.showDetails.seasons"
                        v-bind:key="season.seasonId"
                        v-bind:season="season"
                        />
                    </div>
                </div>
             </div>
        </div>
    </div>
</template>

<script>
import {
    SHOWS_ID_URL,
} from '@/constants';
import ArtistsView from '@/components/ArtistsView.vue';
import SeasonsView from '@/components/SeasonsView.vue';

export default {
    name: 'DetailsView',
    components: {
        ArtistsView,
        SeasonsView,
    },
    data() {
        return {
            param: this.$route.params.tvshowId,
            showDetails: null,
        };
    },
    mounted() {
        this.Getshow();
    },
    methods: {
        async Getshow() {
            const rep = await fetch(`${SHOWS_ID_URL}?tvshowId=${this.param}`);
            if (rep.ok) {
                this.showDetails = await rep.json();
            }
        },
    },
};
</script>

<style scoped>
    .scrolling-wrapper-flexbox {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto
    }
</style>
