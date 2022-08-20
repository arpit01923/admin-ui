import axios from "axios";
import { useEffect, useState } from "react";
import { List } from "../../components/list/list";
import { Pagination } from "../../components/pagination/pagination";
import "./home.css";

export const Home = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const userPerPage = 10;

  // users per page
  let indexofLastUser = currentPage * userPerPage;
  let indexofFirstUser = indexofLastUser - userPerPage;
  let currentUser = userData.slice(indexofFirstUser, indexofLastUser);

  console.log(indexofFirstUser, indexofLastUser);
  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const userData = response.data;
      setUserData(userData);
    })();
  }, []);

  return (
    <section>
      <input
        type="text"
        placeholder="Search by name, email or role"
        className="searchbar"
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
        <List userData={currentUser} setUserData={setUserData} />
      </ul>

      <footer className="footer">
        <button>Delete selected</button>
        <Pagination
          userPerPage={userPerPage}
          totalUser={userData.length}
          paginate={paginate}
        />
      </footer>
    </section>
  );
};
