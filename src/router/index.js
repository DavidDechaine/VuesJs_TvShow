import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import DetailsView from '@/views/DetailsView.vue';
import SeasonEpisodesView from '@/views/SeasonEpisodesView.vue';
import DetailsEpisodeView from '@/views/DetailsEpisodeView.vue';
import SignUpView from '@/views/SignUpView.vue';
import LoginView from '@/views/LoginView.vue';
import AboutView from '@/views/AboutView.vue';
import ProfileView from '@/views/ProfileView.vue';
import HistoryView from '@/views/HistoryView.vue';
import JouerEpisodeView from '@/views/JouerEpisodeView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/details/:tvshowId',
        name: 'details',
        component: DetailsView,
    },
    {
        path: '/season/:seasonId',
        name: 'season',
        component: SeasonEpisodesView,
    },
    {
        path: '/episodedetails/:seasonId/:episodeId',
        name: 'episodedetails',
        component: DetailsEpisodeView,
    },
    {
        path: '/signUp',
        name: 'signUp',
        component: SignUpView,
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        children: [{
            path: '/login/:username',
            name: 'loginFromSignUp',
            component: LoginView,
        },
        ],
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView,
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView,
    },
    {
        path: '/history',
        name: 'history',
        component: HistoryView,
    },
    {
        path: '/playepisode/:seasonId/:episodeId',
        name: 'playepisode',
        component: JouerEpisodeView,
    },
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
