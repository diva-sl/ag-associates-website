import {
  Upload,
  FileText,
  Image as ImageIcon,
  Trash2,
  Eye,
  Download,
  FileCheck,
} from "lucide-react";

import Lottie from "lottie-react";

import SuccessAnimation from "../../assets/lottie/Success.json";
import PendingAnimation from "../../assets/lottie/pending.json";
import FailedAnimation from "../../assets/lottie/Failed Status.json";
import UploadingAnimation from "../../assets/lottie/Uploading.json";

const DocumentsSection = ({
  documents,
  handleDocumentUpload,
  deleteDocument,
  handleDownloadDocument,
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
      {/* Header */}

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-[#511D43]">Documents Center</h3>

        <p className="text-slate-500 mt-1">
          Upload and manage your tax, GST and compliance documents.
        </p>
      </div>

      {/* Upload Cards */}

      <div className="grid md:grid-cols-3 gap-5 mb-10">
        <UploadCard
          title="PAN Card"
          subtitle="Upload PAN Document"
          onChange={(e) => handleDocumentUpload(e, "PAN_CARD")}
        />

        <UploadCard
          title="Aadhaar Card"
          subtitle="Upload Aadhaar Document"
          onChange={(e) => handleDocumentUpload(e, "AADHAAR_CARD")}
        />

        <UploadCard
          title="GST Certificate"
          subtitle="Upload GST Document"
          onChange={(e) => handleDocumentUpload(e, "GST_CERTIFICATE")}
        />

        <UploadCard
          title="Income Tax Return"
          subtitle="Upload ITR"
          onChange={(e) => handleDocumentUpload(e, "ITR")}
        />

        <UploadCard
          title="Other Documents"
          subtitle="Upload Supporting Files"
          onChange={(e) => handleDocumentUpload(e, "OTHER")}
        />
      </div>

      {/* Empty State */}

      {documents?.length === 0 && (
        <div className="border-2 border-dashed border-slate-300 rounded-3xl py-16 text-center">
          <FileCheck size={48} className="mx-auto text-slate-300 mb-4" />

          <h4 className="font-semibold text-lg">No Documents Uploaded</h4>

          <p className="text-slate-500 mt-2">
            Upload your first document to get started.
          </p>
        </div>
      )}

      {/* Documents Grid */}

      {documents?.length > 0 && (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {documents.map((doc) => {
            // const isImage = /\.(jpg|jpeg|png|webp)$/i.test(doc?.fileUrl || "");
            const isImage = doc?.mimeType?.startsWith("image/");

            const isPdf = doc?.mimeType === "application/pdf";

            return (
              <div
                key={doc._id}
                className="
                  bg-slate-50
                  border
                  border-slate-200
                  rounded-3xl
                  overflow-hidden
                  hover:shadow-lg
                  transition-all
                "
              >
                {/* Preview */}

                <div className="h-48 bg-slate-100 overflow-hidden">
                  {isImage ? (
                    <img
                      src={doc.fileUrl}
                      alt={doc.fileName}
                      className="w-full h-full object-cover"
                    />
                  ) : isPdf ? (
                    <iframe
                      src={doc.fileUrl}
                      title={doc.fileName}
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center">
                      <FileText size={48} className="text-[#901E3E]" />

                      <span className="text-sm mt-2 text-slate-500">
                        {doc.fileName}
                      </span>
                    </div>
                  )}
                </div>
                {/* Content */}

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span
                      className="
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        bg-[#901E3E]/10
                        text-[#901E3E]
                      "
                    >
                      {doc.type}
                    </span>

                    {/* <span className="text-xs text-slate-400">Uploaded</span> */}
                    {/* <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        doc.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : doc.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {doc.status}
                      
                    </span> */}
                    <DocumentStatus status={doc.status} />
                  </div>

                  <p className="mt-4 text-sm text-slate-500">
                    AG & Associates Secure Document
                  </p>

                  {/* Actions */}

                  <div className="flex gap-2 mt-5">
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex-1
                        flex
                        items-center
                        justify-center
                        gap-2
                        py-2
                        rounded-xl
                        bg-[#511D43]
                        text-white
                        text-sm
                        font-medium
                        hover:bg-[#3f1735]
                        transition
                      "
                    >
                      <Eye size={16} />
                      View
                    </a>
                    <button
                      onClick={() => handleDownloadDocument(doc._id)}
                      className="
    w-11
    h-11
    rounded-xl
    border
    flex
    items-center
    justify-center
    hover:bg-slate-100
  "
                    >
                      <Download size={16} />
                    </button>
                    {doc.status !== "approved" && doc.status !== "pending" && (
                      <button
                        onClick={() => deleteDocument(doc._id)}
                        className="
                        w-11
                        h-11
                        rounded-xl
                        bg-red-50
                        text-red-600
                        hover:bg-red-100
                        flex
                        items-center
                        justify-center
                      "
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DocumentsSection;

/* ================= UPLOAD CARD ================= */

const UploadCard = ({ title, subtitle, onChange }) => (
  <label
    className="
      cursor-pointer
      border-2
      border-dashed
      border-slate-300
      rounded-3xl
      p-8
      text-center
      hover:border-[#901E3E]
      hover:bg-[#901E3E]/5
      transition-all
    "
  >
    <Upload size={36} className="mx-auto text-[#901E3E]" />

    <h4 className="font-semibold mt-4">{title}</h4>

    <p className="text-sm text-slate-500 mt-1">{subtitle}</p>

    <input hidden type="file" onChange={onChange} />
  </label>
);

const DocumentStatus = ({ status }) => {
  const statusConfig = {
    approved: {
      title: "Approved",
      text: "Document Verified",
      animation: SuccessAnimation,
      className:
        "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-700",
    },

    pending: {
      title: "Pending",
      text: "Under Review",
      animation: PendingAnimation,
      className:
        "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 text-amber-700",
    },

    rejected: {
      title: "Rejected",
      text: "Action Required",
      animation: FailedAnimation,
      className:
        "bg-gradient-to-r from-red-50 to-rose-50 border-red-200 text-red-700",
    },

    uploading: {
      title: "Uploading",
      text: "Please Wait",
      animation: UploadingAnimation,
      className:
        "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-700",
    },
  };

  const current = statusConfig[status?.toLowerCase()] || statusConfig.pending;

  return (
    <div
      className={`
        flex
        items-center
        gap-2
        rounded-2xl
        border
        px-3
        py-2
        ${current.className}
      `}
    >
      <div className="w-10 h-10 flex-shrink-0">
        <Lottie
          animationData={current.animation}
          loop={true}
          autoplay={true}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid meet",
          }}
        />
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide">
          {current.title}
        </p>

        <p className="text-[10px] opacity-80">{current.text}</p>
      </div>
    </div>
  );
};
