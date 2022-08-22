import "./pagination.css";

export const Pagination = ({ userPerPage, totalUser, paginate }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalUser / userPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <section className="pagination">
      <ul className="list">
        {pageNumber.map((page) => (
          <li key={page} className="list-item">
            <button onClick={()=>paginate(page)}>{page}</button>
          </li>
        ))}
      </ul>
    </section>
  );
};
