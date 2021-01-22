import React, {useContext, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { UserContext } from '../context/UserContext';
import { useAuth0 } from '@auth0/auth0-react';
import UserController from '../api/UserController';

export default function FormDialog() {
    const userController = new UserController();
    const userContext = useContext(UserContext);
    const Auth0 = useAuth0();
    const [user, setUser] = useState({name: Auth0.user.name, email: Auth0.user.email})
    
    return (
    <div>
      <Dialog open={userContext.profileUpdate} onClose={() => userContext.setProfileUpdate(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">User Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your account details are given below:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={user.name}
            onChange={(e) => setUser({...user, name: e.target.value})}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={async () => {
              userController.updateUser(await Auth0.getAccessTokenSilently(),user);
              userContext.setProfileUpdate(false);
          }} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}