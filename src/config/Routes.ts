import { CloudUpload, Home as HomeIcon, People as StudentsIcon } from "@material-ui/icons";
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