import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';

import { CreateUser } from '../domain/User.ts';

export const useRegisterUser = () => {
    const error: Ref<string> = ref('');
    const loading: Ref<boolean> = ref(false);

    const router = useRouter();

    const registerUser = async (user: CreateUser) => {
        loading.value = true;

        const response = await fetch('http://localhost:3000/open/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            await router.push({ name: 'Login' });
        } else {
            error.value = 'Erreur lors de la création';
            loading.value = false;
        }
    };

    return { error, loading, registerUser };
};
