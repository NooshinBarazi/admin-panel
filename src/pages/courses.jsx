import { Await, defer, useLoaderData } from "react-router-dom";
import { httpInterseptedService } from "../core/http-service";
import { CourseList } from "../features/courses/components/course-list";
import { Suspense } from "react";

const Courses = () => {
  const data = useLoaderData();
  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex align-items-center justify-content-between mb-5">
          <h3 className="mb-0">همه دوره ها</h3>
          <a href="#" class="btn btn-primary fw-bolder  mt-n1">
            <i class="fas fa-plus ms-2"></i>افزودن دوره جدید
          </a>
        </div>
        <Suspense fallback = {<p className="text-info"> در حال دریافت اطلاعات ...</p>}>
          <Await resolve={data.courses}>
            {(lodedCourses) => <CourseList courses={lodedCourses} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export async function coursesLoder() {
  return defer({
    courses: loadCourses(),
  });
}

const loadCourses = async () => {
  const respose = await httpInterseptedService.get("/Course/list");
  return respose.data;
};

export default Courses;
