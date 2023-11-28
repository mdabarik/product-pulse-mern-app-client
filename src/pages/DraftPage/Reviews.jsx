import Input from '@mui/joy/Input';
import MailIcon from '@mui/icons-material/Mail';
import Person2Icon from '@mui/icons-material/Person2';
import Textarea from '@mui/joy/Textarea';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import ReviewDetails from './ReviewDetails';


const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};


function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const Reviews = () => {
    const [value, setValue] = useState(0);
    const [hover, setHover] = useState(-1);
    const { user,setObserveAddReview } = useAuth();
    const [comment, setComment] = useState('');


    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { data: review } = useQuery({
        queryKey: ['reviewsa', setObserveAddReview],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/review?email=${user?.email}&id=${id}`);
            setValue(data?.userRating || 0);
            setComment(data?.userComment || '');
            return data;
        }
    })

    // if (isLoading) return <Loader></Loader>

    return (
        <div>
            <div>
                <ReviewDetails></ReviewDetails>
            </div>
            <div>
                <h1 className='text-xl font-bold my-4'>Add Your Review</h1>
                <div className='flex flex-col space-y-5'>
                    <Input
                        sx={{ padding: '10px' }}
                        startDecorator={<Person2Icon />}
                        value={user?.displayName}
                        readOnly
                        disabled
                        type="text"
                    ></Input>
                    <Input
                        sx={{ padding: '10px' }}
                        startDecorator={<MailIcon />}
                        placeholder="Product name"
                        type="text"
                        defaultValue={user?.email}
                        disabled
                    ></Input>
                    <div className='flex gap-x-4'>
                        <p className='font-bold'>Select rating:</p>
                        {
                            <Box
                                sx={{
                                    width: 200,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Rating
                                    disabled
                                    readOnly
                                    defaultValue={0}
                                    name="hover-feedback"
                                    value={value || review?.userRating}
                                    precision={0.5}
                                    getLabelText={getLabelText}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    onChangeActive={(event, newHover) => {
                                        setHover(newHover);
                                    }}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                {value !== null && (
                                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                )}
                            </Box>
                        }
                    </div>

                    <Textarea
                        disabled
                        sx={{ padding: '10px' }}
                        defaultValue={review?.userComment || ''}
                        placeholder="Product description" minRows={4} />

                    {
                        <Button disabled variant="contained" size="large" sx={{ width: '100%', marginTop: '5px' }}>
                            {/* <span className="loading loading-bars loading-md text-acent"></span> */}
                            <span className="ml-1 font-bold">Unpublished Product</span>
                        </Button>
                    }

                </div>


            </div>
        </div>
    );
};

export default Reviews;