import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Building2, Download, FileText, Eye } from "lucide-react";
import { PDFPreviewModal } from "@/components/pdf-preview-modal";
import { useToast } from "@/hooks/use-toast";
import { useCardAnimation, useSplitText, useMagneticButton } from "@/hooks/use-gsap";
import { generateEmployeePDF, generateSingleEmployeePDF, downloadPDF } from "@/lib/pdf-generator";
import { type Employee } from "@shared/schema";

export function EmployeeCards() {
  const { data: employees, isLoading, error } = useQuery<Employee[]>({
    queryKey: ["/api/employees"],
  });

  const { toast } = useToast();
  const titleRef = useSplitText("Our Team");
  const downloadAllRef = useMagneticButton();
  const cardsRef = useCardAnimation([employees?.length]);

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map(name => name[0])
      .join("")
      .toUpperCase();
  };

  const getDepartmentStats = () => {
    if (!employees) return { total: 0, departments: 0 };
    const deptSet = new Set(employees.map(emp => emp.department));
    return {
      total: employees.length,
      departments: deptSet.size,
    };
  };

  const stats = getDepartmentStats();

  const handleDownloadAll = () => {
    if (!employees || employees.length === 0) {
      return toast({
        title: "No Data",
        description: "No employees to download",
        variant: "destructive",
      });
    }

    try {
      const pdf = generateEmployeePDF(employees);
      downloadPDF(pdf, `employees-${new Date().toISOString().split("T")[0]}.pdf`);
      toast({ title: "Downloaded", description: "All employee profiles downloaded" });
    } catch (e) {
      toast({ title: "Error", description: "PDF generation failed", variant: "destructive" });
    }
  };

  const handleDownloadSingle = (employee: Employee) => {
    try {
      const pdf = generateSingleEmployeePDF(employee);
      downloadPDF(pdf, `employee-${employee.fullName.replace(/\s+/g, '-').toLowerCase()}.pdf`);
      toast({ title: "Success", description: `${employee.fullName}'s PDF downloaded` });
    } catch (e) {
      toast({ title: "Error", description: "PDF download failed", variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-white/5 border border-white/10 rounded-lg p-6">
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-32" />
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-white/5 border border-white/10 rounded-lg p-6 text-center">
        <CardContent>
          <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-12 h-12 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Error Loading Employees</h3>
          <p className="text-gray-400">Try refreshing the page.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="bg-[#0A0F1C] border border-white/10 rounded-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 ref={titleRef} className="text-3xl font-bold text-white">Our Team</h2>
            {employees?.length > 0 && (
              <Button
                ref={downloadAllRef}
                onClick={handleDownloadAll}
                className="bg-[#56DFCF] text-black hover:opacity-90"
              >
                <Download className="w-4 h-4 mr-2" />
                Download All PDF
              </Button>
            )}
          </div>

          <div ref={cardsRef} className="space-y-6">
            {employees.map(employee => (
              <div
                key={employee.id}
                className="rounded-xl bg-[#56DFCF]/10 hover:bg-[#56DFCF]/20 p-6 border border-white/10 shadow-lg transition-transform hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#56DFCF] text-black rounded-full flex items-center justify-center font-bold text-lg">
                    {getInitials(employee.fullName)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-lg font-semibold">{employee.fullName}</h3>
                    <p className="text-[#56DFCF] font-medium">{employee.designation}</p>
                    <p className="text-sm text-gray-300 mt-1">
                      {employee.department} • {employee.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <PDFPreviewModal employee={employee}>
                      <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white">
                        <Eye className="w-4 h-4 mr-1" /> View
                      </Button>
                    </PDFPreviewModal>
                    <Button
                      size="sm"
                      onClick={() => handleDownloadSingle(employee)}
                      className="bg-white/20 hover:bg-white/30 text-white"
                    >
                      <FileText className="w-4 h-4 mr-1" /> PDF
                    </Button>
                    <div className="flex flex-col items-center ml-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs text-gray-400">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-[#0A0F1C] border border-white/10 text-center text-white">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-[#56DFCF] mb-2">{stats.total}</div>
            <div className="text-sm text-gray-400 flex items-center justify-center gap-2">
              <Users className="w-4 h-4" /> Total Employees
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#0A0F1C] border border-white/10 text-center text-white">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-[#56DFCF] mb-2">{stats.departments}</div>
            <div className="text-sm text-gray-400 flex items-center justify-center gap-2">
              <Building2 className="w-4 h-4" /> Departments
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
