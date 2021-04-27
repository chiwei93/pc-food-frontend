import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import ChefDetailPage from '../pages/ChefDetailPage';
import ChefReviewsPage from '../pages/ChefReviewsPage';
import ProposalPage from '../pages/ProposalPage';
import ProposalsPage from '../pages/ProposalsPage';
import ProposalDetailsPage from '../pages/ProposalDetailsPage';
import UpdateChefDetailsPage from '../pages/UpdateChefDetailsPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import AccountPage from '../pages/AccountPage';
import SingleChatPage from '../pages/SingleChatPage';
import ChatsPage from '../pages/ChatsPage';
import OrderHistoryPage from '../pages/OrderHistoryPage';
import CategoriesPage from '../pages/CategoriesPage';
import SignUpCategoriesPage from '../pages/SignUpCategoriesPage';
import CancelProposalPage from '../pages/CancelProposalPage';
import ConfirmProposalPage from '../pages/ConfirmProposalPage';
import ReviewFormPage from '../pages/ReviewFormPage';
import CompleteProposalPage from '../pages/CompleteProposalPage';
import RejectProposalPage from '../pages/RejectProposalPage';
import PaymentProposalPage from '../pages/PaymentProposalPage';
import ErrorPage from '../pages/ErrorPage';
import Navbar from './Navbar';
import Header from './Header';
import SideBar from './SideBar';
import UploadModal from './UploadModal';
import AboutUsPage from '../pages/AboutUsPage';
import SupportPage from '../pages/SupportPage';
import FAQPage from '../pages/FAQPage';
import classes from './App.module.css';
import TestPage from '../pages/TestPage';

function App() {
  return (
    <div className={classes.pageContainer}>
      <div className={classes.contentContainer}>
        <ToastContainer />
        <Navbar />
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" exact component={SignupPage} />
          <Route
            path="/signup/categories/:chefId"
            component={SignUpCategoriesPage}
          />
          <Route path="/me" component={AccountPage} />
          <Route path="/search/:term" component={SearchPage} />
          <Route
            path="/chefs/update/:chefId"
            component={UpdateChefDetailsPage}
          />
          <Route path="/chefs/:chefId/proposal" component={ProposalPage} />
          <Route path="/chefs/:chefId/reviews" component={ChefReviewsPage} />
          <Route path="/chefs/:id" component={ChefDetailPage} />
          <Route
            path="/proposals/cancel/:proposalId"
            component={CancelProposalPage}
          />
          <Route
            path="/proposals/confirm/:proposalId"
            component={ConfirmProposalPage}
          />
          <Route
            path="/proposals/complete/:proposalId"
            component={CompleteProposalPage}
          />
          <Route
            path="/proposals/reject/:proposalId"
            component={RejectProposalPage}
          />
          <Route
            path="/proposals/payment/:proposalId"
            component={PaymentProposalPage}
          />
          <Route
            path="/proposals/:proposalId"
            component={ProposalDetailsPage}
          />
          <Route path="/proposals" component={ProposalsPage} />
          <Route path="/chats/:receiverEmail" component={SingleChatPage} />
          <Route path="/chats" component={ChatsPage} />
          <Route path="/review/new/:chefId" component={ReviewFormPage} />
          <Route path="/orders" component={OrderHistoryPage} />
          <Route path="/categories" component={CategoriesPage} />
          <Route path="/upload/:id" component={UploadModal} />
          <Route path="/error" component={ErrorPage} />
          <Route path="/aboutus" component={AboutUsPage} />
          <Route path="/support" component={SupportPage} />
          <Route path="/faq" component={FAQPage} />
          <Route path="/test" component={TestPage} />
        </Switch>
      </div>
      <div className={classes.sidebarContainer}>
        <SideBar />
      </div>
    </div>
  );
}

export default App;
