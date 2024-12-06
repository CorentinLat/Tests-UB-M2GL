import { ref, Ref } from 'vue';

import { User } from '../domain/User.ts';

export const useGetUsers = () => {
    const users: Ref<User[]> = ref([]);
    const error: Ref<string> = ref('');
    const loading: Ref<boolean> = ref(false);

    const getUsers = async () => {
        loading.value = true;

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token manquant');

            const response = await fetch('http://localhost:3000/api/user', {
                headers: { Authorization: `Bearer ${token}` },
            });

            users.value = await response.json();
        } catch (err: any) {
            error.value = "Impossible de récupérer les utilisateurs...";
        } finally {
            loading.value = false;
        }
    };

    return { users, error, loading, getUsers };
};
