<template>
    <section class="card">
        <form class="form" @submit.prevent="handleSubmit">
            <article class="form-item">
                <label class="label" for="name">Nom d'utilisateur</label>
                <input class="input" id="name" type="text" v-model="form.name" :disabled="loading" required>
            </article>

            <article class="form-item">
                <label class="label" for="email">Adresse mail</label>
                <input class="input" id="email" type="text" v-model="form.email" :disabled="loading" required>
            </article>

            <article class="form-item">
                <label class="label" for="password">Mot de Passe</label>
                <input class="input" id="password" type="password" v-model="form.password" :disabled="loading" required>
            </article>

            <p class="error" v-if="error">{{ error }}</p>

            <button :disabled="loading">Créer</button>
        </form>

        <router-link :to="{ name: 'Login' }">Se connecter</router-link>
    </section>
</template>

<script setup lang="ts">
import { computed, Reactive, reactive } from 'vue';

import { CreateUser } from '../domain/User.ts';

import { useRegisterUser } from '../composable/useRegisterUser';

const { error, loading, registerUser } = useRegisterUser();

const form: Reactive<CreateUser> = reactive({ name: '', email: '', password: '' });

const isFormValid = computed(() => form.email && form.password);

const handleSubmit = async () => {
    if (loading.value || !isFormValid.value) return;

    await registerUser(form);
};
</script>
