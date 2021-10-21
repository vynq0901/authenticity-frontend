import React, {useEffect, useState} from 'react'
import { Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
//components
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TabContainer from '../components/TabContainer'
import UserInfo from '../components/UserInfo'
import BuyingInfo from '../components/BuyingInfo'
import SellingInfo from '../components/SellingInfo'
import Following from '../components/Following'

const UserPage = () => {
    const currentUser = useSelector(state => state.userLogin?.userInfo)
    const [user, setUser] = useState({})
    useEffect(() => {
        if (currentUser) {
            setUser(currentUser)
        }
    }, [currentUser])
    return (
        <>
            <Navbar />
            <div className="flex mt-16">
                <TabContainer className="w-[20%]" user={user} />
                <Switch>
                    <Route exact path="/account/info">
                        <UserInfo user={user} />
                    </Route>
                    <Route exact path="/account/buying">
                        <BuyingInfo user={user} />
                    </Route>
                    <Route exact path="/account/selling">
                        <SellingInfo user={user} />
                    </Route>
                    <Route exact path="/account/following">
                        <Following user={user} />
                    </Route>
                </Switch>
            </div>
            <Footer />
        </>
    )
}

export default UserPage
