import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type Employee } from "@shared/schema";
import { generateSingleEmployeePDF, downloadPDF } from "@/lib/pdf-generator";
import { Eye, Download } from "lucide-react";

interface PDFPreviewModalProps {
  employee: Employee;
  children: React.ReactNode;
}

export function PDFPreviewModal({ employee, children }: PDFPreviewModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = () => {
    const pdf = generateSingleEmployeePDF(employee);
    downloadPDF(pdf, `employee-${employee.fullName.replace(/\s+/g, '-').toLowerCase()}.pdf`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-slate-900 border-white/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Employee Profile Preview
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-4">
          {/* Header */}
          <div className="bg-primary/20 rounded-lg p-6 border border-primary/30">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center font-bold text-2xl text-slate-900">
                {employee.fullName.split(" ").map(name => name[0]).join("").toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{employee.fullName}</h2>
                <p className="text-primary font-medium">{employee.designation}</p>
                <p className="text-gray-400 text-sm">{employee.department} • {employee.location}</p>
              </div>
            </div>
          </div>

          {/* Employee Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="font-semibold text-white mb-2">Basic Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Employee ID:</span>
                  <span className="text-white">{employee.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Employer ID:</span>
                  <span className="text-white">{employee.employerId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date of Joining:</span>
                  <span className="text-white">{employee.dateOfJoining}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="font-semibold text-white mb-2">Contact Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white text-xs">{employee.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Phone:</span>
                  <span className="text-white">{employee.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location:</span>
                  <span className="text-white">{employee.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleDownload}
              className="flex-1 bg-gradient-to-r from-primary to-primary/80 text-slate-900 font-semibold hover:scale-105 transition-transform"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="bg-white/10 border-white/20 hover:bg-white/20 text-white"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}