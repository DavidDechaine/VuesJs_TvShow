import { createStore } from 'vuex';
import { SRV_USER } from '@/constants';

export default createStore({
    state: {
        token: '',
        history: [],
    },
    getters: {},
    mutations: {
        setToken(state, token) {
            state.token = token;
            sessionStorage.setItem('token', token);
        },
        setHistory(state, history) {
            state.history = history;
        },
    },
    actions: {
        storeToken(context, token) {
            context.commit('setToken', token);
        },
        async storeHistory(context) {
            const bearerToken = `bearer ${this.state.token}`;
            const rep = await fetch(`${SRV_USER}/history`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: bearerToken,
                },
            });
            if (rep.ok) {
                const data = await rep.json();
                await context.commit('setHistory', data);
            }
        },
    },
    modules: {},
});
