import { useState } from "react";
import { toast } from "react-toastify";

const MakeAdminRow = ({ user, index, refetch }) => {
  const { email, role } = user;
  const [users, setUsers] = useState([]);
  const makeAdmin = () => {
    fetch(`https://pure-spire-28994.herokuapp.com/user/admin/${email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("Failed to Make an admin", {
            position: "top-center",
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast.success(`Successfully made an admin`, {
            position: "top-center",
          });
        }
      });
  };

  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      const url = `https://pure-spire-28994.herokuapp.com/user/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const remaining = users.filter((product) => users._id !== id);
          setUsers(remaining);
        });
    }
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td>{email}</td>
      <td>
        {role !== "admin" && (
          <button onClick={makeAdmin} className="btn btn-xs">
            Make Admin
          </button>
        )}
        {role === "admin" && <span className="text-success">Admin</span>}
      </td>
      <td>
        <button
          onClick={() => handleDelete(user._id)}
          className="btn btn-xs btn-error"
        >
          Remove User
        </button>
      </td>
    </tr>
  );
};

export default MakeAdminRow;
