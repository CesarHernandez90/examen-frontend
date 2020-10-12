import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

export default function AlertComponent({alert, alertOption, alertMessage, closeAlert}) {

    return (
        <Snackbar open={alert} autoHideDuration={3000}>
            <MuiAlert severity={alertOption} onClose={closeAlert}>
                {alertMessage}
            </MuiAlert>
        </Snackbar>
    );
}