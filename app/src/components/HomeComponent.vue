<template>
    <section class="card" style="width: 500px">
        <article style="display: flex; gap: 1em; align-items: center; justify-content: center">
            <b style="font-size: 1.2em">{{ username }}</b>
            <a style="cursor: pointer" @click.prevent="logoutUser">Déconnexion</a>
        </article>

        <p class="error" v-if="error">{{ error }}</p>

        <p v-if="loading">Chargement en cours...</p>

        <article v-if="!error && !loading">
            <table style="width: 100%">
                <thead>
                    <tr>
                        <th>Nom d'utilisateur</th>
                        <th>Adresse mail</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                    </tr>
                </tbody>
            </table>
        </article>
    </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';

import { User } from '../domain/User.ts';

import { useGetUsers } from '../composable/useGetUsers';
import { useLogoutUser } from '../composable/useLogoutUser';

const { users, error, loading, getUsers } = useGetUsers();
const { logoutUser } = useLogoutUser();

const username = computed(() => {
    const token = localStorage.getItem('token');
    if (!token) return '';

    const { name } = jwtDecode<User>(token);
    return name;
});

onMounted(getUsers);
</script>
