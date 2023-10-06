import './DeleteConfirm.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { deleteArticleConfirm } from '../../Redux/User/actions';
import { deleteArticle } from '../../../Services/apiRequests';

function DeleteConfirm({ slug }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onDelete = async () => {
    try {
      dispatch(deleteArticleConfirm());
      await deleteArticle(slug);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='modal'>
      Are you sure to delete this article?
      <div className='modal__buttons'>
        <button
          type='button'
          className='button__no'
          onClick={() => dispatch(deleteArticleConfirm())}
        >
          No
        </button>
        <button type='button' className='button__yes' onClick={onDelete}>
          Yes
        </button>
      </div>
    </div>
  );
}
export default DeleteConfirm;
