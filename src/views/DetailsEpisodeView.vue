<template>
    <div class="container" role="main" v-if="this.data !== null">
        <div class="columns is-centered">
            <div class="column is-three-quarters">
                <section class="hero is-black has-text-centered mb-2">
                    <div class="hero-body ">
                        <p class="title has-text-warning-dark">
                        {{this.data.tvshowTitle}}
                        </p>
                        <p class="subtitle has-text-warning-dark">
                        {{this.data.number + ': ' + this.data.title}}
                        </p>
                    </div>
                </section>
                <div class="card has-background-warning-dark
                    has-text-black">
                    <div class="columns is-multiline">
                        <div class="column">
                            <div class="card-image mt-6">
                                <router-link v-bind:to="{name: 'playepisode',
                                    params: {seasonId:parseInt(this.$route.params.seasonId),
                                    episodeId: parseInt(this.data.episodeId)}}">
                                    <figure class="image is-2by6">
                                    <img v-bind:alt="this.data.title"
                                        v-bind:src="this.data.imgURL" >
                                    </figure>
                                </router-link>
                                    <div class="Msg">
                                    click on the image above to watch it
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">
                                        <dl>
                                            <dt class="has-text-weight-bold">Episode duration:</dt>
                                            <dd>{{this.data.runtime}} min</dd>
                                            <dt class="has-text-weight-bold">Aired:</dt>
                                            <dd>{{this.data.aired}}</dd>
                                            <dt class="has-text-weight-bold">
                                                Parental Guideline:</dt>
                                            <dd>{{this.data.tvParentalGuideline}}</dd>
                                            <hr>
                                        </dl>
                                    </div>
                                </div>
                                <h1 class="title is-5">Plot</h1>
                                <div class="content">{{this.data.plot}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    EPISODE_URL,
} from '@/constants';

export default {
    name: 'DetailsEpisodeView',
    data() {
        return {
            param: this.$route.params.episodeId,
            data: null,
        };
    },
    mounted() {
        this.getEpisode();
    },
    methods: {
        async getEpisode() {
            const rep = await fetch(`${EPISODE_URL}?episodeId=${this.param}`);
            if (rep.ok) {
                this.data = await rep.json();
            }
        },
    },
};
</script>

<style>
hr { display: block; height: 1px;
    border: 0; border-top: 2px solid rgb(9, 9, 9); }
</style>
