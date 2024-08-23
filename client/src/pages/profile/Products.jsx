import { Link } from "react-router-dom";
import moment from "moment";
import { deleteProduct } from "../../apicalls/product";
import { message } from "antd";

const Products = ({
  products,
  setActiveTabKey,
  setEditMode,
  setEditProductId,
  getProducts,
}) => {
  const editHandler = (product_id) => {
    setActiveTabKey("2");
    setEditMode(true);
    setEditProductId(product_id);
  };

  const deleteHandler = async (product_id) => {
    const resposne = await deleteProduct(product_id);
    try {
      if (resposne.isSuccess) {
        message.success(resposne.message);
        getProducts();
      } else {
        throw new Error(resposne.message);
      }
    } catch (error) {
      message.error(error);
    }
  };
  return (
    <section>
      <h1 className="text-3xl font-semibold mb-3">Product List</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>

              <th scope="col" className="px-6 py-3">
                Sell Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {products.length > 0 ? (
              <>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6  text-left py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {product.name}
                    </th>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">
                      {moment(product.createdAt).format("D MMM YYYY")}
                    </td>
                    <td className="px-6 py-4">
                      {product.status === "pending" ? (
                        <span className="bg-yellow-500 text-xs text-white rounded-md p-1">
                          pending
                        </span>
                      ) : (
                        <span className="bg-green-500 text-xs text-white rounded-md p-1">
                          {product.status}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => editHandler(product._id)}
                      >
                        <Link className="font-medium text-blue-600 me-4 hover:underline">
                          Edit
                        </Link>
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <Link className="font-medium text-red-600  hover:underline hover:text-red-400">
                          Delete
                        </Link>
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <p>NO PRODUCTS</p>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Products;
