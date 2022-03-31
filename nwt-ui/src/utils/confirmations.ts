import {ConfirmOptions} from "material-ui-confirm";
import {messages} from "common/i18n/messages";

export interface ConfirmationDialogProps {
    confirm: (options?: ConfirmOptions) => Promise<void>;
    onCancel: () => void
    onOk: () => void
    name: string
}

const confirmDelete = ({onCancel, onOk, name, confirm}: ConfirmationDialogProps) => {
    confirm({
        description: messages.confirmations.delete(name),
        title: messages.confirmations.areYouSure
    })
        .then(() => {
            onOk()
        })
        .catch(() => {
            onCancel()
        });
}

export default confirmDelete