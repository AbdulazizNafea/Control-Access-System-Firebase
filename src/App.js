
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/Siginin';
import Home from './pages/Home'
import { AuthProvider } from './authContext'
import NewPrivateRoute from "./NewPrivateRoute"
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddUser from './pages/AddUser';
import Logout from "./pages/Logout"
import NewAddUser from "./pages/NewAddUser"
import NewAddLM from './pages/NewAddLM';
import Request from './pages/Request';
import Home2 from './pages/Home2';
import History from './pages/History';
import ResReq from './pages/ResReq';
import ActionControl from './pages/ActionControl';
import VacationReq from './pages/VacationReq';
import VacContrill from './pages/VacContrill';
import TestAdd from './pages/TestAdd';




function App() {
	//const auth = useAuth();
	return (
		<div className="App">
			<BrowserRouter>
				<ToastContainer position="top-center" />
				<AuthProvider>
					<Routes>
						{/* ----------------------Private Route---------------------------- */}
						<Route path="/" element={<NewPrivateRoute />}>
							<Route path="/" element={<Home />} />
							<Route path="/2" element={<Home2 />} />
							<Route path="/his" element={<History />} />
							<Route path="/res" element={<ResReq />} />
							<Route path="/req" element={<Request />} />
							<Route path="/vac" element={<VacationReq />} />
							<Route path="/VacContrill/:id" element={<VacContrill />} />
							<Route path="/ActionControl/:id" element={<ActionControl />} />
						</Route>

						{/* ------------------------Public Route--------------------------- */}

						<Route exact path='/signin' element={<SignIn />} />
						<Route path='/add' element={<AddUser />} />

						{/* this main page هذي الصح */}
						<Route path='/addLM' element={<NewAddLM />} /> 

						<Route path='/logout' element={<Logout />} />

						{/* اقرطها */}
						<Route path='/step2' element={<TestAdd />} />

						<Route path='/register' element={<Register />} />
						<Route path='*' element={<PageNotFound />} />
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</div>
	);
}
export default App;
