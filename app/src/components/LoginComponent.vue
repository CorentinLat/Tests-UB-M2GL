<template>
    <section class="card">
        <form class="form" @submit.prevent="handleSubmit">
            <article class="form-item">
                <label class="label" for="email">Adresse mail</label>
                <input class="input" id="email" type="text" v-model="form.email" :disabled="loading" required>
            </article>

            <article class="form-item">
                <label class="label" for="password">Mot de Passe</label>
                <input class="input" id="password" type="password" v-model="form.password" :disabled="loading" required>
            </article>

            <p class="error" v-if="error">{{ error }}</p>

            <button :disabled="loading || !isFormValid">Se connecter</button>
        </form>

        <router-link :to="{ name: 'Register' }">Créer un compte</router-link>
    </section>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';

import { useLogUser } from '../composable/useLogUser';

const { error, loading, logUser } = useLogUser();

const form = reactive({ email: '', password: '' });

const isFormValid = computed(() => form.email && form.password);

const handleSubmit = async () => {
    if (loading.value || !isFormValid.value) return;

    await logUser(form.email, form.password);
};
</script>
