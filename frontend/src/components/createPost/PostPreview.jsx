import Comment from "../../svg/comment";
import Like from "../../svg/like";
import Share from "../../svg/share";

const PostPreview = ({ pageName, timestamp, content }) => {
  return (
    <div className="p-6">
      <div className="text-center mb-4 bg-neutral-800 rounded-md p-2 text-white">
        Platform
      </div>
      <div>
        <div className="bg-white rounded-md mb-4 m-16 p-2">
          <div className="flex items-center px-4 py-2">
            <div className="mr-2">
              <img
                src="https://picsum.photos/seed/picsum/200/200"
                alt="Profile picture"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div>
              <h5 className="text-sm font-medium">{pageName}</h5>
              <p className="text-xs text-gray-500">Just Now</p>
            </div>
          </div>
          <div className="px-4 py-3">
            <p className="text-gray-700">
              {content ? content : "Your content will appear here"}
            </p>
          </div>
          <div className="flex justify-between px-12 py-2 border-t border-gray-200 text-sm font-medium">
            <div className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 gap-1">
              <Like />
              Like
            </div>
            <div className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 gap-1">
              <Comment />
              Comment
            </div>
            <div className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 gap-1">
              <Share />
              Share
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPreview;
