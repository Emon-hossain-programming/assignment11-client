import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxios();

    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            return res.data?.admin; 
        }
    });
    return [isAdmin, isAdminLoading];
};

export default useAdmin;