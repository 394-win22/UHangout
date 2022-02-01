import { Button } from '@mui/material'

import { signOut } from '../utilities/firebase'

const SignOutButton = () => (
    <div>
        <Button color="inherit" onClick={signOut}>Sign out</Button>
    </div>
)

export default SignOutButton