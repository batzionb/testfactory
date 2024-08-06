import React from 'react';
import { Typography } from '@material-ui/core';
import {  
  Header,
  Page,
  Content,
  HeaderLabel,
} from '@backstage/core-components';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';

export const ExampleComponent = () => (
  <Page themeId="tool">
    <Header title="Welcome to test!" subtitle="Optional subtitle">
      <HeaderLabel label="Owner" value="Team X" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
      <Stepper activeStep={0}>
        <Step>
          <StepLabel                          
            tabIndex={0}
          >
            <Typography variant="h6" component="h2">
              test
            </Typography>
          </StepLabel>
        </Step>
      </Stepper>
    </Content>
  </Page>
);
