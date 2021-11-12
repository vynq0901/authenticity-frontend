import { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUserByToken } from './redux/actions/authActions'
import authApi from './api/authApi'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Helmet} from 'react-helmet'

//routes
import ProtectedRoute from './routes/ProtectedRoute'
import StaffRoute from './routes/StaffRoute'
import AdminRoute from './routes/AdminRoute'
//pages
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import ProductDetail from './pages/ProductDetail'
import SellPage from './pages/SellPage'
import BuyPage from './pages/BuyPage'
import LoginPage from './pages/LoginPage'
import UserPage from './pages/UserPage'
import SearchPage from './pages/SearchPage'
import AdminPage from './pages/AdminPage'
import StaffPage from './pages/StaffPage'
import StaffLogin from './pages/StaffLogin'
import NewsDetail from './pages/NewsDetail'
import NotFound from './pages/NotFound'
import NewsPage from './pages/NewsPage'
import AdminLogin from './pages/AdminLogin'
import Chat from './components/Chat'
import SupporterPage from './pages/SupporterPage'


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
  useEffect(() => {
    sessionStorage.setItem('viewedProduct', JSON.stringify([]))
  }, [])

  return (
   <>
      <Helmet>
        <title>Authenticity: Sneakers, Streetwear</title>
      </Helmet>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Switch>
          <Route path="/products" component={CategoryPage} />
          <ProtectedRoute path="/account" component={UserPage} />
          <ProtectedRoute exact path="/sell/:slug" component={SellPage} />
          <ProtectedRoute exact path="/buy/:slug" component={BuyPage} />
          <AdminRoute path="/admin" component={AdminPage} />
          <StaffRoute path="/staff" component={StaffPage} />
          <StaffRoute path="/supporter" component={SupporterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path='/staff-login' component={StaffLogin} />
          <Route exact path='/admin-login' component={AdminLogin} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/news" component={NewsPage} />
          <Route exact path="/:slug" component={ProductDetail} />
          <Route exact path="/news/:slug" component={NewsDetail} />
        </Switch>
        <ToastContainer autoClose={2000} hideProgressBar={true} />
      </div>
      {/* <Chat /> */}
   </>
  )
}

export default App
