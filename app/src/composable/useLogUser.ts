import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';

export const useLogUser = () => {
    const error: Ref<string> = ref('');
    const loading: Ref<boolean> = ref(false);

    const router = useRouter();

    const logUser = async (email: string, password: string) => {
        loading.value = true;

        const response = await fetch('http://localhost:3000/open/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);

            await router.push({ name: 'Home' });
        } else {
            error.value = 'Connexion impossible';
            loading.value = false;
        }
    };

    return { error, loading, logUser };
};
