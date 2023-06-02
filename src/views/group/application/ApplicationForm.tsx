// ** MUI Imports
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  CardContent,
  Divider,
  Box,
  Typography,
  SelectChangeEvent
} from '@mui/material'
import {  InformationVariant } from 'mdi-material-ui'
import { SetStateAction, useState } from 'react'
import Editor from 'src/views/dialog/editor'

// ** Icons Imports

interface RecruitmentDataType {
  major: string
  quantity: number
}

const RecruitmentData = [
  { major: 'Information Technology', quantity: 1 },
  { major: 'English', quantity: 2 }
]

const ApplicationForm = () => {
  // ** State
  const [description, setDescription] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState('IT');

  const handleChange = (event:SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value);
  };

  const handleClickSend = () => {
    console.log(description);
  }


  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Major</InputLabel>
              <Select label='Role' value={selectedValue} onChange={handleChange}>
                <MenuItem value='IT'>Information Technology</MenuItem>
                <MenuItem value='BA'>Business Administration</MenuItem>
                <MenuItem value='EN'>English</MenuItem>
                <MenuItem value='JP'>Japan</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} >
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <InformationVariant fontSize='small' sx={{ marginRight: 1 }} />
              <Typography variant='body2'>Description</Typography>
            </Box>
            <Editor name='description'  value={description}
            onChange={(dataChange: SetStateAction<string>) => {
                  setDescription(dataChange.toString())
                }} />
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleClickSend}>
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
      <Divider sx={{ m: '20px' }}>Recruiting</Divider>
      {RecruitmentData.map((item: RecruitmentDataType, index: number) => {
        return (
          <Box
            key={item.major}
            sx={{ display: 'flex', alignItems: 'center', mb: index !== RecruitmentData.length - 1 ? 6 : 0 }}
          >
            <Box
              sx={{
                ml: 4,
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>{item.major}</Typography>
              </Box>
              <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'row' , alignItems: 'center'}}>
                <Typography variant='subtitle1' sx={{ fontWeight: 600, color: 'success.main', mr: 5 }}>
                  {item.quantity}
                </Typography>
              </Box>
            </Box>
          </Box>
        )
      })}
    </CardContent>
  )
}

export default ApplicationForm
