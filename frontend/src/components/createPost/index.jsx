import { useState } from "react";
import PostCreator from "./PostCreator";
import PostPreview from "./PostPreview";
import Small_exit_icon from "../../svg/small_exit_icon";
import axios from "axios";

const CreatePost = ({ setShowEventModal, daySelected }) => {
  const [selectedPages, setSelectedPages] = useState("");
  const [selectedContent, setSelectedContent] = useState("");
  const [selectedImageUrls, setSelectedImageUrls] = useState([]);

  return (
    <div className="grid grid-cols-2 absolute inset-0 z-10 h-screen w-screen overflow-hidden ">
      <div
        className="w-8 h-8 rounded-full bg-gray-500 absolute right-0 top-0 mr-2 mt-2 cursor-pointer"
        onClick={() => setShowEventModal(false)}
      >
        <Small_exit_icon />
      </div>
      <div className="bg-neutral-800 h-screen">
        <PostCreator
          setSelectedContent={setSelectedContent}
          setSelectedPages={setSelectedPages}
          setSelectedImageUrls={setSelectedImageUrls}
          daySelected={daySelected}
        />
      </div>

      <div className="bg-neutral-600 h-screen">
        <PostPreview
          selectedContent={selectedContent}
          selectedPages={selectedPages}
          selectedImageUrls={selectedImageUrls}
        />
      </div>
    </div>
  );
};

export default CreatePost;
