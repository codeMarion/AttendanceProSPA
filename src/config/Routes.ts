import { CloudUpload, Home as HomeIcon, MenuBook, People as StudentsIcon } from "@material-ui/icons";
import Courses from "../views/Courses";
import Home from "../views/Home";
import Students from "../views/Students";
import Upload from "../views/Upload";


const Routes = [
    {
      title: "Home",
      path: "/",
      component: Home,
      logo: HomeIcon
    },
    {
      title: "Courses",
      path: "/courses",
      component: Courses,
      logo: MenuBook
    },
    {
      title: "Students",
      path: "/students",
      component: Students,
      logo: StudentsIcon
    },
    {
      title: "Upload",
      path: "/upload",
      component: Upload,
      logo: CloudUpload
    }
];
export default Routes;