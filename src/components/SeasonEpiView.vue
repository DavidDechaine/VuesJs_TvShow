<template>
    <div class="column is-3-desktop is-4-tablet is-12-mobile">
        <div class="card" v-if="seasonEpisode !== null"
            v-bind:style='this.isInHistory(seasonEpisode.episodeId)?
            "border-style: groove; opacity:90%":""'>
            <router-link v-bind:to="{name: 'episodedetails',
            params: {seasonId: parseInt(this.$route.params.seasonId),
            episodeId: parseInt(seasonEpisode.episodeId)}}">
                <div v-bind:class='this.isInHistory(seasonEpisode.episodeId)?
                "card has-background-grey-dark has-text-white":
                "card has-background-black has-text-warning-dark"'>
                    <div class="card-image">
                        <figure class="image is-2by6">
                            <img
                            v-bind:alt="`episode` + seasonEpisode.number"
                            v-bind:src="seasonEpisode.imgURL">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="content has-text-centered">
                            <div class="has-text-weight-bold">
                            {{ seasonEpisode.title }}
                            </div>
                            <div >{{ seasonEpisode.number }}</div>
                        </div>
                        <p v-if="this.isInHistory(seasonEpisode.episodeId)"
                        class="has-text-black is-underlined has-text-weight-bold">
                            Already seen
                        </p>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SeasonEpiView',
    props: {
        seasonEpisode: Object,
    },
    methods: {
        isInHistory(episodeId) {
            return this.$store.state.history.some((show) => show.episodeId === episodeId);
        },
    },
};
</script>

<style>

</style>
