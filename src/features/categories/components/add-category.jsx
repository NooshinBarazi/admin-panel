import { useForm } from "react-hook-form";
import { httpInterseptedService } from "../../../core/http-service";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import {useNavigate} from 'react-router-dom'
import { useCategoryContext } from "../category-context";
import { useEffect } from "react";

const AddCategory = ({ setShowAddCategory }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const {t} = useTranslation();
  const {category, setCategory} = useCategoryContext();

  useEffect(()=>{
    if(category){
      setValue('name', category.name);
      setValue('id', category.id)
    }
  },[category])

  const onClose = ()=>{
    setShowAddCategory(false)
    setCategory(null);
  }

  const onSubmit = (data) => {
    setShowAddCategory(false);
    const response = httpInterseptedService.post(`/CourseCategory`, data);
    toast.promise(
      response,
      {
        pending: "در حال افزودن...",
        success: {
          render() {
            const url = new URL(window.location.href);
            navigate(url.pathname + url.search);
            if(category){
              setCategory(null)
            }
            return "عملیات با موفقیت انجام شد";
          },
        },
        error: {
          render({ data }) {
            if(data.respnse.status === 400){

                return t("categoryList." + data.respnse.data.code);
            } else{
                return 'خطا در اجرای عملیات'
            }
          },
        },
      },
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
  };

  return (
    <div className="cart">
      <div className="cart-body">
        <form className="m-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="form-lael">نام</label>
            <input
              className={`form-control form-control-lg ${
                errors.name && "isInvalid"
              }`}
              {...register("name", { required: true })}
            />
            {errors.name && errors.name.type === "required" && (
              <p className="text-danger fw-bolder small mt-1">
                نام الزامی است.
              </p>
            )}
          </div>
          <div className="text-start mt-3">
            <button
              type="button"
              className="btn btn-secondary btn-larg ms-2"
              onClick={onClose}
            >
              بستن
            </button>
            <button type="submit" className="btn btn-primary btn-larg ms-2">
              ثبت تغییرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
