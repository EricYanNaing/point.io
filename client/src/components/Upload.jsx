import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { uploadImage } from "../apicalls/product";
import { message } from "antd";

const Upload = ({ editProductId, setActiveTabKey }) => {
  const [preivewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);

  const onChangeHandler = (event) => {
    const selectedImages = event.target.files;
    setImages(selectedImages);

    const selectedImagesArray = Array.from(selectedImages);
    const previewImagesArray = selectedImagesArray.map((img) => {
      return URL.createObjectURL(img);
    });

    setPreviewImages((prev) => prev.concat(previewImagesArray));
  };
  const deleteHandler = (img) => {
    const indexToDelete = preivewImages.findIndex((e) => e === img);
    if (indexToDelete !== -1) {
      const updatedSelectedImages = [...images];
      updatedSelectedImages.splice(indexToDelete, 1);

      setImages(updatedSelectedImages);
      setPreviewImages((prevImg) => prevImg.filter((e) => e !== img));

      URL.revokeObjectURL(img);
    }
  };

  const uploadHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      console.log(images);
      formData.append("product_images", images[i]);
    }

    formData.append("product_id", editProductId);

    try {
      const response = await uploadImage(formData);

      if (response.isSuccess) {
        message.success(response.message);
        setActiveTabKey("1");
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  return (
    <section>
      <h1 className="text-2xl font-bold mb-3">
        Upload your product's images here.
      </h1>
      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={uploadHandler}
      >
        <label
          htmlFor="upload"
          className="p-2 font-medium my-4 rounded-md border-2 border-blue-600 border-dashed text-blue-600"
        >
          Upload from device
        </label>
        <input
          type="file"
          hidden
          id="upload"
          name="product_images"
          multiple
          accept="image/png,image/jpeg,image/jpg"
          onChange={onChangeHandler}
        />
        <div className="gap-2 flex mt-4">
          {preivewImages &&
            preivewImages.map((img, index) => (
              <div key={index} className="basis-1/6 h-32 relative">
                <img
                  src={img}
                  alt={index}
                  className="w-full h-full object-cover rounded-md"
                />
                <TrashIcon
                  onClick={() => deleteHandler(img)}
                  width={30}
                  height={30}
                  className="absolute z-20 bottom-2 right-3 text-white cursor-pointer rounded-sm bg-red-500 p-1"
                />
              </div>
            ))}
        </div>
        <button className="block my-4 px-3 text-white bg-blue-600 rounded-md py-2 font-medium">
          Upload to product
        </button>
      </form>
    </section>
  );
};

export default Upload;
