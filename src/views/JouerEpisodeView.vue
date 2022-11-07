<template>
    <div>
        <div v-if="this.errorMsg !== null && this.errorMsg.length > 0"
             class="notification border-step2" tabindex="0" role="alert">
            <p v-for="msg in this.errorMsg"
               :key ="msg">
                {{msg}}
            </p>
        </div>
        <div class="spacer"></div>
        <div class="container" v-if="this.episodeDetail !== null">
            <section class="hero is-black has-text-centered is-12 mb-2">
                <div class="hero-body">
                    <p class="title">
                        {{this.episodeDetail.tvshowTitle}}
                    </p>
                    <p class="subtitle">
                        {{this.episodeDetail.number + ': ' + this.episodeDetail.title}}
                    </p>
                </div>
            </section>
            <div class="spacer"></div>
            <div class="columns" v-if="this.data !== null">
                <div class="column is-12">
                    <figure class="image is-16by9">
                        <video class="has-ratio" width="640" height="360" controls>
                            <source v-bind:src="this.data.videoURL" type="video/mp4"
                                    title="Episode">
                        </video>
                    </figure>
                    <br>
                </div>
            </div>
            <div class="columns is-multiline" v-if="this.seasonEpisodes !== null">
                <div class="column is-2"/>
                <div class="column is-4" v-if="FirstSeasonEpisode">
                    <a v-bind:href="`/playepisode/${this.$route.params.seasonId}`+
                        `/${this.episodeId - 1}`">
                        <section class="hero is-black has-text-centered is-small">
                            <div class="hero-body">
                                <p class="subtitle">
                                    &#x2190; Previous episode
                                </p>
                            </div>
                        </section>
                    </a>
                    <div class="box related-list">
                        <article class="media related-card">
                            <div class="media-left">
                                <figure class="image">
                                    <img  alt="Image" v-bind:src ="this.firstEpisodeInfo.imgURL">
                                </figure>
                            </div>
                            <div class="media-content">
                                <div class="content">
                                    <p>
                                        <span class="video-title">{{this.firstEpisodeInfo.title}}
                                        </span>
                                        <span class="video-views">239 views</span>
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="column is-4" v-if="LastSeasonEpisode">
                    <a v-bind:href="`/playepisode/${this.$route.params.seasonId}`+
                        `/${this.episodeId + 1}`">
                    <section class="hero is-black has-text-centered is-small">
                        <div class="hero-body">
                            <p class="subtitle">
                                Next episode →
                            </p>
                        </div>
                    </section>
                    </a>
                    <div class="box related-list">
                        <article class="media related-card">
                            <div class="media-left">
                                <figure class="image">
                                    <img  alt="Image" v-bind:src ="this.lastEpisodeInfo.imgURL">
                                </figure>
                            </div>
                            <div class="media-content">
                                <div class="content">
                                    <p>
                                        <span class="video-title">{{this.lastEpisodeInfo.title}}
                                        </span>
                                        <span class="video-views">239 views</span>
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="column is-2"/>
            </div>
        </div>
    </div>
</template>

<script>
import { EPISODE_URL, EPISODEPLAY_URL, EPISODES_URL } from '@/constants';

export default {
    name: 'JouerEpisodeView',
    data() {
        return {
            seasonEpisodes: null,
            seasonId: this.$route.params.seasonId,
            episodeId: parseInt(this.$route.params.episodeId, 10),
            data: null,
            episodeDetail: null,
            lastEpisodeInfo: null,
            firstEpisodeInfo: null,
            errorMsg: null,
        };
    },
    mounted() {
        if (this.$store.state.token !== '') {
            this.GetEpisode();
            this.GetEpisodeDetails();
            this.GetSeasonEpisode();
            this.$store.dispatch('storeHistory');
        } else {
            this.errorMsg = [];
            this.errorMsg.push('You must be connected to watch this content');
        }
    },
    computed: {
        LastSeasonEpisode() {
            return this.episodeId < this.lastEpisodeInfo.episodeId;
        },
        FirstSeasonEpisode() {
            return this.episodeId > this.firstEpisodeInfo.episodeId;
        },
    },
    methods: {
        async GetEpisode() {
            this.errorMsg = [];
            const bearerToken = `bearer ${this.$store.state.token}`;
            try {
                const rep = await fetch(`${EPISODEPLAY_URL}?episodeId=${this.episodeId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: bearerToken,
                    },
                });
                if (rep.ok) {
                    this.data = await rep.json();
                } else {
                    const msg = await rep.json();
                    this.errorMsg.push(msg.message);
                }
            } catch (err) {
                this.errorMsg.push(err.message);
            }
        },
        async GetSeasonEpisode() {
            const rep = await fetch(`${EPISODES_URL}?seasonId=${this.seasonId}`);
            if (rep.ok) {
                const data = await rep.json();
                this.seasonEpisodes = data;
                // eslint-disable-next-line prefer-destructuring
                this.firstEpisodeInfo = data.episodes[0];
                this.lastEpisodeInfo = data.episodes[data.episodes.length - 1];
            }
        },
        async GetEpisodeDetails() {
            const rep = await fetch(`${EPISODE_URL}?episodeId=${this.episodeId}`);
            if (rep.ok) {
                this.episodeDetail = await rep.json();
            }
        },
    },
};
</script>

<style>
body {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,
    "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
}
.spacer {
    height:20px;
}
.video-title {
    font-size: 1.5em;
    font-weight: 500;
}
.related-card .video-title {
    display:block;
    font-size: 13px;
    font-weight: 500;
}
.related-card .video-account,.related-card .video-views {
    display:block;
    font-size: 11px;
    color: #95A5A6;
}

.related-card img {
    height:68px;
}
.related-card.media .media, .related-card.media+.media {
    border-top: none;
}
.related-list .autoplay {
    padding-bottom: 10px;
}
.related-list .autoplay .autoplay-toggle .fa{
    font-size: 13px;
    padding:5px 10px;
}
</style>
