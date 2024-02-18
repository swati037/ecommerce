import React from 'react';
import SimpleCarousel from '../components/SimpleCarousel';
import BestSellingCarousel from '../components/bestSellingProduct';
import ThreeCardComponent from '../components/whyShachi'
import OurLandingProduct from '../components/OurLandingProduct';
import DealOfTheDay from '../components/DealOfTheDay';
import FreshWater from '../components/FreshWater';
import CardItem from '../components/CardsCompo';


const App = () => {
  return (
    <div>
      
      <div style = {{padding : '100px'}}></div>
      <ThreeCardComponent />

      <div style = {{padding : '30px'}}></div>
      <FreshWater />

      <div style = {{paddingBottom : '50px'}}></div>
      <BestSellingCarousel />

      <div style = {{padding : '100px'}}></div>
      <CardItem />

      <div style = {{padding : '100px'}}></div>
      <DealOfTheDay />
      
      <div style = {{padding : '100px'}}></div>
      <OurLandingProduct />
     
      <div style = {{padding : '100px'}}></div>
      <SimpleCarousel />

      <div style = {{paddingBottom : '100px'}}></div>

    </div>
  );
};

export default App;
