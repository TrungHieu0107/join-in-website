// ** React Imports
import { forwardRef, SetStateAction, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Box from '@mui/material/Box'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icons Imports
import Editor from './editor'
import { Calendar, Close, Exclamation, InformationVariant, ListStatus, Pen } from 'mdi-material-ui'
import { Autocomplete, InputAdornment } from '@mui/material'
import { Task } from 'src/models/class'
import { StorageKeys } from 'src/constants'
import { importantLevel, importantLevelList } from 'src/constants/important-level'
import { taskAPI } from 'src/api-client'
import { CreateTaskModel } from 'src/models/query-models/CreateTaskModel'
import { useToasts } from 'react-toast-notifications'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { CommonResponse } from 'src/models/common/CommonResponse'

const CustomInputFrom = forwardRef((props, ref) => {
  return (
    <TextField
      fullWidth
      {...props}
      inputRef={ref}
      label='From *'
      autoComplete='off'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Calendar />
          </InputAdornment>
        )
      }}
    />
  )
})

const CustomInputTo = forwardRef((props, ref) => {
  return (
    <TextField
      fullWidth
      {...props}
      inputRef={ref}
      label='To *'
      autoComplete='off'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Calendar />
          </InputAdornment>
        )
      }}
    />
  )
})

export interface DialogCreateNewTask {
  close: () => void
  mainTask?: Task
  groupId: string
  onSuccess?: () => Promise<void>
}

interface Option {
  value: string
  label: string
  image: string
  name: string
  major: string
}

const options: Option[] = [
  {
    value: 'option1',
    label: 'Xuan Kien',
    image: '/images/avatars/1.png',
    name: 'Xuan Kien',
    major: 'Information Technology'
  },
  {
    value: 'option2',
    label: 'Quoc Bao',
    image: '/images/avatars/1.png',
    name: 'Quoc Bao',
    major: 'Information Technology'
  },
  {
    value: 'option3',
    label: 'Trung Hieu',
    image: '/images/avatars/1.png',
    name: 'Trung Hieu',
    major: 'Information Technology'
  }
]

