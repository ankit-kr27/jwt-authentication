import { useQuery } from "@tanstack/react-query";
import { getUser } from "../lib/api";


export const AUTH = 'auth';

const useAuth = (opts = {}) => {
    const { data: user, ...rest } = useQuery({
        queryKey: [AUTH],
        queryFn: getUser,
        staleTime: Infinity,
        ...opts
    });

    return { user, ...rest };
};

export default useAuth;

// It allows us to use the useAuth anywhere in our app and Infinitely cache the user data. The user will be fetched only once and will be stored in the AUTH cache key. This is useful for fetching the user data on app load and keeping it in the cache for the entire session.