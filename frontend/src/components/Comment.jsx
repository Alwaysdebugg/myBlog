import PropTypes from 'prop-types';
import {MdDelete} from 'react-icons/md'
const Comment = ({comment}) => {
  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg">
    <div className="flex items-center justify-between">
      <h3 className="font-bold text-gray-600">{comment.author}</h3>
      <div className="flex justify-center items-center space-x-4">
      <p>{new Date(comment.createdAt).toString().slice(0,15)}</p>
      <p>{new Date(comment.createdAt).toString().slice(16,24)}</p>
        <div className="flex items-center justify-center space-x-2">
          <p><MdDelete/></p>
        </div>
      </div>
    </div>
    <p className=" text-gray-600 px-4 mt-2">{comment.comment}</p>
  </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment
