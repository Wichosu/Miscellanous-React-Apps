import React from 'react';
import Card from './Card';

const FeaturedProducts = ({ type }) => {

  const items = [
    {title: 'Cookie', desc: '$7'},
    {title: 'Cookie', desc: '$7'},
    {title: 'Cookie', desc: '$7'},
    {title: 'Cookie', desc: '$7'},
    {title: 'Cookie', desc: '$7'},
    {title: 'Cookie', desc: '$7'}
  ]

  return (
    <div className='mx-auto'>
      <h1 className='my-10 text-center text-4xl'>{ type }</h1>
      <div className='flex flex-wrap w-full justify-evenly gap-y-8 md:gap-x-8'>
        {items.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
