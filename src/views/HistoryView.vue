<template>
<div>
    <section role="main">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-three-quarters">
                    <section class="hero is-black has-text-centered mb-2">
                        <div class="hero-body">
                            <p class="title">History</p>
                        </div>
                    </section>
                    <div class="columns is-multiline is-mobile" role="main"
                         v-if="this.Paginate !== []">
                        <div class="column is-4-desktop is-4-tablet is-12-mobile"
                         v-for="episode in Paginate"
                         v-bind:key="episode.episodeId">
                            <div class="card has-text-black">
                                <div class="card-image">
                                    <router-link v-bind:to="{name: 'playepisode',
                                    params: {seasonId: episode.seasonId,
                                    episodeId: episode.episodeId}}">
                                        <figure class="image is-2-by-6">
                                            <img
                                                v-bind:alt="episode.title"
                                                v-bind:src="episode.imgURL">
                                        </figure>
                                    </router-link>
                                </div>
                                <div class="card-content">
                                    <div class="content has-text-centered">
                                        <router-link v-bind:to="{name: 'details',
                                            params: {tvshowId: episode.tvshowId}}">
                                            <p class="title is-5"
                                               style="color:black">
                                                {{ episode.tvshowTitle }}
                                            </p>
                                        </router-link>
                                        <hr class="divider">
                                        <div>
                                            <router-link v-bind:to="{name: 'season',
                                            params: {seasonId: episode.seasonId}}">
                                                <p class="is-size-6">
                                                    Season {{episode.seasonNumber}}
                                                </p>
                                            </router-link>
                                            <hr class="divider">
                                        </div>
                                        <div class="mb-0">
                                            <router-link v-bind:to="{name: 'playepisode',
                                            params: {seasonId: episode.seasonId,
                                            episodeId: episode.episodeId}}">
                                                <p class="is-size-6">
                                                    {{episode.episodeTitle}}
                                                </p>
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div role="navigation">
                        <!-- Next and Previous button won't appear if it's the first or last page-->
                        <nav class="pagination mb-6 has-background-warning-dark"
                             role="navigation" aria-label="pagination">
                            <button class="pagination-previous has-background-black
                            has-text-warning-dark
                            is-underlined has-text-weight-bold"
                                    v-if="this.currentPage > 0"
                                    v-on:click="SetPage(this.currentPage - 1)"
                                    v-on:keyDown="SetPage(this.currentPage - 1)"> &lt;</button>
                            <button class="pagination-next
                            has-background-black has-text-warning-dark
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
    </section>
</div>
</template>

<script>
export default {
    name: 'HistoryView',
    data() {
        return {
            maxPage: 0,
            currentPage: 0,
            itemsPerPage: 6,
        };
    },
    computed: {
        Paginate() {
            return this.$store.state.history.slice(
                this.currentPage * this.itemsPerPage,
                this.itemsPerPage * this.currentPage + this.itemsPerPage,
            );
        },
        NumOfPages() {
            return Math.ceil(this.$store.state.history.length / this.itemsPerPage);
        },
    },
    mounted() {
        this.$store.dispatch('storeHistory');
    },
    methods: {
        SetPage(page) {
            this.currentPage = page;
        },
    },
};
</script>

<style >
hr.divider {
    margin: 7px;
    border-width: 1px;
}
</style>
