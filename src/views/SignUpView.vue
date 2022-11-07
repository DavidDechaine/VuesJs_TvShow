<template>
    <div>
        <section role="main">
            <div v-if="this.errorMsg !== null && this.errorMsg.length > 0"
                 class="notification border-step2" tabindex="0" role="alert">
                <p v-for="msg in this.errorMsg"
                   :key ="msg">
                    {{msg}}
                </p>
            </div>

            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-three-quarters">
                        <section class="hero is-black has-text-centered mb-2">
                            <div class="hero-body">
                                <p class="title has-text-warning-dark">Sign Up</p>
                            </div>
                        </section>
                        <div class="box" role="form">
                            <div class="field">
                                <label class="label">Email</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input" type="email" required
                                           placeholder="Email input"  v-model="email">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-envelope"></i>
                                    </span>
                                </div>
                            </div>

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
                            <div class="field">
                                <label class="label">Password confirmation</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input" type="password" placeholder="Password"
                                           v-model="passwordConfirm" required
                                           aria-describedby="PasswordConfirm">
                                    <span id="PasswordConfirm" class="is-hidden">
                                        Must match the password entry.
                                    </span>
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                </span>
                                </div>
                            </div>

                            <div class="field is-grouped mt-4">
                                <div class="control">
                                    <button class="button is-black"
                                            @click="Signup">Sign up</button>
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
import {
    PasswordValidator,
    UsernameValidator,
    PasswordConfirmation,
    EMAIL_EMPTY,
    USERNAME_EMPTY,
    PASSWORD_EMPTY,
    CONFIRM_MATCH,
    USERNAME_CREDENTIAL,
    PASSWORD_CREDENTIAL,
} from '@/validator';
import { SRV_AUTH } from '@/constants';

export default {
    name: 'SignUpView',
    data() {
        return {
            username: '',
            password: '',
            errorMsg: null,
            passwordConfirm: '',
            email: '',
            credentialUser: USERNAME_CREDENTIAL,
            credentialPassword: PASSWORD_CREDENTIAL,
        };
    },
    methods: {
        async Signup() {
            this.errorMsg = [];
            if (this.email === '') {
                this.errorMsg.push(EMAIL_EMPTY);
            }
            if (this.username === '') {
                this.errorMsg.push(USERNAME_EMPTY);
            }
            if (this.password === '') {
                this.errorMsg.push(PASSWORD_EMPTY);
            }
            if (!PasswordConfirmation(this.password, this.passwordConfirm)) {
                this.errorMsg.push(CONFIRM_MATCH);
            }
            if (!UsernameValidator(this.username)) {
                this.errorMsg.push(USERNAME_CREDENTIAL);
            }
            if (!PasswordValidator(this.password)) {
                this.errorMsg.push(PASSWORD_CREDENTIAL);
            }
            if (this.errorMsg.length === 0) {
                try {
                    const bodyContent = {
                        username: this.username,
                        password: this.password,
                        email: this.email,
                    };
                    const response = await fetch(`${SRV_AUTH}/register`, {
                        method: 'POST',
                        body: JSON.stringify(bodyContent),
                        headers: { 'Content-Type': 'application/json' },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        await this.$router.push({ name: 'login', params: { username: data.username } });
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
