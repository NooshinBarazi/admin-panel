import { httpInterseptedService } from "../core/http-service";
import { CourseList } from "../features/courses/components/course-list";

const Courses = () => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex align-items-center justify-content-between mb-5">
          <h3 className="mb-0">همه دوره ها</h3>
          <a href="#" class="btn btn-primary fw-bolder  mt-n1">
            <i class="fas fa-plus ms-2"></i>افزودن دوره جدید
          </a>
        </div>
        <CourseList />
      </div>
    </div>
  );
};

export async function coursesLoder() {
  const respose = await httpInterseptedService.get("/Course/list");
  console.log(respose.data);
  return respose.data;
}

export default Courses;
