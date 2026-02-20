import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import { Signup } from "./components/Signup/Signup";
import { Home } from "./components/Home/Home";
import { Menu } from "./components/Menu/Menu";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRoute from "./components/RoleBasedRote";
import Unauthorized from "./pages/Unauthorized";
import AdminPanel from "./components/AdminPanel";
import Header from "./components/Header/Header";
import Registration from "./components/Users/Registration";
import CategoriesList from "./components/CategoriesList/CategoriesList";
import ProductOrder from "./components/ProductOrder/ProductOrder";
import ProductCart from "./components/ProductCart/ProductCart";
import ProductConfirmation from "./components/ProductConfirmation/ProductConfirmation";
import ProductDelivery from "./components/ProductDelivery/ProductDelivery";

import { CateringListTypes } from "./components/CateringListTypes/CateringListTypes";

/* Admin routes */
import { ADashboard } from "./Admin/Dashboard/Dashboard";
import { ACategories } from "./Admin/Categories/Categories";
import { ACategoriesList } from "./Admin/CategoriesList/CategoriesList";
import { ACategoriesListItems } from "./Admin/CategoriesListItems/CategoriesListItems";
import { ABookingHistory } from "./Admin/BookingHistory/BookingHistory";
import { ContactInformation } from "./components/ContactInformation/ContactInformation";
import { TermsOfService } from "./components/TermsOfService/TermsOfService";
import { PrivacyPolicy } from "./components/PrivacyPolicy/PrivacyPolicy";
import { EventInformations } from "./components/EventInformations/EventInformations";
import { CateringList } from "./components/CateringList/CateringList";
import { ACateringListItemsTypes } from "./Admin/CateringListItemsTypes/CateringListItemsTypes";
import { AFoodMenu } from "./Admin/FoodMenu/FoodMenu";
import { AdminHeader } from "./Admin/Header/Header";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<>
          <Header />
          <Home />
        </>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/home"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <Header />
              <Menu />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/categorieslist/:categoryListId"
          element={
            <>
              <Header />
              <Menu />
              <CategoriesList />
            </>
          }
        />
        <Route
          path="/cateringlist/:categoryListId"
          element={
            <>
              <Header />
              <Menu />
              <CateringList />
            </>
          }
        />
        <Route
          path="/cateringlisttypes/:cateringListItemId"
          element={
            <>
              <Header />
              <Menu />
              <CateringListTypes />
            </>
          }
        />
        <Route
          path="/productorder/:categoryListItemId"
          element={
            <>
              <Header />
              <Menu />
              <ProductOrder />
            </>
          }
        />
        <Route
          path="/eventinformations/:eventType/:categoryCateringId"
          element={
            <>
              <Header />
              <Menu />
              <EventInformations />
            </>
          }
        />
        <Route
          path="/product-confirmation"
          element={
            <>
              <Header />
              <Menu />
              <ProductConfirmation />
            </>
          }
        />
        <Route
          path="/delivery"
          element={
            <ProtectedRoute>
              <Header />
              <Menu />
              <ProductDelivery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Header />
              <ProductCart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registration"
          element={
            <ProtectedRoute>
              <Header />
              <Registration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact-information"
          element={
            <>
              <Header />
              <Menu />
              <ContactInformation />
            </>
          }
        />
        <Route
          path="/terms-of-service"
          element={
            <>
              <Header />
              <Menu />
              <TermsOfService />
            </>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <>
              <Header />
              <Menu />
              <PrivacyPolicy />
            </>
          }
        />
        <Route
          path="/admin"
          element={
            <RoleBasedRoute role="admin">
              <AdminPanel />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <>
              <ADashboard />
            </>
          }
        />
        <Route
          path="/admin/bookinghistory"
          element={
            <>
              <AdminHeader />
              <ABookingHistory />
            </>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <>
              <AdminHeader />
              <ACategories />
            </>
          }
        />
        <Route
          path="/admin/categorieslist"
          element={
            <>
              <AdminHeader />
              <ACategoriesList />
            </>
          }
        />
        <Route
          path="/admin/categorieslistitems"
          element={
            <>
              <AdminHeader />
              <ACategoriesListItems />
            </>
          }
        />
        <Route
          path="/admin/cateringlistitemstypes"
          element={
            <>
              <AdminHeader />
              <ACateringListItemsTypes />
            </>
          }
        />
        <Route
          path="/admin/foodmenu"
          element={
            <>
              <AdminHeader />
              <AFoodMenu />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;