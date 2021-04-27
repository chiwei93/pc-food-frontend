import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories, makeProposal } from '../actions/proposalFormActions';
import TextareaAutosize from 'react-textarea-autosize';
import PageContainer from '../containers/PageContainer';
import TextInput from '../components/TextInput';
import RadioBtn from '../components/RadioBtn';
import SubmitBtn from '../components/SubmitBtn';
import PageLoader from '../components/PageLoader';
import classes from './ProposalPage.module.css';
import logo from '../images/chefhat.png';
import proposalQuestion from '../utils/proposalQuestion';

const ProposalPage = props => {
  const { chefId } = props.match.params;

  const history = useHistory();

  const proposalForm = useSelector(state => state.proposalForm);
  const ui = useSelector(state => state.ui);

  const dispatch = useDispatch();

  //fetch the menus of the chef
  useEffect(() => {
    dispatch(fetchCategories(chefId, history));
  }, []);

  //for handling form submit
  const onFormSubmit = formValues => {
    dispatch(makeProposal(formValues, chefId, history));
  };

  //for rendering the question of the proposal needed for booking
  const renderQuestions = () => {
    return proposalQuestion.map((qns, index) => (
      <li className={classes.questionItem} key={index}>
        <h4 className={classes.questionHeading}>{qns.title}</h4>
        <ul className={classes.optionList}>
          {qns.choices.map(choice => {
            return (
              <li className={classes.optionItem} key={choice.id}>
                <Field
                  name={choice.name}
                  label={choice.label}
                  component={RadioBtn}
                  props={{ value: choice.value, id: choice.id }}
                />
              </li>
            );
          })}
        </ul>
      </li>
    ));
  };

  //for rendering the the calendar input
  const renderCalendar = ({ input, meta }) => {
    const error = meta.error && meta.touched ? classes.error : null;

    return (
      <div className={`${classes.dateInputContainer} ${error}`}>
        <input type="date" {...input} className={classes.dateInput} />
      </div>
    );
  };

  //for rendering the text area
  const renderTextArea = ({ input }) => {
    return (
      <TextareaAutosize minRows="5" className={classes.textarea} {...input} />
    );
  };

  //show loader when the page is loading
  if (ui.isPageLoading) {
    return <PageLoader />;
  }

  return (
    <PageContainer>
      <div className={classes.header}>
        <img src={logo} alt="Chef Hat Logo" className={classes.logo} />
        <h2 className={classes.headerHeading}>Your Proposal Form</h2>
      </div>

      <form onSubmit={props.handleSubmit(onFormSubmit)}>
        <ul className={classes.questionList}>
          {renderQuestions()}

          <li className={classes.questionItem}>
            <h4 className={classes.questionHeading}>Menu</h4>
            <ul className={classes.optionList}>
              {proposalForm.categories.map((category, index) => (
                <li className={classes.optionItem} key={index}>
                  <Field
                    name="menu_type"
                    label={category}
                    component={RadioBtn}
                    props={{ value: category, id: `menu_${category}` }}
                  />
                </li>
              ))}
            </ul>
          </li>
        </ul>

        <div className={classes.calendarContainer}>
          <h3 className={classes.calendarHeading}>Proposal Date</h3>
          <Field name="proposed_date" component={renderCalendar} />
        </div>

        <div className={classes.textareaContainer}>
          <h3 className={classes.textareaHeading}>
            Anything else to let the chef know
          </h3>
          <Field name="message" component={renderTextArea} />
        </div>

        <div className={classes.detailsContainer}>
          <h4 className={classes.detailHeading}>
            Please confirm your personal details
          </h4>
          <ul className={classes.inputList}>
            <li className={classes.inputItem}>
              <Field
                name="address"
                component={TextInput}
                inputType="text"
                label="address"
              />
            </li>

            <li className={classes.inputItem}>
              <Field
                name="name"
                component={TextInput}
                inputType="text"
                label="name"
              />
            </li>

            <li className={classes.inputItem}>
              <Field
                name="email"
                component={TextInput}
                inputType="email"
                label="email"
              />
            </li>

            <li className={classes.inputItem}>
              <Field
                name="phone"
                component={TextInput}
                inputType="text"
                label="phone"
              />
            </li>
          </ul>
        </div>

        <div className={classes.btnContainer}>
          <SubmitBtn
            text={proposalForm.isBooking ? 'In Progress...' : 'Send Proposal'}
          />
        </div>
      </form>
    </PageContainer>
  );
};

//validate function for redux form
const validate = formValues => {
  const errors = {};

  if (!formValues.serviceType) {
    errors.serviceType = 'Please select a service type';
  }

  if (!formValues.peopleNumber) {
    errors.peopleNumber = 'Please select the number of people';
  }

  if (!formValues.mealType) {
    errors.mealType = 'Please select a meal type';
  }

  if (!formValues.hobType) {
    errors.hobType = 'Please select a meal type';
  }

  if (!formValues.hobNumber) {
    errors.hobNumber = 'Please select the number of hob';
  }

  if (!formValues.oven) {
    errors.oven = 'Please select an answer';
  }

  if (!formValues.price) {
    errors.price = 'Please select a price';
  }

  if (!formValues.diet) {
    errors.diet = 'Please provide an answer';
  }

  if (!formValues.menuType) {
    errors.menuType = 'Please select a menu';
  }

  if (!formValues.proposalDate) {
    errors.proposalDate = 'Please select a date for the proposal';
  }

  if (!formValues.address) {
    errors.address = 'Please provide an address';
  }

  if (!formValues.name) {
    errors.name = 'Please provide your name';
  }

  if (
    !formValues.email ||
    !formValues.email.includes('@') ||
    !formValues.email.includes('.')
  ) {
    errors.email = 'Please provide your email';
  }

  if (!formValues.phone) {
    errors.phone = 'Please provide your phone';
  }

  return errors;
};

export default reduxForm({
  form: 'proposalSentForm',
  validate,
})(ProposalPage);
