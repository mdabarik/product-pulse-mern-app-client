import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { BiUpvote } from "react-icons/bi";
import { BiSolidUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import useRole from '../../hooks/useRole';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';



const Voting = ({ product, refetch: refetch2 }) => {
    const [role] = useRole();
    const { user, loading, setResolver, resolver } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    // console.log(resolver, 'relsover observe');

    // console.log(product);

    /*--- get total downvote & upvote of curr product---*/
    const { data: votes, isLoading, refetch } = useQuery({
        queryKey: ['query-for-votes', loading, product, user],
        queryFn: async () => {
            // return {upvotes: n, downvotes: n}
            const res = await axiosPublic.get(`/get-votes?id=${product?._id}`);
            return res.data;
        }
    })

    /*--- get downvote & upvote of currUser +&+ currProd---*/
    const { data: currUserVotes, isLoading: isLoading1, refetch: refetch1 } = useQuery({
        queryKey: ['query-for-user-votes', loading, product, user],
        queryFn: async () => {
            // return {upvotes: n, downvotes: n}
            const res = await axiosPublic.get(`/get-user-votes?id=${product?._id}&email=${user?.email}`);
            // console.log(res, 'curUservote');
            return res.data;
        }
    })
    
    return (
        <div>
            {
                !isLoading && !isLoading
                    ?
                    <div className='flex text-lg gap-4 justify-center'>
                        {/* upvote */}
                        <button disabled className="bg-[#edf7ed] text-[#1d4620] p-3 rounded-full flex items-center">
                            {
                                currUserVotes?.upvotes > 0
                                    ?
                                    <BiSolidUpvote className='text-xl'></BiSolidUpvote>
                                    :
                                    <BiUpvote className='text-xl'></BiUpvote>
                            }
                            <span>(+{votes?.upvotes})</span>
                        </button>
                        {/* downvote */}
                        <button disabled className="bg-[#fdeded] text-[#5f2120] p-3 rounded-full flex items-center">
                            {
                                currUserVotes?.downvotes > 0
                                    ?
                                    <BiSolidDownvote className='text-xl'></BiSolidDownvote>
                                    :
                                    <BiDownvote className='text-xl'></BiDownvote>
                            }

                            <span>(-{votes?.downvotes})</span>
                        </button>
                    </div>
                    :
                    <>
                        <div className="flex text-lg gap-4 justify-center">
                            <Skeleton variant="circular" width={70} height={52} />
                            <Skeleton variant="circular" width={70} height={52} />
                        </div>
                    </>
            }
        </div>
    );
};

export default Voting;






// {
//     isProdOwner ?
//         <>
//             {/* upvote */}
//             <button disabled className="bg-[#edf7ed] text-[#1d4620] p-3 rounded-full flex items-center">
//                 <BiUpvote className='text-xl'></BiUpvote>
//                 <span>(0)</span>
//             </button>
//             {/* downvote */}
//             <button disabled className="bg-[#fdeded] text-[#5f2120] p-3 rounded-full flex items-center">
//                 <BiDownvote className='text-xl'></BiDownvote>
//                 <span>(0)</span>
//             </button>
//         </>
//         :
//         <>
//             {/* upvote */}
//             <button onClick={() => handleVote('upvote')} className="bg-[#edf7ed] text-[#1d4620] p-3 rounded-full flex items-center">
//                 <BiUpvote className='text-xl'></BiUpvote>
//                 <span>(0)</span>
//             </button>
//             {/* downvote */}
//             <button onClick={() => handleVote('downvote')} className="bg-[#fdeded] text-[#5f2120] p-3 rounded-full flex items-center">
//                 <BiDownvote className='text-xl'></BiDownvote>
//                 <span>(0)</span>
//             </button>
//         </>
// }