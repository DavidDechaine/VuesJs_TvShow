<template>
    <div class="container">
        <div class="box has-background-black mb-4 px-0 pb-0" role="search">
            <div class="columns is-centered ">
                <div class="field is-horizontal ">
                    <div class="field-label is-normal ">
                        <label class="label has-text-warning-dark" for="title">Title:</label>
                    </div>
                    <div class="field-body">
                        <div class="control">
                            <input class="input" aria-label="Series titles"
                            id="title" placeholder="Name" type="text"
                            v-model="titleFilter">
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal"
                     style="padding-left: 20px;">
                    <div class="field-label is-normal">
                            <label class="label has-text-warning-dark" for="studioName">
                                Studio:</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div class="control select">
                                <select class="select" aria-label="Studio"
                                id="studioName" v-model="studiosFilter">
                                    <option ></option>
                                    <option
                                    v-for="s in this.studios"
                                    v-bind:key="s.studioId"
                                    v-bind:value="s.studioId"
                                    > {{s.name}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel has-background-grey-dark">
                <p class="panel-heading has-background-grey-dark
                has-text-warning-dark is-underlined is-size-4">Genres</p>
                <div class="panel-block has-background-black">
                    <div class="columns is-mobile is-multiline">
                        <div class="column is-2 "
                        v-for="g in genres"
                        v-bind:key="g.genreId">
                            <label class="label checkbox has-text-warning-dark">
                            <input type="checkbox"
                            v-bind:value="g.genreId"
                            v-model="genresFilter">{{g.name}}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="block">
            <div class="columns is-multiline is-mobile" role="main">
                <ShowsView
                v-for="s in Paginate"
                v-bind:key="s.tvshowId"
                v-bind:shows="s"
                />
            </div>
            <div role="navigation">
                <!-- Next and Previous button won't appear if it's the first or last page-->
                <nav class="pagination mb-6 has-background-warning-dark"
                     role="navigation" aria-label="pagination">
                    <button class="pagination-previous has-background-black has-text-warning-dark
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
</template>

<script>
import {
    STUDIO_URL, TV_SHOWS_URL, GENRES_URL,
} from '@/constants';
import ShowsView from '@/components/ShowsView.vue';

export default {
    name: 'HomeView',
    components: { ShowsView },
    data() {
        return {
            studios: [],
            studiosFilter: '',
            genres: [],
            genresFilter: [],
            tvShows: [],
            titleFilter: '',
            maxPage: 0,
            currentPage: 0,
            itemsPerPage: 8,
        };
    },
    computed: {
        ShowsFiltered() {
            let showFiltres = this.tvShows;
            if (this.titleFilter !== '') {
                showFiltres = showFiltres.filter(
                    (s) => s.title.toLowerCase().includes(this.titleFilter.toLowerCase()),
                );
            }
            if (this.studiosFilter !== '') {
                showFiltres = showFiltres.filter(
                    (s) => s.studio.studioId === parseInt(this.studiosFilter, 10),
                );
            }
            if (this.genresFilter.length !== 0) {
                showFiltres = showFiltres.filter(
                    (s) => this.genresFilter.every((element) => s.genres
                        .map((genre) => genre.genreId).includes(element)),
                );
            }
            this.SetPage(0);
            return showFiltres;
        },
        Paginate() {
            return this.ShowsFiltered.slice(
                this.currentPage * this.itemsPerPage,
                this.itemsPerPage * this.currentPage + this.itemsPerPage,
            );
        },
        NumOfPages() {
            return Math.ceil(this.ShowsFiltered.length / this.itemsPerPage);
        },
    },
    mounted() {
        this.GetStudios();
        this.GetGenres();
        this.GetShows();
    },
    methods: {
        async GetStudios() {
            const response = await fetch(STUDIO_URL);
            if (response.ok) {
                this.studios = await response.json();
            }
        },
        async GetGenres() {
            const response = await fetch(GENRES_URL);
            if (response.ok) {
                this.genres = await response.json();
            }
        },
        async GetShows() {
            const response = await fetch(TV_SHOWS_URL);
            if (response.ok) {
                this.tvShows = await response.json();
            }
        },
        SetPage(page) {
            this.currentPage = page;
        },
    },
};
</script>

<style>
.panel{
    border-style: solid;
    border-color: dimgray ;
}
</style>
