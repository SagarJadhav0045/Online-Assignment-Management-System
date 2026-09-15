import Login from "./Login";
import StudentDashboard from "./StudentDashboard";
import Assignments from "./Assignments";
import MySubmissions from "./MySubmissions";
import FacultyDashboard from "./FacultyDashboard";
import FacultySubmissions from "./FacultySubmissions";
import MyResults from "./MyResults";

function App() {

  const path = window.location.pathname;

  if (path === "/student-dashboard") {
    return <StudentDashboard />;
  }

  if (path === "/faculty-dashboard") {
    return <FacultyDashboard />;
  }

  if (path === "/assignments") {
    return <Assignments />;
  }

  if (path === "/my-submissions") {
    return <MySubmissions />;
  }

  if (path === "/my-results") {
  return <MyResults />;
}

  if (path === "/faculty-submissions") {
    return <FacultySubmissions />;
  }

  return <Login />;
}

export default App;