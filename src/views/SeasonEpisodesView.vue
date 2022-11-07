<template>
  <div class="container" v-if="this.seasonEpisodes !== null">
        <div class="columns is-centered">
            <div class="column is-three-quarters has-text-centered" role="main">
                <section class="hero is-black mb-2 ">
                    <div class="hero-body">
                        <p class="title has-text-warning-dark">
                        {{this.seasonEpisodes.tvshowTitle}}
                        </p>
                        <p class="subtitle">
                        {{this.seasonEpisodes.seasonNumber}}
                        </p>
                    </div>
                </section>
                <div class="columns is-mobile is-multiline scrolling-wrapper-flexbox mt-6">
                    <SeasonEpiView v-for="ep in Paginate"
                    v-bind:key="ep.episodeId"
                    v-bind:seasonEpisode="ep"
                    />
                </div>
                <div role="navigation">
                    <!-- Next and Previous button won't appear if it's the first or last page-->
                    <nav class="pagination mb-6 has-background-warning-dark"
                         role="navigation" aria-label="pagination">
                        <button class="pagination-previous
                        has-background-black has-text-warning-dark
                             is-underlined has-text-weight-bold"
                                v-if="this.currentPage > 0"
                                v-on:click="SetPage(this.currentPage - 1)"
                                v-on:keyDown="SetPage(this.currentPage - 1)"> &lt;</button>
                        <button class="pagination-next has-background-black has-text-warning-dark
                             is-underlined has-text-weight-bold"
                                v-if="this.currentPage < NumOfPages - 1"
                                v-on:click="SetPage(this.currentPage + 1)"
                                v-on:keyDown="SetPage(this.currentPage + 1)">&gt;</button>
                        <ul class="pagination-list ">
                            <li v-for="i in NumOfPages"
                                v-bind:key="i">
                                <a
                                    v-bind:class="[this.currentPage === i -1 ?
                            'pagination-link has-background-white has-text-black ' +
                             'is-underlined has-text-weight-bold':
                            'pagination-link has-background-black has-text-warning-dark ' +
                             'is-underlined has-text-weight-bold']"
                                    v-bind:aria-label="['Go to page '+ i]"
                                    v-on:click="SetPage(i - 1)"
                                    v-on:keyDown="SetPage(i - 1)">{{i}}</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { EPISODES_URL } from '@/constants';
import SeasonEpiView from '@/components/SeasonEpiView.vue';

export default {
    name: 'SeasonEpisodesView',
    components: {
        SeasonEpiView,
    },
    data() {
        return {
            seasonEpisodes: null,
            param: this.$route.params.seasonId,
            currentPage: 0,
            itemsPerPage: 8,
        };
    },
    computed: {
        Paginate() {
            return this.seasonEpisodes.episodes.slice(
                this.currentPage * this.itemsPerPage,
                this.itemsPerPage * this.currentPage + this.itemsPerPage,
            );
        },
        NumOfPages() {
            return Math.ceil(this.seasonEpisodes.episodes.length / this.itemsPerPage);
        },
    },
    mounted() {
        this.GetEpisodes();
    },
    methods: {
        async GetEpisodes() {
            const rep = await fetch(`${EPISODES_URL}?seasonId=${this.param}`);
            if (rep.ok) {
                this.seasonEpisodes = await rep.json();
                this.$store.dispatch('storeHistory');
            }
        },
        SetPage(page) {
            this.currentPage = page;
        },
    },
};
</script>

<style>

</style>
