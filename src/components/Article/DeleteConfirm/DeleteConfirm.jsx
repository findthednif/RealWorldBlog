import "./DeleteConfirm.scss";
import { deleteArticleConfirm } from "../../Redux/User/actions";
import { useDispatch } from "react-redux";
import { deleteArticle } from "../../../Services/apiRequests";
import { useNavigate } from "react-router-dom";
const DeleteConfirm = ({ slug }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const onDelete = async () => {
    try {
      dispatch(deleteArticleConfirm());
      const responce = deleteArticle(token, slug);
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="modal">
      Are you sure to delete this article?
      <div className="modal__buttons">
        <button
          className="button__no"
          onClick={() => dispatch(deleteArticleConfirm())}
        >
          No
        </button>
        <button className="button__yes" onClick={onDelete}>
          Yes
        </button>
      </div>
    </div>
  );
};
export default DeleteConfirm;
