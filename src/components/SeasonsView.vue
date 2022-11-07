<template>
    <div class="column is-3">
        <router-link v-bind:to="{name: 'season',
        params: {seasonId: parseInt(season.seasonId)}}">
            <div class="card" v-if="season !== null">
                <div class="card has-text-black">
                    <div class="card-image">
                        <figure class="image is-3by4">
                            <img
                            v-bind:alt="`season ` + season.number"
                            v-bind:src="season.imgURL">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="content has-text-centered">
                            <div class="has-text-weight-bold">
                                Season {{ season.number }}
                            </div>
                            <div >{{ season.episodeCount }} episodes</div>
                        </div>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'SeasonsView',
    props: {
        season: Object,
    },
};
</script>

<style>

</style>
