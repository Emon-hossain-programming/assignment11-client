import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxios from "../Hooks/useAxios";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const axiosSecure = useAxios();
    
    const email = searchParams.get("email");

    useEffect(() => {
        if (email) {
           
            axiosSecure.patch(`/users/make-premium/${email}`)
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful!',
                            text: 'You are now a Premium Member.',
                            timer: 3000
                        });
                       
                        setTimeout(() => navigate('/dashboard/MyIssues'), 3000);
                    }
                })
                .catch(err => {
                    console.error("Error updating status:", err);
                });
        }
    }, [email, axiosSecure, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-3xl font-bold text-green-600">Processing Payment...</h2>
            <p className="mt-2 text-gray-600">Please wait, we are updating your membership.</p>
           
        </div>
    );
};

export default PaymentSuccess;