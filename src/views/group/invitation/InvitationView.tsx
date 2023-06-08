import { Card, CardContent, Typography, Divider, Box, Button } from '@mui/material'
import { GroupData } from 'src/pages/view-group/invitation'

interface InvitationViewProps {
  values: GroupData
}

const InvitationView = ({ values }: InvitationViewProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' sx={{ marginBottom: 3.5 }}>
          Invitation
        </Typography>
        <Divider sx={{ marginY: '20px' }} />
        <Typography align='center' variant='h6'>
          {' '}
          Group {values.groupName} has sent you an invitation to join the group.
          <br /> Would you like to join with them?{' '}
        </Typography>
        <Box sx={{ mt: 2, mb: 1, display: 'flex', justifyContent: 'center' }}>
          <Button variant='outlined' size='small' color='error' sx={{ marginRight: 5 }}>
            Reject
          </Button>
          <Button variant='contained' size='small' color='success'>
            Accept
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default InvitationView
