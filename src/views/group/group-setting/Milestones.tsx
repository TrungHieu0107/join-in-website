import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Grid, CardContent, Card, CardHeader } from '@mui/material'
import MilestoneForm from './MilestoneForm'

const steps = [
  {
    label: 'Select campaign settings',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`
  },
  {
    label: 'Create an ad group',
    description: 'An ad group contains one or more ads which target a shared set of keywords.'
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`
  }
]

export default function Milestone() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [currentStep, setcurrentStep] = React.useState(0)

  const handleNext = () => {
    setcurrentStep(activeStep +1)
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleChangeStep = (index:number) => {
    if (index === currentStep){
      setcurrentStep(activeStep);
    } else {
      setcurrentStep(index);
    }

  }

  const handleBack = () => {
    setcurrentStep(activeStep -1)
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Grid container spacing={10}>
      <Grid item xs={6} md={6}>
        <Card>
          <Box sx={{  display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <CardHeader
            title='Change Milestone'
          />
          <Button variant='contained' size='small' sx={{mr:5}}>
            Add New
          </Button>
        </Box>
          <CardContent>
            <Stepper activeStep={activeStep} orientation='vertical'>
              {steps.map((step, index) => (
                <Step key={step.label} expanded= {currentStep == index}  >
                  <StepLabel onClick={()=>handleChangeStep(index)} optional={index === 2 ? <Typography variant='caption'>Last step</Typography> : null}>
                    {step.label}
                  </StepLabel>
                  <StepContent >
                    <Typography>{step.description}</Typography>
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button variant='contained' onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                          {index === steps.length - 1 ? 'Finish' : 'Continue'}
                        </Button>
                        <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                          Back
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>All steps completed - you&apos;re finished</Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
                </Button>
              </Paper>
            )}
          </CardContent>
        </Card>

      </Grid>
      <Grid item xs={6} md={6}>
        <Card>
          <CardHeader
          title='Create | Update Step 2'
          />
          <CardContent>
            <MilestoneForm/>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
