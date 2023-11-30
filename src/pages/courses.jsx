import { httpInterseptedService } from "../core/http-service";

const Courses = () => {
    return ( 
       
        <h1>courses</h1>
     );
};

export async function coursesLoder(){
    const respose = await httpInterseptedService.get('/Course/list');
    console.log(respose.data)
    return respose.data;
}
 
export default Courses;