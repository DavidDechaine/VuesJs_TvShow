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
                        <section class="hero is-black has-text-centered mb-2 ">
                            <div class="hero-body">
                                <p class="title has-text-warning-dark">Profile</p>
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
                                    v-model="username" required aria-describedby="UserCredential">
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
                                            @click="UpdateUser">Update</button>
                                </div>
                                <div class="control">
                                    <button class="button is-dark"
                                            @:click="this.$router.push('/')">Cancel</button>
                                </div>
                            </div>
                            <div class="field is-grouped mt-4">
                                <div class="control">
                                    <button class="button is-black"
                                            v-on:click="DeleteUser">DELETE PROFILE</button>
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
    USERNAME_EMPTY,
    EMAIL_EMPTY,
    PASSWORD_EMPTY,
    CONFIRM_MATCH,
    USERNAME_CREDENTIAL,
    PASSWORD_CREDENTIAL,
} from '@/validator';
import { SRV_USER } from '@/constants';

export default {
    name: 'SignUpView',
    data() {
        return {
            credentialUser: USERNAME_CREDENTIAL,
            credentialPassword: PASSWORD_CREDENTIAL,
            username: '',
            password: '',
            errorMsg: null,
            passwordConfirm: '',
            email: '',
        };
    },
    mounted() {
        this.GetUserInfo();
    },
    methods: {
        async DeleteUser() {
            this.errorMsg = [];
            if (window.confirm('Do you really want to delete?')) {
                try {
                    const bearerToken = `bearer ${this.$store.state.token}`;
                    const response = await fetch(`${SRV_USER}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: bearerToken,
                        },
                    });
                    if (response.ok) {
                        this.$store.dispatch('storeToken', '');
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
        async GetUserInfo() {
            this.errorMsg = [];
            try {
                const bearerToken = `bearer ${this.$store.state.token}`;
                const response = await fetch(`${SRV_USER}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: bearerToken,
                    },
                });
                if (response.ok) {
                    const userInfo = await response.json();
                    this.username = userInfo.username;
                    this.email = userInfo.email;
                } else {
                    const msg = await response.json();
                    this.errorMsg.push(msg.message);
                }
            } catch (error) {
                this.errorMsg.push(error.message);
            }
        },
        async UpdateUser() {
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
                    const bearerToken = `bearer ${this.$store.state.token}`;
                    const response = await fetch(`${SRV_USER}`, {
                        method: 'POST',
                        body: JSON.stringify(bodyContent),
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: bearerToken,
                        },
                    });
                    if (response.ok) {
                        this.errorMsg.push('Profile updated');
                    } else {
                        const msg = await response.json();
                        this.errorMsg.push(msg.message);
                    }
                } catch (err) {
                    console.log(err);
                    this.errorMsg.push(err);
                }
            }
        },
    },
};
</script>

<style>

</style>
