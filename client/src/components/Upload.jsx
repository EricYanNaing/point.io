import { TrashIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

const Upload = () => {
  const [preivewImages, setPreviewImages] = useState([]);
  const onChangeHandler = (event) => {
    const selectedImages = event.target.files;
    const selectedImagesArray = Array.from(selectedImages);
    const previewImagesArray = selectedImagesArray.map((img) => {
      return URL.createObjectURL(img);
    });
    setPreviewImages((prev) => prev.concat(previewImagesArray));
  };
  const deleteHandler = (img) => {
    setPreviewImages(preivewImages.filter((element) => element !== img));
    URL.revokeObjectURL(img);
  };
  return (
    <section>
      <h1 className="text-2xl font-bold mb-3">
        Upload your product's images here.
      </h1>
      <form method="post" encType="multipart/form-data"></form>
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
    </section>
  );
};

export default Upload;
