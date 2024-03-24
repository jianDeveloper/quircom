import React from 'react'

import NavHeader from './CMainNav'
import CFooter from './CFooter'
import Box from '@mui/material/Box';

function CTracker() {

  return (
    <div className=''>
      <NavHeader />
      <div className='flex-inline mx-10 my-10'>
        <h1 className='font-extrabold text-[30px] text-[#1D5B79]'>Task Tracker</h1>
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      This Box renders as an HTML section element.
    </Box>
      </div>
      <CFooter />
    </div>
  )
}

export default CTracker