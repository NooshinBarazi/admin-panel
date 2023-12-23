import { Await, defer, useLoaderData, useNavigate } from "react-router-dom";
import { httpInterseptedService } from "../core/http-service";
import CategoryList from "../features/categories/components/category-list";
import { Suspense, useState } from "react";
import Modal from "../components/modal";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import AddCategory from "../features/categories/components/add-category";
import { useCategoryContext } from "../features/categories/category-context";

const CourseCategories = () => {
  const data = useLoaderData();
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [showAddCategory, setShowAddCategory] = useState(false);

  const navigate = useNavigate();
  const {category} = useCategoryContext();

  const {t} = useTranslation()

  const deleteCategoty = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowModalDelete(true);
  };

  const handleDeleteCategory = async () => {
    setShowModalDelete(false);
    const response = httpInterseptedService.delete(
      `/CourseCategory/${selectedCategory}`
    );

    toast.promise(
      response,
      {
        pending: "در حال حذف...",
        success: {
          render() {
            const url = new URL(window.location.href);
            navigate(url.pathname + url.search);
            return 'عملیات با موفقیت انجام شد'
          },
        },
        error: {
          render({data}){
            return t('categoryList.' + data.respnse.data.code)
          }
        }
      },
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-between mb-5">
            <h3 className="mb-0">همه دسته ها</h3>
            <a class="btn btn-primary fw-bolder  mt-n1" onClick={()=> setShowAddCategory(true)}>
              <i class="fas fa-plus ms-2"></i>افزودن دسته جدید
            </a>
          </div>
          {(showAddCategory || category) && <AddCategory setShowAddCategory={setShowAddCategory}/>}
          <Suspense
            fallback={<p className="text-info"> در حال دریافت اطلاعات ...</p>}
          >
            <Await resolve={data.categories}>
              {(loadedCategories) => (
                <CategoryList
                  categories={loadedCategories}
                  deleteCategoty={deleteCategoty}
                />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
      <Modal
        isOpen={showModalDelete}
        setShowModalDelete={setShowModalDelete}
        title="حذف"
        body="آیا از حذف این آیتم مطمئن هستید؟"
      >
        <button
          className="btn btn-secondary fw-bolder"
          onClick={() => setShowModalDelete(false)}
        >
          انصراف
        </button>
        <button
          className="btn btn-primary fw-bolder"
          onClick={handleDeleteCategory}
        >
          حذف
        </button>
      </Modal>
    </>
  );
};

export async function categoriesLoader({ request }) {
  return defer({ categories: loadCategories(request) });
}

const loadCategories = async (request) => {
  const page = new URL(request.url).searchParams.get("page") || 1;
  const pageSize = import.meta.env.VITE_PAGE_SIZE;
  let url = "/CourseCategory/sieve";
  url += `?page=${page}&pageSize=${pageSize}`;
  const respnse = await httpInterseptedService.get(url);
  return respnse.data;
};

export default CourseCategories;
