import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Sidebar } from "../components/sidebar";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  ArrowLeft,
  FileText,
  Copy,
  Check,
  Download,
} from "lucide-react";

export function ResultPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Simulated file metadata (In production, fetch this via id)
  const fileMeta = {
    name: "patient_form_01.pdf", // swap with "patient_form_01.png" to test image preview
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", // Demo PDF URL
    // url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000", // Demo Image URL
    uploadedAt: "29 May 2026",
    size: "1.2 MB",
  };

  const isPdf = fileMeta.name.toLowerCase().endsWith(".pdf");

  const [extractedData, setExtractedData] = useState<Record<string, string>>({
    name: "Darshan Kumar",
    email: "darshan@example.com",
    disease: "Type 2 Diabetes",
    dob: "12 March 1995",
  });

  const handleCopyField = (field: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(extractedData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `patient_data_${id || "extract"}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleSaveToDatabase = async () => {
    try {
      setSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleFieldChange = (key: string, value: string) => {
    setExtractedData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="flex min-h-screen" style={{ background: "#F8FAFC" }}>
      <Sidebar />

      <div className="flex-1 lg:ml-64 p-4 md:p-8 flex flex-col h-screen overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            onClick={() => navigate("/dashboard")}
            variant="ghost"
            className="mb-3 px-0 text-slate-500 hover:text-slate-900 hover:bg-transparent transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </Button>

          <h1 className="tracking-tight" style={{ fontSize: "28px", fontWeight: "700", color: "#0F172A" }}>
            Extracted Results
          </h1>
        </div>

        {/* File Quick Info Card */}
        <div
          className="bg-white rounded-2xl p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-slate-200/60"
          style={{ boxShadow: "0 4px 20px -2px rgba(15, 23, 42, 0.04)" }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-100 text-slate-600">
              <FileText size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#0F172A" }}>
                {fileMeta.name}
              </h3>
              <p style={{ fontSize: "13px", color: "#64748B" }}>
                Uploaded {fileMeta.uploadedAt} · {fileMeta.size}
              </p>
            </div>
          </div>
          <Badge
            className="rounded-md px-2.5 py-1 font-medium border border-emerald-200/60 shadow-none pointer-events-none self-start md:self-auto"
            style={{ background: "#F0FDF4", color: "#166534", fontSize: "12px" }}
          >
            Extraction Complete
          </Badge>
        </div>

        {/* Two Column Workspace Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-[500px] items-stretch pb-6">
          
          {/* LEFT PANEL: Interactive File Document Preview */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col">
            <div 
              className="bg-white rounded-3xl p-4 border border-slate-200/60 flex-1 flex flex-col overflow-hidden min-h-[450px] lg:min-h-0"
              style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.03)" }}
            >
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-3 block">
                Original Document Preview
              </span>
              
              <div className="bg-slate-100 rounded-2xl flex-1 overflow-hidden relative flex items-center justify-center border border-slate-200/50">
                {isPdf ? (
                  /* Interactive PDF Embedded Viewer */
                  <object
                    data={`${fileMeta.url}#toolbar=1&navpanes=0&scrollbar=1`}
                    type="application/pdf"
                    className="w-full h-full rounded-2xl"
                  >
                    {/* Fallback frame if object tag isn't supported completely */}
                    <iframe
                      src={`${fileMeta.url}#toolbar=1`}
                      className="w-full h-full border-none rounded-2xl"
                      title="PDF Preview"
                    />
                  </object>
                ) : (
                  /* High Quality Zoomable/Fluid Image Component Preview */
                  <img
                    src={fileMeta.url}
                    alt="Original Uploaded Source"
                    className="max-w-full max-h-full object-contain rounded-2xl shadow-sm"
                  />
                )}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Clean Extracted Fields Form Dashboard */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col">
            <div
              className="bg-white rounded-3xl p-6 border border-slate-200/60 flex flex-col h-full"
              style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.03)" }}
            >
              <h2 className="mb-6 tracking-tight" style={{ fontSize: "20px", fontWeight: "600", color: "#0F172A" }}>
                Extracted Fields
              </h2>

              {/* Form Fields Stack (Scrollable if data overflows height limits) */}
              <div className="space-y-4 mb-6 flex-1 overflow-y-auto pr-1">
                {Object.entries(extractedData).map(([key, value]) => (
                  <div
                    key={key}
                    className="p-4 rounded-xl flex items-center gap-4 bg-slate-50/50 border border-slate-200/60 focus-within:border-slate-400 transition-colors"
                  >
                    <div className="flex-1">
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#94A3B8",
                          marginBottom: "4px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {key}
                      </div>

                      <input
                        value={value}
                        onChange={(e) => handleFieldChange(key, e.target.value)}
                        className="w-full outline-none bg-transparent"
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#0F172A",
                        }}
                      />
                    </div>

                    <button
                      onClick={() => handleCopyField(key, value)}
                      className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all"
                      style={{
                        background: copiedField === key ? "#F0FDF4" : "#FFFFFF",
                        borderColor: copiedField === key ? "#BBF7D0" : "#E2E8F0",
                      }}
                    >
                      {copiedField === key ? (
                        <Check size={14} color="#166534" />
                      ) : (
                        <Copy size={14} className="text-slate-400 hover:text-slate-600" />
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {/* Action Footer Triggers */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-auto">
                <Button
                  onClick={handleExportJson}
                  variant="outline"
                  className="h-11 px-5 rounded-xl text-slate-700 font-medium border-slate-200 hover:bg-slate-50 w-full sm:w-auto transition-colors"
                >
                  <Download size={16} className="mr-2 text-slate-500" />
                  Copy all data 
                </Button>

                <Button
                  onClick={handleSaveToDatabase}
                  disabled={saving}
                  className="h-11 px-6 rounded-xl text-white font-medium shadow-sm w-full sm:w-auto transition-all hover:opacity-95"
                  style={{
                    background: saved ? "#15803D" : "#10B981",
                  }}
                >
                  {saving ? (
                    "Syncing Records..."
                  ) : saved ? (
                    <>
                      <Check size={16} className="mr-2" />
                      Saved Successfully
                    </>
                  ) : (
                    "Save To Database"
                  )}
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}