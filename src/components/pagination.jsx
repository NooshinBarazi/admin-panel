import _ from "lodash";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalRecords, pageSize = 10 }) => {
  const page = Math.ceil(totalRecords / pageSize);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = +searchParams.get('page') || 1;

  const prevPage = ()=>{
    if(currentPage > 1){
        setSearchParams({page: currentPage - 1})
    }
  }

  const nextPage = ()=>{
    if(currentPage < page){
        setSearchParams({page: currentPage + 1})
    }
  };

  return (
    <nav>
      <ul className="pagination pagination-lg">
        <li className={`page-item ${currentPage === 1 ? 'disabled opacity-50' : ''}`} onClick={prevPage}>
          <a className="page-link">قبلی</a>
        </li>
        {_.times(page, (index) => (
          <li key={`page${index + 1}`} className={`page-item ${currentPage === index+1? 'active': ''}`} onClick={()=> setSearchParams({page: index+1})}>
            <a className="page-link">{index + 1}</a>
          </li>
        ))}
        <li className={`page-item ${currentPage === page? 'disabled opacity-50': ''}`} onClick={nextPage}>
          <a className="page-link">بعدی</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
