import React, { useEffect, useState } from 'react'
import StockCommentForm from './StockCommentForm/StockCommentForm';
import { CommentFormInputs } from '../../Models/CommentFormInputs';
import { commentGetApi, commentPostApi } from '../../Services/CommentService';
import { toast } from 'react-toastify';
import { CommentGet } from '../../Models/Comment';
import Spinner from '../Spinner/Spinner';
import StockCommentList from './StockCommentList/StockCommentList';

type Props = {
    stockSymbol: string;
}

const StockComment = ({ stockSymbol }: Props) => {
    const [comments, setComments] = useState<CommentGet[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getComments();
    }, [])

    const handleComment = (e: CommentFormInputs) => {
        commentPostApi(e.title, e.content, stockSymbol).then((res) => {
            if (res) {
                toast.success("Comment created successfully!");
                getComments();
            }
        }).catch((e) => {
            toast.warning(e);
        });
    }
    const getComments = () => {
        setLoading(true);
        commentGetApi(stockSymbol).then((res) => {
            setLoading(false);
            if (res) {
                setComments(res?.data);
            }
        })
    }
  return (
    <div className='flex flex-col'>
        {loading ? <Spinner /> : <StockCommentList comments={comments!} />}
        <StockCommentForm symbol={stockSymbol} handleComment={handleComment} />
    </div>
  )
}

export default StockComment