const DialogCreateNewTask = (props: DialogCreateNewTask) => {
  // ** States
  const [importantLv, setimportantLv] = useState<string>('')
  const [estimatedDays, setEstimatedDays] = useState<number>(0)
  const [to, setTo] = useState<Date | null | undefined>(null)
  const [from, setFrom] = useState<Date | null | undefined>(null)
  const [description, setDescription] = useState<string>('')
  const [name, setName] = useState<string>('')
  

  const { mainTask, close, groupId, onSuccess } = props
  const addToast = useToasts()
  const router = useRouter()

  const notify = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    addToast.addToast(message, { appearance: type })
  }

  // const [selectedValues, setSelectedValues] = useState<Option[]>([])
  const handleButtonSubmitClick = async () => {
    const newTask = new CreateTaskModel({
      name: name,
      startDateDeadline: from?.toISOString(),
      endDateDeadline: to?.toISOString(),
      impotantLevel: importantLevel[importantLv]?.valueNumber,
      estimatedDays: estimatedDays,
      description: description,
      mainTaskId: mainTask?.id,
      groupId: groupId ?? ''
    })
    console.log('Values:', newTask)
    await taskAPI
      .createTask(newTask)
      .then(res => {
        const commonResposne = new CommonResponse(res)
        close()
        commonResposne.message && notify(commonResposne.message, 'success')
        onSuccess && onSuccess()
      })
      .catch(error => {
        if ((error as AxiosError)?.response?.status === 401) {
          notify('Login expired.', 'error')
          router.push('/user/login')
        } else if ((error as AxiosError)?.response?.status === 500) {
          const commonResposne = new CommonResponse((error as AxiosError)?.response?.data as CommonResponse)
          notify(commonResposne.message ?? 'Something error', 'error')
        } else {
          console.log(error)
        }
      })
  }

  const handleSelectChangeImportantLv = (event: SelectChangeEvent<string>) => {
    setimportantLv(event.target.value)
  }

  return (
    <DatePickerWrapper>
      <Card>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <CardHeader title='Add task' />
          <CardActions>
            <Button onClick={close}>
              <Close sx={{ color: 'red' }} />
            </Button>
          </CardActions>
        </Box>

        <Divider sx={{ margin: 0 }} />

        <form onSubmit={e => e.preventDefault()}>
          <CardContent>
            <Grid container spacing={5}>
              {mainTask ? (
                <Grid item sm={4} rowSpacing={2} sx={{ borderRight: 1 }}>
                  <Box sx={{ paddingRight: 5 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant='body2' sx={{ fontWeight: 600, paddingBottom: 3 }}>
                          1. Main Task
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          fullWidth
                          label='Title'
                          value={mainTask?.name}
                          disabled
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <Pen />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          fullWidth
                          label='From'
                          value={mainTask?.startDateDeadline}
                          disabled
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <Calendar />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          fullWidth
                          label='End'
                          value={mainTask?.endDateDeadline}
                          disabled
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <Calendar />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          fullWidth
                          label='Status'
                          value={mainTask?.status}
                          disabled
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <ListStatus />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          fullWidth
                          label='Important'
                          value={mainTask?.impotantLevel}
                          disabled
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <Exclamation />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              ) : (
                ''
              )}
              <Grid item sm={mainTask ? 8 : 12}>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant='body2' sx={{ fontWeight: 600, paddingBottom: 3 }}>
                        {mainTask ? '2. Subtask' : 'New main task'}
                      </Typography>
                    </Grid>
                    <Grid item container spacing={2} className='large-2'>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          fullWidth
                          label='Title *'
                          placeholder='Title'
                          onChange={e => setName(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <Pen />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <DatePicker
                          selected={from}
                          showYearDropdown
                          showMonthDropdown
                          placeholderText={StorageKeys.KEY_FORMAT_DATE}
                          customInput={<CustomInputFrom />}
                          id='form-layouts-separator-date'
                          onChange={(date: Date) => setFrom(date)}
                          dateFormat={'yyyy-MM-dd'}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <DatePicker
                          selected={to}
                          showYearDropdown
                          showMonthDropdown
                          placeholderText={StorageKeys.KEY_FORMAT_DATE}
                          customInput={<CustomInputTo />}
                          id='form-layouts-separator-date'
                          onChange={(date: Date) => setTo(date)}
                          dateFormat={'yyyy-MM-dd'}
                        />
                      </Grid>
                      {/* <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel id='form-layouts-separator-select-label'>Status *</InputLabel>
                          <Select
                            label='Country'
                            defaultValue=''
                            id='form-layouts-separator-select'
                            labelId='form-layouts-separator-select-label'
                          >
                            {listTaskStatusSelect.map(item => (
                              <MenuItem key={item.value} value={item.value}>
                                {item.lable}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid> */}
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel id='form-layouts-separator-multiple-select-label'>Important Level *</InputLabel>
                          <Select
                            value={importantLv}
                            onChange={handleSelectChangeImportantLv}
                            id='form-layouts-separator-multiple-select'
                            labelId='form-layouts-separator-multiple-select-label'
                            input={<OutlinedInput label='Language' id='select-multiple-language' />}
                          >
                            {importantLevelList.map(item => (
                              <MenuItem key={item.value} value={item.value}>
                                {item.lable}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type='number'
                          onChange={e => setEstimatedDays(Number(e.target.value))}
                          label='Estimated Days'
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <Calendar />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      {/* <Grid item xs={12} sm={12}>
                        <Autocomplete
                          multiple
                          options={options}
                          getOptionLabel={option => option.label}
                          onChange={(event, value) => setSelectedValues(value)}
                          renderInput={params => <TextField {...params} label='Assign' variant='outlined' />}
                          renderOption={(props, option) => (
                            <li {...props}>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                  src={option.image}
                                  alt={option.name}
                                  style={{ marginRight: 10, width: 30, height: 30 }}
                                />
                                <div>
                                  <p>{option.name}</p>
                                  <p>{option.major}</p>
                                </div>
                              </div>
                            </li>
                          )}
                        />
                      </Grid> */}

                      <Grid item xs={12} sm={12}>
                        <Box sx={{ mt: 5, mb: 2, display: 'flex', alignItems: 'center' }}>
                          <InformationVariant sx={{ marginRight: 1 }} />
                          <Typography variant='body1'>Description</Typography>
                        </Box>
                        <Editor
                          value={description}
                          name='description'
                          onChange={(data: SetStateAction<string>) => {
                            setDescription(data)
                            console.log(data)
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={handleButtonSubmitClick}>
              Submit
            </Button>
            <Button size='large' color='secondary' variant='outlined' onClick={close}>
              Cancel
            </Button>
          </CardActions>
        </form>
      </Card>
    </DatePickerWrapper>
  )
}

export default DialogCreateNewTask
