import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';

import { CreateUser } from '../domain/User.ts';

export const useRegisterUser = () => {
    const error: Ref<string> = ref('');
    const loading: Ref<boolean> = ref(false);

    const router = useRouter();

    const registerUser = async (user: CreateUser) => {
        loading.value = true;

        try {
            await fetch('http://localhost:3000/open/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            await router.push({ name: 'Login' });
        } catch (err: any) {
            error.value = 'Erreur lors de la création';
        } finally {
            loading.value = false;
        }
    };

    return { error, loading, registerUser };
};
