import { Dialog, DialogBody } from "@material-tailwind/react";
import { useContext, useState } from "react";
import {
  MdClose,
  MdOutlineReceipt,
  MdPerson,
  MdLocalShipping,
  MdPayment,
  MdInventory,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
} from "react-icons/md";
import { formatDateTime } from "../../utils/formatDateTime";
import { AuthContext } from "../../Providers/AuthProvider";
import toast from "react-hot-toast";

const OrderDetailsModal = ({ open, handleClose, order, onOrderUpdate }) => {
  const { user } = useContext(AuthContext);
  const [isConfirmChecked, setIsConfirmChecked] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  if (!order) return null;

  const {
    id,
    invoice,
    client,
    confirmed_at,
    shipping_info,
    reference_items,
    gateway,
    transaction_details,
    created_at,
  } = order;

  const totalPrice = reference_items.reduce(
    (sum, item) => sum + parseFloat(item.price) * parseInt(item.quantity),
    0
  );

  const handleModalClose = () => {
    setIsConfirmChecked(false);
    setIsConfirming(false);
    handleClose();
  };

  const handleConfirmOrder = async () => {
    if (!isConfirmChecked || confirmed_at) return;

    setIsConfirming(true);
    try {
      const res = await fetch(
        `https://api.talukderhomes.com.au/api/orders/confirm/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const data = await res.json();
      if (data?.status === true) {
        toast.success("Order confirmed successfully.");
        handleModalClose();

        if (onOrderUpdate) {
          onOrderUpdate(id, data.data.confirmed_at);
        }
      }
    } catch (error) {
      console.error("Failed to confirm order:", error);
      toast.error("Failed to confirm order. Please try again.");
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <Dialog
      open={open}
      handler={handleModalClose}
      size="lg"
      className="rounded-lg"
    >
      <div className="flex items-start border-b justify-between p-6">
        <div>
          <div className="flex text-xl font-semibold items-center gap-2 py-4 text-primary">
            <MdOutlineReceipt size={21} />
            Order Summary
          </div>
          <h2 className="text-sm font-medium text-gray-900">
            Invoice ID: #{invoice}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {formatDateTime(created_at)}
          </p>
        </div>

        <button
          onClick={handleModalClose}
          className="p-2 rounded-full mt-1.5 hover:bg-gray-100 transition-colors"
        >
          <MdClose size={20} className="text-gray-500" />
        </button>
      </div>

      <DialogBody className="p-0 overflow-hidden">
        {/* Content Area */}
        <div className="overflow-y-auto max-h-[65vh] p-6 space-y-8">
          {/* Client Section */}
          {client?.name && client?.email && (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <MdPerson size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Client Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-gray-600">Name</p>
                  <p className="font-medium text-gray-700">{client?.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-600">Email</p>
                  <p className="font-medium text-gray-700">{client?.email}</p>
                </div>
              </div>
            </section>
          )}

          {/* Products Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <MdInventory size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Products</h3>
            </div>
            <div className="space-y-3">
              {reference_items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-700">{item?.title}</p>
                    {item.attribute && (
                      <p className="text-sm text-gray-600">
                        Variant: {item?.attribute}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">
                      Qty: {item?.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-gray-700">${item?.price}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Shipping Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-50 text-green-600">
                <MdLocalShipping size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Shipping Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {/* Full width address field */}
              <div className="md:col-span-2 space-y-1">
                <p className="text-gray-600">Address</p>
                <p className="font-medium text-gray-700">
                  {shipping_info.address}
                </p>
              </div>

              {/* Regular fields in 2 columns */}
              <div className="space-y-1">
                <p className="text-gray-600">City</p>
                <p className="font-medium text-gray-700">
                  {shipping_info.city}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-600">State</p>
                <p className="font-medium text-gray-700">
                  {shipping_info.state}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-600">Zip Code</p>
                <p className="font-medium text-gray-700">
                  {shipping_info.zip_code}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-600">Country</p>
                <p className="font-medium text-gray-700">
                  {shipping_info.country}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-600">Phone</p>
                <p className="font-medium text-gray-700">
                  {shipping_info.phone}
                </p>
              </div>
            </div>
          </section>

          {/* Payment Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                <MdPayment size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Payment Information
              </h3>
            </div>
            <div
              className={`grid grid-cols-1  gap-4 text-sm ${gateway?.title && "md:grid-cols-2"}`}
            >
              {gateway?.title && (
                <div className="space-y-1">
                  <p className="text-gray-600">Method</p>
                  <p className="font-medium text-gray-700">{gateway?.title}</p>
                </div>
              )}

              <div className="space-y-1">
                <p className="text-gray-600">Transaction ID</p>
                <p className="font-medium text-gray-700 break-all">
                  {transaction_details}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-gray-600">Total Amount</p>
                <p className="text-xl font-bold text-gray-900">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </section>
        </div>
      </DialogBody>

      {/* Footer */}
      <div className="p-4 border-t space-y-4">
        {/* Confirmation Checkbox - Only show if order is not confirmed */}
        {!confirmed_at && (
          <div className="flex items-start gap-3 p-3 bg-orange-50/50 border border-orange-100 rounded-lg">
            <button
              onClick={() => setIsConfirmChecked(!isConfirmChecked)}
              className="flex-shrink-0 mt-0.5 text-primary hover:text-primary-hover transition-colors"
            >
              {isConfirmChecked ? (
                <MdCheckBox size={20} />
              ) : (
                <MdCheckBoxOutlineBlank size={20} />
              )}
            </button>
            <div className="text-sm">
              <p className="font-medium text-orange-800">
                I have reviewed all order details and want to proceed with
                confirmation.
              </p>
              <p className="text-orange-700 mt-1">
                <strong>Warning:</strong> Once confirmed, this order cannot be
                modified or cancelled.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-4 justify-end">
          <button
            onClick={handleModalClose}
            className="px-6 py-2 bg-gray-100 md:min-w-[146px] hover:bg-gray-200 ease-linear duration-200 text-gray-700 rounded-lg transition-colors"
          >
            Close
          </button>

          {confirmed_at ? (
            <div className="px-6 py-2 bg-green-100 md:min-w-[146px] text-green-700 rounded-lg flex items-center justify-center gap-2">
              <MdCheckBox size={18} />
              Order Confirmed
            </div>
          ) : (
            <button
              onClick={handleConfirmOrder}
              disabled={!isConfirmChecked || isConfirming}
              className={`px-6 py-2 md:min-w-[146px] rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                !isConfirmChecked || isConfirming
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              {isConfirming ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Confirming...
                </>
              ) : (
                "Confirm Order"
              )}
            </button>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default OrderDetailsModal;
