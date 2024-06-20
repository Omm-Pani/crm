import axios from "axios";
import Emoji from "../../svg/emoji";
import Photo from "../../svg/photo";
import Button from "../../ui/Button";
import InputBox from "../../ui/InputBox";
import { useEffect, useRef, useState } from "react";
import DropDown from "./DropDown";
import Small_exit_icon from "../../svg/small_exit_icon";

export default function PostCreator({ daySelected }) {
  const [pageList, setPageList] = useState([""]);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  // const [pagesSelected, setPagesSelected] = useState({
  //   pages: [],
  //   response: [],
  // });
  const [pagesSelected, setPagesSelected] = useState([]);
  const [content, setContent] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [title, setTitle] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState([]);
  const imageInputRef = useRef(null);
  useEffect(() => {
    const campaigns = axios
      .get("http://localhost:5000/get-campaigns", {
        withCredentials: true, // This ensures cookies are sent
      })
      .then((response) => {
        setCampaigns(response.data.map((campaign) => campaign.name));
      });
  }, []);
  useEffect(() => {
    const pages = axios
      .get("http://localhost:5000/list-pages", {
        withCredentials: true, // This ensures cookies are sent
      })
      .then((response) => {
        setPageList(response.data.map((page) => page.name));
      });
  }, []);

  const handlePost = async () => {
    const response = await axios
      .post("http://localhost:5000/create-post", {
        page_names: pagesSelected.response,
        message: content,
        img_urls: imageUrls,
      })
      .catch((err) => console.log(err));
    console.log(response.data);
  };

  const handleFileInputChange = async (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles.length === 0) {
      return;
    }

    try {
      // Prepare file data for pre-signed URL request
      const filesData = Array.from(selectedFiles).map((file) => ({
        fileName: file.name,
        fileType: file.type,
      }));

      // Get pre-signed URLs from the backend
      const response = await axios.post("http://localhost:5000/s3Urls", {
        files: filesData,
      });

      const { urls } = response.data;

      // Upload files to S3 using the pre-signed URLs
      const uploadPromises = urls.map(async (urlObj, index) => {
        return axios
          .put(urlObj.url, selectedFiles[index], {
            headers: {
              "Content-Type": selectedFiles[index].type,
            },
          })
          .then(() => urlObj.key);
      });

      const uploadedKeys = await Promise.all(uploadPromises);

      // Construct the final URLs of the uploaded images
      const newImageUrls = uploadedKeys.map(
        (key) => `https://intrend-images.s3.ap-south-1.amazonaws.com/${key}`
      );

      setImageUrls((prevImageUrls) => [...prevImageUrls, ...newImageUrls]);

      alert("Files uploaded successfully");
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files");
    }
  };

  const handleRemoveImage = async (imageUrl) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/delete-s3-images",
        {
          keys: [getImageKey(imageUrl)],
        }
      );
      console.log(response.data.message);
      setImageUrls((prevImageUrls) =>
        prevImageUrls.filter((url) => url !== imageUrl)
      );
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image");
    }
  };

  const getImageKey = (imageUrl) => {
    // Extract the key from the URL (assuming standard S3 URL format)
    return imageUrl.split(".amazonaws.com/")[1];
  };

  return (
    <div className="p-4 relative">
      <InputBox
        onChange={(e) => setTitle(e.target.value)}
        label="Post title"
        placeholder="Post title"
      />
      <InputBox
        onChange={(e) => setPage(e.target.value)}
        onClick={() => {
          setVisible(!visible);
          setPageVisible(false);
        }}
        label="campaign"
        placeholder="Select your campaign"
        value={selectedCampaign}
      />
      {visible && (
        <DropDown
          list={campaigns}
          selected={selectedCampaign}
          setSelected={setSelectedCampaign}
        />
      )}

      <InputBox
        onChange={(e) => setPage(e.target.value)}
        onClick={() => {
          setPageVisible(!pageVisible);
          setVisible(false);
        }}
        label="Account"
        placeholder="Enter your account"
        value={pagesSelected}
      />
      {pageVisible && (
        <DropDown
          list={pageList}
          selected={pagesSelected}
          setSelected={setPagesSelected}
        />
      )}
      <div>
        <label className="block mb-2 text-xs font-normal text-white pt-4 ">
          Content
          <div className="border border-gray-500 text-white  rounded-lg  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 block w-full p-2">
            <textarea
              type="text"
              placeholder="Type your content ..."
              className="h-32 w-full text-sm text-white resize-none border-none bg-transparent focus:outline-none"
              onChange={(e) => {
                setContent(e.target.value);
              }}
              required
            />
            <div>
              <div className="flex gap-2">
                {imageUrls.map((imgUrl, i) => (
                  <div
                    className="relative w-28 h-28 bg-neutral-700 rounded-lg"
                    key={i}
                  >
                    <div
                      className="w-5 h-5 rounded-full bg-gray-500 absolute right-0 top-0"
                      onClick={() => handleRemoveImage(imgUrl)}
                    >
                      <Small_exit_icon />
                    </div>
                    <img
                      className="w-full h-full object-contain rounded-lg"
                      src={imgUrl}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              hidden
              multiple
              onChange={handleFileInputChange}
              ref={imageInputRef}
            />
            <div className="flex gap-6">
              <button
                onClick={() => {
                  imageInputRef.current.click();
                }}
              >
                <Photo color="#77A7FF" />
              </button>
              <button>
                <Emoji />
              </button>
            </div>
          </div>
        </label>
      </div>
      <div className="w-full border rounded-lg  border-gray-500 p-4 mt-4 ">
        <p className="block mb-2 text-sm font-bold text-white">
          Scheduling Options
        </p>
        <div className="flex">
          <Button name={`${daySelected.format("dddd, MMMM DD")}`} />
        </div>
      </div>

      <div className="flex flex-row-reverse w-full">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-4 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handlePost}
        >
          POST
        </button>
      </div>
    </div>
  );
}
