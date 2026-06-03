import { Route, Routes, useLocation } from "react-router-dom"
import { useEffect } from "react"
import MainPage from "./page/MainPage"
import Event from "./page/Event"
import VocalTraningClass from "./page/VocalTraningClass"
import VocalRecodingApoiment from "./page/VocalRecodingApoiment"
import PaymentForm from "./components/PaymentForm"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import AuthModal from "./components/AuthModal"
import AdminDashbord from "./page/admin/AdminDashbord"
import ForgotPassword from "./page/ForgotPassword"
import ResetPassword from "./page/ResetPassword"

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {

  const stripePromise = loadStripe("pk_test_51Rggo6Roz0LOc700RANEAyRURujKjvBDb9yZ4YDatZStwoe6ikZwueNF4mTMWojwB2bnOA1JiOqQzfGK3yMJanq700MdnQxraM");



    return (
      <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage />} /> 
        <Route path="/admin" element={<AdminDashbord />} /> 
        <Route path="/auth" element={<AuthModal />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        <Route path="/events" element={<Event />} />
        <Route path="/vocal-traning-class" element={<VocalTraningClass />} >
      
        </Route>
        <Route path="/vocal-recoding-apoiment" element={<VocalRecodingApoiment />} />
        <Route path="/payment-form-reg" element={
          <Elements stripe={stripePromise}>
          <PaymentForm navigateTo="/vocal-traning-class" backTo="Vocal Training Class" payment="REGISTRATION"/>
        </Elements>
        } />
        <Route path="/payment-form-full" element={
          <Elements stripe={stripePromise}>
          <PaymentForm navigateTo="/vocal-traning-class" backTo="Vocal Training Class" payment="FULL"/>
        </Elements>
        } />
        <Route path="/payment-form-inst" element={
          <Elements stripe={stripePromise}>
          <PaymentForm navigateTo="/vocal-traning-class" backTo="Vocal Training Class" payment="INSTALLMENT"/>
        </Elements>
        } />
      </Routes>
      </>
    )
}

export default App
