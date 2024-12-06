import { useRouter } from 'vue-router';

export const useLogoutUser = () => {
    const router = useRouter();

    const logoutUser = async () => {
        localStorage.removeItem('token');

        await router.push({ name: 'Login' });
    };

    return { logoutUser };
};
