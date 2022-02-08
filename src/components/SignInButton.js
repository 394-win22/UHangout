import { Button } from "@mui/material";

import { signInWithGoogle } from "../utilities/firebase";

const SignInButton = () => (
  <div>
    <Button color="inherit" onClick={signInWithGoogle}>
      Sign In
    </Button>
  </div>
);

export default SignInButton;
