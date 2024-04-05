import React from 'react';
import { Card, CardHeader, CardBody, Typography, Button } from '@material-tailwind/react';

const FCards = ({ image, subtitle, title, author, button }) => {
  return (
    <Card className="mt-6 w-[320px]">
      <CardHeader className="relative h-55">
        <img className="rounded-md w-full" src={image} alt={title} />
      </CardHeader>
      <CardBody className='flex flex-row justify-between items-center '>
        <div className='flex flex-col'>
            <Typography className="mb-2 text-orange-600">
                {subtitle}
            </Typography>
            <Typography className="mb-2 text-[#1D5B79] font-bold text-3xl">
                {title}
            </Typography>
            <Typography className='text-[#1D5B79]'>
                {author}
            </Typography>
        </div>
        <Button className='bg-orange-600 h-10 w-50 text-center p-2 '>{button}</Button>
      </CardBody>
    </Card>
  );
};

export default FCards;