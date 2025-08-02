import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import Loading from '../../../components/Loading/Loading';

const ManageUsers = () => {
    const axiosInstance = useAxios();
    const queryClient = useQueryClient();
    const axiosSecure =useAxiosSecure();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['admin-users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    console.log(users)
    const updateRoleMutation = useMutation({
        mutationFn: async ({ id, newRole }) => {
            return axiosSecure.patch(`/users/${id}`, { role: newRole });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
            Swal.fire('Updated!', 'User role updated successfully.', 'success');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            return axiosSecure.delete(`/users/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
            Swal.fire('Deleted!', 'User has been removed.', 'success');
        }
    });

    const handleRoleChange = (id, currentRole, e) => {
        const selectedRole = e.target.value;
        if (selectedRole === currentRole) return;

        Swal.fire({
            title: `Change role to "${selectedRole}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, change it!',
        }).then((result) => {
            if (result.isConfirmed) {
                updateRoleMutation.mutate({ id, newRole: selectedRole });
            }
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to remove this user!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };

    if (isLoading) {
        return <div className="text-center mt-10 text-gray-600 dark:text-gray-300"><Loading></Loading></div>;
    }

    return (
        <div className="p-6 bg-white dark:bg-gray-900 dark:text-white transition-colors min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

            <div className="overflow-x-auto rounded shadow">
                <table className="table w-full">
                    <thead className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-200">
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Coins</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="hover:bg-gray-300 dark:hover:bg-gray-700 transition cursor-pointer">
                                <td>
                                    <img src={user.photoUrl} alt={user.name} className="w-10 h-10 rounded-full" />
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <select
                                        className="select select-sm select-bordered dark:text-black"
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, user.role, e)}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="buyer">Buyer</option>
                                        <option value="worker">Worker</option>
                                    </select>
                                </td>
                                <td>{user.coins}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="btn btn-sm btn-error text-white"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
