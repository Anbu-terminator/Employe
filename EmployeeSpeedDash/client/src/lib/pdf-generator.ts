import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { type Employee } from '@shared/schema';

export const generateEmployeePDF = (employees: Employee[]) => {
  const doc = new jsPDF();
  
  // Add header with logo area
  doc.setFillColor(86, 223, 207); // #56DFCF
  doc.rect(0, 0, 210, 25, 'F');
  
  // Company title
  doc.setTextColor(20, 25, 31); // Dark text on light background
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('CRYS TECH EMPLOYEE DASHBOARD', 105, 16, { align: 'center' });
  
  // Subtitle
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Employee Directory Report', 105, 21, { align: 'center' });
  
  // Reset text color for body
  doc.setTextColor(0, 0, 0);
  
  // Add generation date and stats
  const currentDate = new Date().toLocaleDateString();
  doc.setFontSize(10);
  doc.text(`Generated on: ${currentDate}`, 14, 35);
  doc.text(`Total Employees: ${employees.length}`, 14, 42);
  
  // Department stats
  const departmentSet = new Set(employees.map(emp => emp.department));
  const departments = Array.from(departmentSet);
  doc.text(`Departments: ${departments.length}`, 14, 49);
  
  // Prepare table data
  const tableData = employees.map(emp => [
    emp.id.toString(),
    emp.employerId,
    emp.fullName,
    emp.department,
    emp.designation,
    emp.location,
    emp.email,
    emp.phone,
    emp.dateOfJoining
  ]);
  
  // Generate table
  autoTable(doc, {
    head: [['ID', 'Employer ID', 'Full Name', 'Department', 'Designation', 'Location', 'Email', 'Phone', 'Joining Date']],
    body: tableData,
    startY: 60,
    styles: {
      fontSize: 8,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [86, 223, 207], // #56DFCF
      textColor: [20, 25, 31],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    columnStyles: {
      0: { cellWidth: 15 }, // ID
      1: { cellWidth: 20 }, // Employer ID
      2: { cellWidth: 35 }, // Name
      3: { cellWidth: 25 }, // Department
      4: { cellWidth: 30 }, // Designation
      5: { cellWidth: 25 }, // Location
      6: { cellWidth: 40 }, // Email
      7: { cellWidth: 25 }, // Phone
      8: { cellWidth: 25 }, // Date
    },
    margin: { top: 60, left: 14, right: 14 },
  });
  
  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Page ${i} of ${pageCount} - CRYS TECH Employee Management System`,
      105,
      290,
      { align: 'center' }
    );
  }
  
  return doc;
};

export const generateSingleEmployeePDF = (employee: Employee) => {
  const doc = new jsPDF();
  
  // Add header
  doc.setFillColor(86, 223, 207);
  doc.rect(0, 0, 210, 25, 'F');
  
  doc.setTextColor(20, 25, 31);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('CRYS TECH EMPLOYEE PROFILE', 105, 16, { align: 'center' });
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  // Employee details
  let yPosition = 50;
  const lineHeight = 10;
  
  const details = [
    ['Employee ID:', employee.id.toString()],
    ['Employer ID:', employee.employerId],
    ['Full Name:', employee.fullName],
    ['Department:', employee.department],
    ['Designation:', employee.designation],
    ['Location:', employee.location],
    ['Email:', employee.email],
    ['Phone:', employee.phone],
    ['Date of Joining:', employee.dateOfJoining],
  ];
  
  details.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(label, 20, yPosition);
    
    doc.setFont('helvetica', 'normal');
    doc.text(value, 70, yPosition);
    
    yPosition += lineHeight;
  });
  
  // Add footer
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text(
    `Generated on ${new Date().toLocaleDateString()} - CRYS TECH Employee Management System`,
    105,
    290,
    { align: 'center' }
  );
  
  return doc;
};

export const downloadPDF = (doc: jsPDF, filename: string) => {
  doc.save(filename);
};