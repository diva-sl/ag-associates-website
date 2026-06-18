import {
  Download,
  CheckCircle,
  Receipt,
  Calendar,
  CreditCard,
} from "lucide-react";

const BillingHistory = ({ transactions = [], handleDownloadInvoice }) => {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
      {/* Header */}

      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#511D43] to-[#901E3E] flex items-center justify-center text-white">
          <Receipt size={22} />
        </div>

        <div>
          <h3 className="text-2xl font-bold text-[#511D43]">Billing History</h3>

          <p className="text-slate-500">Subscription payments and invoices.</p>
        </div>
      </div>

      {/* Empty State */}

      {transactions.length === 0 ? (
        <div className="border-2 border-dashed border-slate-200 rounded-3xl py-16 text-center">
          <Receipt size={60} className="mx-auto text-slate-300 mb-4" />

          <h4 className="font-semibold text-lg text-slate-700">
            No Transactions Found
          </h4>

          <p className="text-slate-500 mt-2">
            Your payment history will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                hover:bg-white
                hover:shadow-md
                transition-all
                p-5
              "
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                {/* Left */}

                <div className="flex items-start gap-4">
                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-gradient-to-r
                      from-[#511D43]
                      to-[#901E3E]
                      text-white
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <CreditCard size={22} />
                  </div>

                  <div>
                    <h4 className="font-bold text-lg text-slate-800">
                      {transaction.planName || "Subscription Plan"}
                    </h4>

                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500">
                      <span className="flex items-center gap-2">
                        <Calendar size={14} />
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </span>

                      <span className="flex items-center gap-2 text-green-600">
                        <CheckCircle size={14} />
                        Paid
                      </span>
                    </div>

                    {transaction.razorpay_payment_id && (
                      <p className="text-xs text-slate-400 mt-2 break-all">
                        Payment ID : {transaction.razorpay_payment_id}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right */}

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="text-left sm:text-right">
                    <p className="text-slate-500 text-sm">Amount Paid</p>

                    <h3 className="text-2xl font-bold text-[#511D43]">
                      ₹{Number(transaction.amount || 0).toLocaleString()}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleDownloadInvoice(transaction._id)}
                    className="
                      flex
                      items-center
                      gap-2
                      px-5
                      py-3
                      rounded-xl
                      bg-gradient-to-r
                      from-[#511D43]
                      to-[#901E3E]
                      text-white
                      font-medium
                      hover:shadow-lg
                      transition-all
                    "
                  >
                    <Download size={18} />
                    Invoice
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BillingHistory;
