import { Dialog, DialogBody } from "@material-tailwind/react";
import {
  MdClose,
  MdDelete,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
} from "react-icons/md";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import toast from "react-hot-toast";

const CustomerDeleteModal = ({ open, handleClose, customer, onDelete }) => {
  const { user } = useContext(AuthContext);
  const [isConfirmChecked, setIsConfirmChecked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleModalClose = () => {
    setIsConfirmChecked(false);
    setIsDeleting(false);
    handleClose();
  };

  const handleDelete = async () => {
    if (!isConfirmChecked) return;

    setIsDeleting(true);
    try {
      const res = await fetch(
        `https://api.talukderhomes.com.au/api/clients/delete/${customer.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const data = await res.json();
      if (data?.status === true) {
        toast.success("Customer deleted successfully.");
        if (onDelete) onDelete(customer.id);
        handleModalClose();
      } else {
        toast.error(data?.msg || "Deletion failed.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog
      open={open}
      handler={handleModalClose}
      size="sm"
      className="rounded-lg"
    >
      <div className="flex items-start border-b justify-between p-6">
        <div className="flex text-xl font-semibold items-center gap-2 py-4 text-red-600">
          <MdDelete size={21} />
          Delete Customer
        </div>
        <button
          onClick={handleModalClose}
          className="p-2 rounded-full mt-1.5 hover:bg-gray-100 transition-colors"
        >
          <MdClose size={20} className="text-gray-500" />
        </button>
      </div>

      <DialogBody className="p-6 space-y-6 text-sm">
        <p className="text-gray-700">
          Are you sure you want to delete <strong>{customer?.name}</strong>?
          This action cannot be undone.
        </p>

        <div className="flex items-center gap-3 p-3 bg-red-50/50 border border-red-100 rounded-lg">
          <button
            onClick={() => setIsConfirmChecked(!isConfirmChecked)}
            className="flex-shrink-0 text-red-600 hover:text-red-700 transition-colors"
          >
            {isConfirmChecked ? (
              <MdCheckBox size={20} />
            ) : (
              <MdCheckBoxOutlineBlank size={20} />
            )}
          </button>
          <p className="font-medium text-red-800">
            I understand this action is permanent and cannot be undone.
          </p>
        </div>

        <div className="flex items-center gap-4 justify-end pt-2">
          <button
            onClick={handleModalClose}
            className="px-6 py-2 bg-gray-100 md:min-w-[120px] hover:bg-gray-200 text-gray-700 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={!isConfirmChecked || isDeleting}
            className={`px-6 py-2 md:min-w-[120px] rounded-lg flex items-center justify-center gap-2 ${
              !isConfirmChecked || isDeleting
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default CustomerDeleteModal;
