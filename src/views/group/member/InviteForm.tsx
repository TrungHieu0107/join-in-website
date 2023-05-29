// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// ** Icons Imports
import { Autocomplete} from '@mui/material'

interface Option {
  value: string;
  label: string;
  image: string;
  name: string;
  major: string;
}

const options: Option[] = [
  {
    value: 'option1',
    label: 'Xuan Kien',
    image: '/images/avatars/1.png',
    name: 'Xuan Kien',
    major: 'Information Technology',
  },
  {
    value: 'option2',
    label: 'Quoc Bao',
    image: '/images/avatars/1.png',
    name: 'Quoc Bao',
    major: 'Information Technology',
  },
  {
    value: 'option3',
    label: 'Trung Hieu',
    image: '/images/avatars/1.png',
    name: 'Trung Hieu',
    major: 'Information Technology',
  }
];

const InviteForm  = () => {
  // ** State
  const [selectedValues, setSelectedValues] = useState<Option[]>([]);
  const handleButtonClick = () => {
    console.log('Selected Values:', selectedValues);
  };

  return (
    <CardContent sx={{ width: '500px' }}>
  <Autocomplete
      multiple
      options={options}
      getOptionLabel={(option) => option.label}
      onChange={(event, value) => setSelectedValues(value)}
      renderInput={(params) => (
        <TextField {...params} label="Email" variant="outlined" />
      )}
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
    <Button variant="contained" sx={{mt: 5}} onClick={handleButtonClick}>
        Send
      </Button>
    </CardContent>
  )
}

export default InviteForm

