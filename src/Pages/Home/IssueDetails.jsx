import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";


const IssueDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxios();

    const { data: issue = {}, isLoading } = useQuery({
        queryKey: ['issue', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issue/${id}`);
            return res.data;
        }
    });

    if (isLoading) return <span className="loading loading-spinner text-primary"></span>;

    return (
        <div className="container mx-auto py-10">
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure><img src={issue.photo} alt="Issue" className="max-w-md" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-3xl font-bold">{issue.title}</h2>
                    <p className="text-gray-600"><strong>Location:</strong> {issue.location}</p>
                    <p className="text-gray-600"><strong>Category:</strong> {issue.category}</p>
                    <p className="mt-4">{issue.description}</p>
                    <div className="badge badge-warning p-4 mt-5 text-lg">{issue.status}</div>
                </div>
            </div>
        </div>
    );
};

export default IssueDetails;