import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import "./list.css";

export const List = ({ userData, deleteHandler, editHandler }) => {
  return (
    <>
      {userData.map((user) => (
        <div key={user.id}>
          <li className="list-item">
            <input type="checkbox" />
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.role}</p>
            <p className="action">
              <AiFillEdit
                className="icon edit"
                onClick={() => editHandler(user.id)}
              />
              <AiFillDelete
                className="icon delete"
                onClick={() => deleteHandler(user.id)}
              />
            </p>
          </li>
          <div className="divider"></div>
        </div>
      ))}
    </>
  );
};
