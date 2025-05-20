import { Dialog, DialogBody } from "@material-tailwind/react";
import {
  MdClose,
  MdOutlineReceipt,
  MdPerson,
  MdLocalShipping,
  MdPayment,
  MdInventory,
} from "react-icons/md";
import { formatDateTime } from "../../utils/formatDateTime";

const OrderDetailsModal = ({ open, handleClose, order }) => {
  const {
    invoice,
    client,
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

  return (
    <Dialog open={open} handler={handleClose} size="lg" className="rounded-lg">
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
          onClick={handleClose}
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
              <div className="space-y-1">
                <p className="text-gray-600">Phone</p>
                <p className="font-medium text-gray-700">
                  {shipping_info.phone}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-600">Address</p>
                <p className="font-medium text-gray-700">
                  {shipping_info.address}
                </p>
              </div>
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
      <div className="p-4 border-t flex justify-end">
        <button
          onClick={handleClose}
          className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
    </Dialog>
  );
};

export default OrderDetailsModal;
