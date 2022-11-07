<template>
<div>
    <section role="main">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-three-quarters">
                    <section class="hero is-black has-text-centered mb-2">
                        <div class="hero-body">
                            <p class="title has-text-warning-dark">Login</p>
                        </div>
                    </section>

                    <div v-if="this.errorMsg !== null && this.errorMsg.length > 0"
                         class="notification border-step2" tabindex="0" role="alert">
                        <p v-for="msg in this.errorMsg"
                           :key ="msg">
                            {{msg}}
                        </p>
                    </div>

                    <div class="box" role="form">
                        <div class="field">
                            <label class="label">Username</label>
                            <div class="control has-icons-left has-icons-right">
                                <input class="input" type="text" placeholder="Username"
                                       v-model="username" required
                                       aria-describedby="UserCredential">
                                <span id="UserCredential" class="is-hidden">
                                        {{this.credentialUser}}</span>
                                <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                </span>
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Password</label>
                            <div class="control has-icons-left has-icons-right">
                                <input class="input" type="password" placeholder="Password"
                                       v-model="password" required
                                       aria-describedby="PasswordCredential">
                                <span id="PasswordCredential" class="is-hidden">
                                        {{this.credentialPassword}}</span>
                                <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                </span>
                            </div>
                        </div>

                        <div class="field is-grouped mt-4">
                            <div class="control">
                                <button class="button is-black"
                                @click="login">Submit</button>
                            </div>
                            <div class="control">
                                <button class="button is-dark"
                                v-on:click="this.$router.push('/')">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
</template>

<script>
import { SRV_AUTH } from '@/constants';
import {
    PASSWORD_CREDENTIAL, PASSWORD_EMPTY, USERNAME_CREDENTIAL, USERNAME_EMPTY,
} from '@/validator';

export default {
    name: 'LoginView',
    data() {
        return {
            username: this.$route.params.username ? this.$route.params.username : '',
            password: '',
            errorMsg: null,
            credentialUser: USERNAME_CREDENTIAL,
            credentialPassword: PASSWORD_CREDENTIAL,
        };
    },
    methods: {
        async login() {
            this.errorMsg = [];
            if (this.username === '') {
                this.errorMsg.push(USERNAME_EMPTY);
            }
            if (this.password === '') {
                this.errorMsg.push(PASSWORD_EMPTY);
            }
            if (this.errorMsg.length === 0) {
                try {
                    const bodyContent = {
                        username: this.username,
                        password: this.password,
                    };
                    const response = await fetch(`${SRV_AUTH}/token`, {
                        method: 'POST',
                        body: JSON.stringify(bodyContent),
                        headers: { 'Content-Type': 'application/json' },
                    });
                    if (response.ok) {
                        const token = await response.json();
                        this.$store.dispatch('storeToken', token.token);
                        await this.$router.push('/');
                    } else {
                        const msg = await response.json();
                        this.errorMsg.push(msg.message);
                    }
                } catch (err) {
                    this.errorMsg.push(err.message);
                }
            }
        },
    },
};
</script>

<style>

</style>
