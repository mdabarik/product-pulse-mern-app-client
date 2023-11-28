import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { BiUpvote } from "react-icons/bi";
import { BiSolidUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useRole from '../../hooks/useRole';
import Skeleton from '@mui/material/Skeleton';
import Loader from '../../components/Shared/Loader/Loader';



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
    // console.log(currUserVotes, 'votes ucr user');

    // if (loading) return <Loader></Loader>

    const handleVote = (vote) => {
        // console.log(product.prodOwnerInfo);
        // console.log(product?.prodOwnerInfo?.email, user?.email);
        /*product user can't upvote*/
        if (product?.prodOwnerInfo?.email == user?.email) {
            toast.error(`You can't ${vote} your own product.`);
            return;
        }
        /*redirect to login page if user not logged in*/
        if (!loading && !user) {
            toast.success(`Please login to ${vote}`);
            navigate('/login');
            return;
        }
        // /*admin or moderator user can't upvote*/
        // if (role == 'admin' || role == 'moderator') {
        //     toast.error(`${role} can't ${vote}`);
        //     return;
        // }

        /**---if curr user already upvoted---**/
        if (currUserVotes?.upvotes == 1 && vote == 'upvote') {
            toast.error(`You can't upvote one product twice`);
            return;
        }

        /**---if curr user already downvoted---**/
        if (currUserVotes?.downvotes == 1 && vote == 'downvote') {
            toast.error(`You can't downvote one product twice`);
            return;
        }

        /*-- (if currUser upvoted || if currUser downvoted || if currUser not voted): update/add --*/
        const updatedDoc = {
            userEmail: user?.email,
            prodId: product?._id,
            types: vote
        }

        if (user) {
            axiosPublic.put('/add-or-update', updatedDoc)
                .then(res => {
                    // console.log(res);
                    if (res.data.modifiedCount > 0 || res.data.upsertedId) {
                        toast.success(`${vote}d successfully`);
                        refetch();
                        refetch1();
                        if (refetch2) {
                            refetch2();
                        }
                        setResolver(!resolver);
                    }
                })
                .catch(err => {
                    console.log(err, 'inside handle vote');
                })
        }


        // console.log(updatedDoc, 'voting status');
    }

    // console.log(product, 'recieved product on voting.jsx');
    /*
        1. disable voting for product owner
        2. onClick voting without login redirect to login page (will be applied for home page)
        3. get vote status of curr logged in user
        4. if user vote is upvote (then disabled it) or if user vote is downvote (then disabled it)
        5. onclick upvote - add/update to database and refetch
        6. onclick downvote - add/update to database and refetch
    */
    return (
        <div>
            {
                !isLoading && !isLoading
                    ?
                    <div className='flex text-lg gap-4 justify-center'>
                        {/* upvote */}
                        <button onClick={() => handleVote('upvote')} className="bg-[#edf7ed] text-[#1d4620] p-3 rounded-full flex items-center">
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
                        <button onClick={() => handleVote('downvote')} className="bg-[#fdeded] text-[#5f2120] p-3 rounded-full flex items-center">
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