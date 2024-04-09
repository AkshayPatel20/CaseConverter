import React, { useEffect, useState } from 'react'

import axios from 'axios';
import newsAPIRequest from '../../config/request';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


// const images = [
//   {
//     label: 'San Francisco – Oakland Bay Bridge, United States',
//     imgPath:
//       'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label: 'Bird',
//     imgPath:
//       'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label: 'Bali, Indonesia',
//     imgPath:
//       'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
//   },
//   {
//     label: 'Goč, Serbia',
//     imgPath:
//       'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
//   },
// ];


export const NewsRoom = () => {

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);


  const [topHeadline, setTopheadline] = useState([]);

  const [topBusinessHeadline, setTopBusinessheadline] = useState([]);

  const maxSteps = topHeadline.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };



  async function fetchHeadlineData(){
    const topHeadlineReq = await axios.get(newsAPIRequest.topHeadlines);
    setTopheadline(topHeadlineReq.data.articles);
    return topHeadlineReq;
  }

  
  async function fetchBusinessHeadlineData(){
    const topBusinessHeadlineReq = await axios.get(newsAPIRequest.businessNews);
    // console.log(topBusinessHeadlineReq.data.sources);
    setTopBusinessheadline(topBusinessHeadlineReq.data.sources.slice(0, 6));
    return topBusinessHeadlineReq;
  }
    

  useEffect(() => {

    fetchHeadlineData();

    fetchBusinessHeadlineData();
    
  }, [])
  
  
  const newWindow = (event) => {
    window.open(event.currentTarget.alt, '_blank');
  }
  

  return (    
  <>

  <div className="container" > 

    <div className='row'>
    <div className='col-md-10 offset-md-1 mt-3'>

    <Box sx={{ maxWidth: '100%', flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{
        
        (topHeadline[activeStep] === '' || topHeadline[activeStep] === undefined) ? '' : 
        topHeadline[activeStep].title
        
        }</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {topHeadline.map((step, index) => (
          <div key={step.title}>
            {Math.abs(activeStep - index) <= 2 ? (
              
              <Box
                component="img"
                sx={{
                  height: 400,
                  display: 'block',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.urlToImage}
                alt={step.url}
                onClick={newWindow}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>

    </div>
    </div>





    <div className='row'>
      <div className='col-md-12 offset-md-1 mt-3'>

      <h4>Business Trending</h4>

      {topBusinessHeadline.map((element, index = 0) => (


        <Card sx={{ maxWidth: 245 }} style={{display:'inline-block'}}>
        <CardMedia
          component="img"
          height="100"
          image="https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60"
          alt="Paella dish"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {element.title}
          </Typography>
        </CardContent>      
        </Card>

      ))}


      </div>
    </div>



  </div> {/* Close Container */}


    
    </>
  )
}

export default NewsRoom;