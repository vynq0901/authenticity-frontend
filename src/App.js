import { Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUserByToken } from './redux/actions/authActions'
import authApi from './api/authApi'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//components
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import ProductDetail from './pages/ProductDetail'
import SellPage from './pages/SellPage'
import BuyPage from './pages/BuyPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './routes/ProtectedRoute'
import UserPage from './pages/UserPage'
import SearchPage from './pages/SearchPage'
import AdminPage from './pages/AdminPage'
import NotFound from './pages/NotFound'

const App = () => {
  const dispatch = useDispatch()
  const getUser = async () => {
    //call api
    const response = await authApi.getUserByToken()
    //dispatch action
    if (Object.keys(response.user).length !== 0) {
      dispatch(getUserByToken(response.user))
    }
  }
  getUser()

  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Switch>
        <Route path="/products" component={CategoryPage} />
        <ProtectedRoute path="/account" component={UserPage} />
        <ProtectedRoute exact path="/sell/:slug" component={SellPage} />
        <ProtectedRoute exact path="/buy/:slug" component={BuyPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/admin" component={AdminPage} />
        <Route exact path="/:slug" component={ProductDetail} />
      </Switch>
      <ToastContainer autoClose={2000} hideProgressBar={true} />
    </div>
  )
}

export default App
