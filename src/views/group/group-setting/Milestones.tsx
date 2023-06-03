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
import { useState,useEffect } from 'react'
import { Milestone } from 'src/models'
import { milestoneAPI } from 'src/api-client'
import { CommonResponse } from 'src/models/common/CommonResponse'
import { useToasts } from 'react-toast-notifications'

const steps : Milestone[] = [
  {
    Id: '1',
    Name: 'Select campaign settings',
    Description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`
  },
  {
    Id: '2',
    Name: 'Create an ad group',
    Description: 'An ad group contains one or more ads which target a shared set of keywords.'
  },
  {
    Id: '3',
    Name: 'Create an ad',
    Description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`
  }
]

export default function MilestoneScreen() {
  const [activeStep, setActiveStep] = useState(0)
  const [currentStep, setcurrentStep] = useState(0)
  const [statusForm, setStatusForm] = useState<string>('Create');
  const [listMilestones,setListMilestones] = useState<Milestone[]>([]);

  const addToast = useToasts();

  useEffect(()=>{
    // getListMilestone();
  },[]);


  const getListMilestone = async () => {
    try {
      await milestoneAPI
        .getList()
        .then(res => {
          const data = new CommonResponse(res)
          const milestones: Milestone[] = data.data
          setListMilestones(milestones)
        })
        .catch(error => {
          console.log(error);
        })
    } catch (err) {
      addToast.addToast(err, { appearance: 'error' })
    }
  }

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
    setStatusForm('Update');

  }

  const handleBack = () => {
    setcurrentStep(activeStep -1)
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const handleClickAddNew = () => {
    setStatusForm('Create');
  }

  return (
    <Grid container spacing={10}>
      <Grid item xs={6} md={6}>
        <Card>
          <Box sx={{  display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <CardHeader
            title='Change Milestone'
          />
          <Button variant='contained' size='small' sx={{mr:5}} onClick={handleClickAddNew}>
            Add New
          </Button>
        </Box>
          <CardContent>
            <Stepper activeStep={activeStep} orientation='vertical'>
              {steps.map((step, index) => (
                <Step key={step.Name} expanded= {currentStep == index}  >
                  <StepLabel onClick={()=>handleChangeStep(index)} optional={index === 2 ? <Typography variant='caption'>Last step</Typography> : null}>
                    {step.Name}
                  </StepLabel>
                  <StepContent >
                    <Typography>{step.Description}</Typography>
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
          title= {statusForm ==='Create' ?'Create' : `Update Step ${currentStep + 1} ` }
          />
          <CardContent>
            <MilestoneForm status={statusForm} milestone={statusForm ==='Create' ? undefined : steps[currentStep]}/>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
