import React from 'react'
import { Container, Typography, Paper } from '@mui/material';

function PageContainer({children}) {
  return (
    <Container>{children}</Container>
  )
}

export default PageContainer