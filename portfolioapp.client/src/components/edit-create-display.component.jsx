import Box from '@mui/material/Box';
import { AppContext } from './app-context-provider';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

export default function EditCreateDisplayComponent() {
    const appContext = useContext(AppContext);
    const displayService = appContext.displayService;
    const navigate = useNavigate();
    const { id } = useParams();
    const [display, setDisplay] = useState();
    
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [updateOrCreateFail, setUpdateOrCreateFail] = useState(false);

    const [error, setError] = useState();

    const getDefaultDisplay = () => {
        return {
            id: 0,
            name: '',
            description: '',
            detailDescription: '',
            gitHubLink: '',
            imageUrl: '',
            productionLink: '',

        }
    };

    const getDisplay = useCallback(async (displayId) => {
        if (displayId == 0) {
            setDisplay(getDefaultDisplay());
            return;
        }
        var display = await displayService.getByIdAsync(displayId);
        console.log('display');
        console.log(display);
        setDisplay(display);
    }, [displayService]);

    useEffect(() => {
        getDisplay(id);
    }, [getDisplay, id]);

    const textfieldStyle = { margin: '10px', maxWidth: '800px', width: '100%' };

    function validate() {
        var isValid = true;
        if (!display.name || !display.description || !display.detailDescription) {
            setError(true);
            isValid = false;
        } else {
            setError(false);
            isValid = true;
        }
        return isValid;
    }

    async function createOrUpdate() {
        if (!validate()) { return; }

        // If an Id is present it is an update
        if (display.id) {
            let result = await displayService.update(display);
            if (result.ok) {
                setUpdateSuccess(true);
                setUpdateOrCreateFail(false);
            } else {
                setUpdateSuccess(false);
                setUpdateOrCreateFail(true);
            }
        }
        else {
            let result = await displayService.create(display);
            if (result.ok) {
                setUpdateOrCreateFail(false);
                navigate('/admin');
            } else {
                setUpdateOrCreateFail(true);
            }
        }
    }

    function deleteDisplay() {
        setConfirmDeleteOpen(true);
    }

    function handleClose(shouldDelete) {
        setConfirmDeleteOpen(false);
        // Implement delete
        return shouldDelete;
    }

    const contents = display ?
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width:'100%'}}>
            <TextField id="id"
                sx={textfieldStyle}
                label="Id"
                variant="outlined"
                value={display.id}
                disabled={true}
            />

            <TextField id="Name"
                sx={textfieldStyle}
                label="name"
                variant="outlined"
                value={display.name}
                onChange={event => { setDisplay({ ...display, name: event.target.value })}}
                error={error}
                helperText={error ? "This is required" : ""}
            />

            <TextField id="Description"
                sx={textfieldStyle}
                label="description"
                variant="outlined"
                value={display.description}
                onChange={event => { setDisplay({ ...display, description: event.target.value }) }}
                error={error}
                helperText={error ? "This is required" : ""}
                multiline
                rows={2}
            />

            <TextField id="Detail Description"
                sx={textfieldStyle}
                label="detailDescription"
                variant="outlined"
                value={display.detailDescription}
                onChange={event => { setDisplay({ ...display, detailDescription: event.target.value }) }}
                error={error}
                helperText={error ? "This is required" : ""}
                multiline
                rows={8}
            />

            <TextField id="GitHub Link"
                sx={textfieldStyle}
                label="gitHubLink"
                variant="outlined"
                value={display.gitHubLink}
                onChange={event => { setDisplay({ ...display, gitHubLink: event.target.value }) }}
            />

            <TextField id="image public id"
                sx={textfieldStyle}
                label="imageUrl"
                variant="outlined"
                value={display.imageUrl}
                onChange={event => { setDisplay({ ...display, imageUrl: event.target.value }) }}
            />

            <TextField id="Prodution Link"
                sx={textfieldStyle}
                label="productionLink"
                variant="outlined"
                value={display.productionLink}
                onChange={event => { setDisplay({ ...display, productionLink: event.target.value }) }}
            />
            <Box>
                <Button variant="contained" sx={{ marginRight:'5px' }} color="secondary" onClick={() => createOrUpdate()}>Submit</Button>
                <Button variant="contained" color="error" onClick={() => deleteDisplay()}>Delete</Button>
            </Box>


            {updateSuccess ?
                <Box sx={{ margin: '5px' }}>
                    <Alert severity="success">
                        Display updated successfully.
                    </Alert>
                </Box>
                :
                <div></div>}

            {updateOrCreateFail ?
                <Box sx={{ margin: '5px' }}>
                    <Alert severity="error">
                        Display failed to update or create.
                    </Alert>
                </Box>
                :
                <div></div>}

            <Dialog
                open={confirmDeleteOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete the display?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This will permanently delete the display.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)} autoFocus>
                        Go back
                    </Button>
                    <Button color="error" onClick={() => handleClose(true)}>Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
        
        : <div></div>;

    return contents;
}