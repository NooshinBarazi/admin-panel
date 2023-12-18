import { Await, defer, useLoaderData } from "react-router-dom";
import { httpInterseptedService } from "../core/http-service";
import CategoryList from "../features/categories/components/category-list";
import { Suspense, useState } from "react";
import Modal from "../components/modal";

const CourseCategories = () => {
  const data = useLoaderData();
  const [showModalDelete, setShowModalDelete] = useState(false)
  return (
    <>
    <div className="row">
      <div className="col-12">
      <div className="d-flex align-items-center justify-content-between mb-5">
          <h3 className="mb-0">همه دسته ها</h3>
          <a href="#" class="btn btn-primary fw-bolder  mt-n1">
            <i class="fas fa-plus ms-2"></i>افزودن دوره جدید
          </a>
        </div>
        <Suspense fallback = {<p className="text-info"> در حال دریافت اطلاعات ...</p>}>
          <Await resolve={data.categories}>
            {(loadedCategories) => <CategoryList categories={loadedCategories} setShowModalDelete={setShowModalDelete} />}
          </Await>
        </Suspense>
      </div>
    </div>
    <Modal isOpen={showModalDelete} setShowModalDelete={setShowModalDelete} title='حذف' body='آیا از حذف این آیتم مطمئن هستید؟'>
      <button className="btn btn-secondary fw-bolder" onClick={()=> setShowModalDelete(false)}>انصراف</button>
      <button className="btn btn-primary fw-bolder">حذف</button>
    </Modal>
    </>
  );
};

export async function categoriesLoader({request}) {
  return defer({ categories: loadCategories(request) });
}

const loadCategories = async (request) => {
  const page = new URL(request.url).searchParams.get('page') || 1;
  const pageSize = import.meta.env.VITE_PAGE_SIZE;
  let url = '/CourseCategory/sieve';
  url+= `?page=${page}&pageSize=${pageSize}`;
  const respnse = await httpInterseptedService.get(url);
  return respnse.data;
};

export default CourseCategories;
