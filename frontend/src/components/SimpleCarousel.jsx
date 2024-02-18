import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assests/styles/components/SimpleCarousel.css';

const Card = ({ title, description, author, position }) => (
  <div className="container-style-carousel">
    <div style={{ paddingBottom: '15%' }}>
      <h3 className="heading-style-carousel">
        {title}
      </h3>
      <p className="paragraph-style-carousel">
        {description}
      </p>
    </div>
    <div>
      <p className="author-style">
        {author}
      </p>
      <p className="position-style-carousel">
        {position}
      </p>
    </div>
  </div>
);

const CardCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const cards = [
    { title: 'A special note of appreciation to Shachi for not only crafting exceptional drinking water bottles but also for their commendable commitment to swift and efficient delivery.', description: 'Your dedication to ensuring our hydration needs are met promptly is truly noteworthy. Thank you, Shachi, for your exceptional service and the timely arrival of your wonderful products.', author: 'Dharmvijay Verma', position: 'Businessman' },
    { title: 'With profound appreciation, we extend our heartfelt thanks to Shachi for creating extraordinary drinking water bottles.', description: 'Your commitment to quality and innovation has brought refreshment and style into our lives. We salute Shachi for the excellence reflected in every drop from your wonderful bottles. Cheers to your dedication and remarkable products', author: 'Dhanu Kumaar', position: 'Businessman' },
    { title: 'I want to express my sincere appreciation to Shachi for the outstanding water bottles they provide. ', description: 'Shachi\'s water bottles have consistently exceeded demand, flying off the shelves due to their exceptional quality and design. Your products contribute significantly to the success of our sales. Thank you for the wonderful addition!', author: 'Shlok Sinha', position: 'Shop owner' },
    { title: 'A special note of appreciation to Shachi for not only crafting exceptional drinking water bottles but also for their commendable commitment to swift and efficient delivery.', description: 'Your dedication to ensuring our hydration needs are met promptly is truly noteworthy. Thank you, Shachi, for your exceptional service and the timely arrival of your wonderful products.', author: 'Dharmvijay Verma', position: 'Businessman' },
    { title: 'With profound appreciation, we extend our heartfelt thanks to Shachi for creating extraordinary drinking water bottles.', description: 'Your commitment to quality and innovation has brought refreshment and style into our lives. We salute Shachi for the excellence reflected in every drop from your wonderful bottles. Cheers to your dedication and remarkable products', author: 'Dhanu Kumaar', position: 'Businessman' },
  ];

  return (
    <>
      <h2 className="heading-style-carousel-review">
        What People Say About Us
      </h2>
      <p className="para-style-carousel-review">
        Discover our range of cutting-edge water bottles – designed for performance and perfected for you.
      </p>
      <Slider {...settings}>
        {cards.map((card, index) => (
          <div key={index}>
            <Card title={card.title} description={card.description} author={card.author} position={card.position} />
          </div>
        ))}
      </Slider>
    </>
  );
};

export default CardCarousel;
