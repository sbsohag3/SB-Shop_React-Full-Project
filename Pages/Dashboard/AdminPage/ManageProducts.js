import React from "react";
import useProducts from "../../../hooks/useProducts";

const ManageProducts = () => {
  const [products, setProducts] = useProducts();

  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      const url = `https://pure-spire-28994.herokuapp.com/product/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const remaining = products.filter((product) => product._id !== id);
          setProducts(remaining);
        });
    }
  };
  return (
    <div className="my-12 mx-5">
      <h3 className="text-info text-center text-xl mb-4">
        Manage Product: {products.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra lg:w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Stock</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={p._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-16 rounded">
                      <img src={p.img} alt="" />
                    </div>
                  </div>
                </td>

                <td>{p.name}</td>
                <td>{p.brand}</td>
                <td>{p.stock}</td>
                <td>
                  <button className="btn btn-xs btn-info mx-2">Edit</button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="btn btn-xs btn-error"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
