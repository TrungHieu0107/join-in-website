// ** MUI Imports
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  CardContent,
  Divider,
  Box,
  Typography,
  IconButton,
  SelectChangeEvent
} from '@mui/material'
import { AccountMultiple, DeleteOutline } from 'mdi-material-ui'
import { ChangeEvent, useEffect, useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import { majorAPI } from 'src/api-client'
import { Major } from 'src/models/class'
import { CommonResponse } from 'src/models/common/CommonResponse'

// ** Icons Imports

interface RecruitmentDataType {
  major: string
  quantity: number
}

const RecruitmentData = [
  { major: 'Information Technology', quantity: 1 },
  { major: 'English', quantity: 2 }
]

const RecruitmentForm = () => {
  // ** State
  const [selectedValue, setSelectedValue] = useState('')
  const [listMajors, setListMajors] = useState<Major[]>([])
  const [quantity, setQuantity] = useState<number>(1);

  const addToast = useToasts()

  useEffect(() => {
    getListMajors()
  }, [])

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value)
  }

  const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) =>{
    setQuantity(Number(event.target.value));
  }

  const getListMajors = async () => {
    try {
      await majorAPI
        .getList()
        .then(res => {
          const data = new CommonResponse(res)
          const majors: Major[] = data.data
          setListMajors(majors)
        })
        .catch(error => {
          console.log(error);
        })
    } catch (err) {
      addToast.addToast(err, { appearance: 'error' })
    }
  }

  const handleClickDelete = () => {
    // handle delete recruitment
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Major</InputLabel>
              <Select label='Role' value={selectedValue} onChange={handleChange}>
                {listMajors.map(item => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='number'
              label='Quantity'
              value={quantity}
              onChange={handleChangeQuantity}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountMultiple />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Add
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
                <IconButton onClick={handleClickDelete}>
                  <DeleteOutline color='error' />
                </IconButton>
              </Box>
            </Box>
          </Box>
        )
      })}
    </CardContent>
  )
}

export default RecruitmentForm
