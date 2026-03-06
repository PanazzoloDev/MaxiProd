import { get } from "lodash";
import { observer } from "mobx-react";
import { Create, Update } from "../../../Components/Icons";
import { useDialogContext } from "../../../Contexts/DialogContext";
import FormUsersContainer from "../Containers/FormModalContainer";
import store from "../Stores/FormPeopleStore";

type FormUserModalProps = {
  object?: object;
  type?: 'Create' | 'Update'
}

const FormUsersModal = observer((props: FormUserModalProps) => {
  const { openDialog, closeDialog } = useDialogContext();

  const handleOpenModal = async () => {
    if (props.object && props.type === "Update") {
      await store.submit('Read', get(props.object, 'id'));
      OpenModal("Editar");
    } else {
      OpenModal("Novo");
    }
  };

  const OpenModal = (mode: 'Editar' | 'Novo') => {
    openDialog({
      component: <FormUsersContainer />,
      title: `${mode} usuário`,
      okCallback: handleSubmit,
      cancelCallback: handleCloseModal,
      width: "xl",
      okText: "Confirmar",
      cancelText: "Cancelar",
      isOpen: true
    });
  }

  const handleSubmit = () => {
    store.submit(props.type)
    handleCloseModal()
  }

  const handleCloseModal = () => {
    store.resetStore();
    closeDialog();
  }

  return (
    props.type == "Create" ?
      <Create onClick={handleOpenModal} /> :
      <Update onClick={handleOpenModal} />
  );
});

export default FormUsersModal;
