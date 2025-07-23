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

const OrderDeleteModal = ({ open, handleClose, order, onOrderDelete }) => {
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
        `https://api.talukderhomes.com.au/api/purchase-histories/delete/${order.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const data = await res.json();
      if (data?.status === true) {
        toast.success("Order deleted successfully.");
        handleModalClose();

        if (onOrderDelete) {
          onOrderDelete(order.id);
        }
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete. Please try again.");
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
          Delete Confirmation
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
          Are you sure you want to delete this order history? This action cannot
          be undone.
        </p>

        {/* Warning / Confirmation */}
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
          <div>
            <p className="font-medium text-red-800">
              I understand this action is permanent and cannot be undone.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 justify-end pt-2">
          <button
            onClick={handleModalClose}
            className="px-6 py-2 bg-gray-100 md:min-w-[120px] hover:bg-gray-200 ease-linear duration-200 text-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={!isConfirmChecked || isDeleting}
            className={`px-6 py-2 md:min-w-[120px] rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
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

export default OrderDeleteModal;
