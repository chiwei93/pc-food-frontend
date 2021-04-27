import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  fetchInitialData,
  onCategoryBtnClick,
  onSearchInputChange,
} from '../actions/homePageActions';
import BtnViewMore from '../components/BtnViewMore';
import SearchInput from '../components/SearchInput';
import OrangeBtn from '../components/OrangeBtn';
import PageContainer from '../containers/PageContainer';
import CategoriesBtn from '../components/CategoriesBtn';
import ChefCard from '../components/ChefCard';
import ChefCardLoader from '../components/ChefCardLoader';
import PageLoader from '../components/PageLoader';
import hero from '../images/hero.png';
import classes from './HomePage.module.css';
import sliderData from '../utils/testdata/sliderData';

const HomePage = () => {
  const homePage = useSelector(state => state.homePage);
  const ui = useSelector(state => state.ui);
  const dispatch = useDispatch();

  const history = useHistory();

  //fetch the recommended chefs' data when the page first render
  useEffect(() => {
    dispatch(fetchInitialData());
  }, []);

  //handle search on the search bar
  const onSearchFormSubmit = e => {
    e.preventDefault();

    history.push(`/search/${homePage.searchTerm}`);
    dispatch(onSearchInputChange(''));
  };

  //render the loader when the page is loading
  if (ui.isPageLoading) {
    return <PageLoader />;
  }

  return (
    <PageContainer>
      <section className={classes.hero}>
        <img src={hero} alt="hero" className={classes.heroImage} />
        <div>
          <h1 className={classes.heading}>
            Let the professionals do the work for you
          </h1>
          <OrangeBtn path="/aboutus" text="Learn More" />
        </div>
      </section>

      <section className={classes.categories}>
        <div className={classes.header}>
          <h2 className={classes.categoriesHeading}>Categories</h2>
          <BtnViewMore path="/categories" />
        </div>

        <form className={classes.searchForm} onSubmit={onSearchFormSubmit}>
          <SearchInput
            value={homePage.searchTerm}
            onChange={onSearchInputChange}
          />
        </form>

        <div className={classes.cardContainer}>
          {sliderData.map((data, index) => (
            <CategoriesBtn
              key={index}
              {...data}
              activeCategory={homePage.activeCategory}
              onClick={() => dispatch(onCategoryBtnClick(data.category))}
            />
          ))}
        </div>
      </section>

      <section className={classes.contentSection}>
        <h2 className={classes.contentHeading}>{homePage.activeCategory}</h2>

        {homePage.isCardsLoading ? <ChefCardLoader /> : ''}

        {homePage.isCardsLoading ? (
          ''
        ) : (
          <ul className={classes.chefCardContainer}>
            {homePage.chefCards.map(chef => (
              <ChefCard {...chef} key={chef._id} />
            ))}
          </ul>
        )}

        {homePage.chefCards.length === 0 && !homePage.isCardsLoading ? (
          <p className={classes.noResults}>No results found</p>
        ) : (
          ''
        )}
      </section>
    </PageContainer>
  );
};

export default HomePage;
