import axios from "axios";
import { useEffect, useState } from "react";
import { EditModal } from "../../components";
import { List } from "../../components/list/list";
import { Pagination } from "../../components/pagination/pagination";
import "./home.css";

export const Home = () => {
  const [userData, setUserData] = useState([]);
  const [editModal, setEditModal] = useState({
    id: 0,
    name: "",
    email: "",
    role: "",
  });
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const userPerPage = 10;

  // users per page
  let indexofLastUser = currentPage * userPerPage;
  let indexofFirstUser = indexofLastUser - userPerPage;
  let currentUser = searchData.slice(indexofFirstUser, indexofLastUser);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // delete user
  const deleteHandler = (userId) => {
    const filteredData = userData.filter((user) => user.id !== userId);
    setUserData(filteredData);
  };

  // edit user
  const editHandler = (userId) => {
    setShowEditModal(true);
    const user = userData.find((user) => user.id === userId);
    setEditModal({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  // submit edit form
  const submitEditForm = (e) => {
    e.preventDefault();
    const newUserData = userData.map((user) =>
      user.id === editModal.id ? { ...editModal } : user
    );
    setUserData(newUserData);
    setShowEditModal(false);
  };

  // search handler
  const searchHandler = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    const users = userData.filter(
      (item) =>
        item.name.includes(searchValue) ||
        item.email.includes(searchValue) ||
        item.role.includes(searchValue)
    );
    setSearchData(users);
  };

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const userData = response.data;
      setUserData(userData);
      setSearchData(userData);
    })();
  }, []);

  return (
    <section>
      {showEditModal && (
        <EditModal
          submitEditForm={submitEditForm}
          editModal={editModal}
          setEditModal={setEditModal}
        />
      )}

      <input
        type="text"
        placeholder="Search by name, email or role"
        className="searchbar"
        value={search}
        onChange={(e) => searchHandler(e)}
      />
      <header className="header">
        <input type="checkbox" />
        <p>Name</p>
        <p>Email</p>
        <p>Role</p>
        <p>Actions</p>
      </header>
      <div className="divider"></div>

      <ul className="list">
        <List
          userData={currentUser}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
        />
      </ul>

      <footer className="footer">
        <button>Delete selected</button>
        <Pagination
          userPerPage={userPerPage}
          totalUser={searchData.length}
          paginate={paginate}
        />
      </footer>
    </section>
  );
};
