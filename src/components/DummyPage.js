import React from 'react';
import PageContainer from '../containers/PageContainer';
import classes from './DummyPage.module.css';

const DummyPage = ({ title }) => {
  return (
    <PageContainer>
      <h2 className={classes.heading}>{title}</h2>

      <ul className={classes.list}>
        <li className={classes.item}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          sagittis ornare efficitur. Nullam feugiat, tortor sit amet dapibus
          tempus, dui risus ullamcorper velit, eu faucibus magna purus pretium
          dolor. Nulla vel viverra neque. Curabitur fermentum nunc et magna
          gravida, vel ornare nunc congue. Suspendisse vel erat tortor.
          Phasellus sit amet congue elit. Mauris nulla odio, pulvinar iaculis
          laoreet et, efficitur eget sem. Cras pulvinar gravida turpis eget
          dignissim. Etiam at leo et orci pulvinar molestie. Interdum et
          malesuada fames ac ante ipsum primis in faucibus. Nam ullamcorper
          egestas arcu, in euismod ex tempor sit amet. Suspendisse in lobortis
          nunc, non condimentum neque. Phasellus vulputate gravida magna, id
          luctus dui pharetra ut. Nunc efficitur ligula sed est maximus feugiat.
          In vel nisl a augue congue posuere. Quisque quam augue, cursus sed sem
          pharetra, lacinia blandit arcu.
        </li>

        <li className={classes.item}>
          Cras sit amet velit accumsan, semper tellus sed, tincidunt lorem.
          Fusce sed ex in urna rhoncus euismod vel et neque. Integer malesuada
          ex urna, a porttitor erat consequat sed. In commodo lorem vitae congue
          consequat. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Sed blandit magna sem, non aliquam
          ipsum dictum in. Nunc non pretium turpis. Praesent hendrerit, lorem
          eget aliquet pretium, massa odio auctor neque, consequat gravida ex
          eros eget mi. Praesent consectetur diam lectus, eu commodo sem
          imperdiet ac. Vestibulum vitae luctus sapien, finibus tincidunt orci.
          Mauris a metus ac massa pellentesque porttitor vel sed nulla. Sed ac
          erat dui. Aliquam erat volutpat. Phasellus id eros porta orci bibendum
          laoreet sed vel purus. Ut nec porta leo. Sed convallis dapibus libero,
          eu commodo orci maximus vel.
        </li>

        <li className={classes.item}>
          Sed at leo semper nunc porta aliquam nec at nibh. Duis placerat enim
          arcu, at pulvinar sapien cursus scelerisque. Nunc leo metus, luctus
          tincidunt metus ut, mollis auctor lectus. Aenean finibus lorem a est
          commodo, ac posuere leo dignissim. Curabitur quis ligula luctus, porta
          lorem sit amet, porttitor ante. Proin eu risus vel erat porta
          sollicitudin. Maecenas sed iaculis sapien. Curabitur quis dapibus
          orci.
        </li>
      </ul>
    </PageContainer>
  );
};

export default DummyPage;
