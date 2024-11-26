import { read, utils, write } from 'xlsx';

interface FinancialData {
  // Income Statement
  revenue: number;
  serviceRevenue: number;
  cogs: number;
  operatingExpenses: number;
  marketingExpenses: number;
  adminExpenses: number;
  researchDevelopment: number;
  interestExpense: number;
  otherIncome: number;
  otherExpenses: number;

  // Balance Sheet
  cash: number;
  accountsReceivable: number;
  inventory: number;
  prepaidExpenses: number;
  buildings: number;
  equipment: number;
  accountsPayable: number;
  shortTermDebt: number;
  longTermDebt: number;
  commonStock: number;
  retainedEarnings: number;

  // Working Capital Metrics
  receivableDays: number;
  inventoryDays: number;
  payableDays: number;
}

const templateStructure = [
  ['Financial Data Template', ''],
  ['', ''],
  ['Income Statement', 'Amount'],
  ['Revenue', ''],
  ['Service Revenue', ''],
  ['Cost of Goods Sold', ''],
  ['Operating Expenses', ''],
  ['Marketing Expenses', ''],
  ['Admin Expenses', ''],
  ['Research & Development', ''],
  ['Interest Expense', ''],
  ['Other Income', ''],
  ['Other Expenses', ''],
  ['', ''],
  ['Balance Sheet', 'Amount'],
  ['Cash', ''],
  ['Accounts Receivable', ''],
  ['Inventory', ''],
  ['Prepaid Expenses', ''],
  ['Buildings', ''],
  ['Equipment', ''],
  ['Accounts Payable', ''],
  ['Short Term Debt', ''],
  ['Long Term Debt', ''],
  ['Common Stock', ''],
  ['Retained Earnings', ''],
  ['', ''],
  ['Working Capital Metrics', 'Days'],
  ['Days Sales Outstanding', ''],
  ['Days Inventory Outstanding', ''],
  ['Days Payable Outstanding', '']
];

const fieldMappings: Record<string, keyof FinancialData> = {
  'Revenue': 'revenue',
  'Service Revenue': 'serviceRevenue',
  'Cost of Goods Sold': 'cogs',
  'Operating Expenses': 'operatingExpenses',
  'Marketing Expenses': 'marketingExpenses',
  'Admin Expenses': 'adminExpenses',
  'Research & Development': 'researchDevelopment',
  'Interest Expense': 'interestExpense',
  'Other Income': 'otherIncome',
  'Other Expenses': 'otherExpenses',
  'Cash': 'cash',
  'Accounts Receivable': 'accountsReceivable',
  'Inventory': 'inventory',
  'Prepaid Expenses': 'prepaidExpenses',
  'Buildings': 'buildings',
  'Equipment': 'equipment',
  'Accounts Payable': 'accountsPayable',
  'Short Term Debt': 'shortTermDebt',
  'Long Term Debt': 'longTermDebt',
  'Common Stock': 'commonStock',
  'Retained Earnings': 'retainedEarnings',
  'Days Sales Outstanding': 'receivableDays',
  'Days Inventory Outstanding': 'inventoryDays',
  'Days Payable Outstanding': 'payableDays'
};

export const downloadTemplate = () => {
  const ws = utils.aoa_to_sheet(templateStructure);
  
  // Set column widths
  ws['!cols'] = [{ wch: 30 }, { wch: 15 }];
  
  // Style headers
  ws['A1'] = { v: 'Financial Data Template', s: { font: { bold: true, sz: 14 } } };
  ws['A3'] = { v: 'Income Statement', s: { font: { bold: true } } };
  ws['B3'] = { v: 'Amount', s: { font: { bold: true } } };
  ws['A15'] = { v: 'Balance Sheet', s: { font: { bold: true } } };
  ws['B15'] = { v: 'Amount', s: { font: { bold: true } } };
  ws['A28'] = { v: 'Working Capital Metrics', s: { font: { bold: true } } };
  ws['B28'] = { v: 'Days', s: { font: { bold: true } } };

  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Financial Data');
  
  const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { 
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
  });
  
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'financial_data_template.xlsx';
  link.click();
  window.URL.revokeObjectURL(url);
};

export const parseExcelFile = (file: File): Promise<FinancialData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        if (!e.target?.result) {
          throw new Error('Failed to read file');
        }

        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = read(data, { type: 'array' });
        
        if (!workbook.SheetNames.length) {
          throw new Error('No sheets found in the Excel file');
        }

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

        const financialData: Partial<FinancialData> = {};

        // Process each row and extract values
        rows.forEach(row => {
          if (!Array.isArray(row) || row.length < 2) return;
          
          const label = String(row[0]).trim();
          const value = row[1];

          // Find matching field from mappings
          const field = fieldMappings[label];
          if (field) {
            const numValue = typeof value === 'number' ? value : Number(value);
            if (!isNaN(numValue)) {
              financialData[field] = numValue;
            }
          }
        });

        // Ensure all fields have a value
        Object.keys(fieldMappings).forEach(key => {
          const field = fieldMappings[key];
          if (!(field in financialData)) {
            financialData[field] = 0;
          }
        });

        resolve(financialData as FinancialData);
      } catch (error) {
        console.error('Excel parsing error:', error);
        reject(new Error('Please ensure you are using the correct template format and all values are numbers.'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read the Excel file. Please try again.'));
    };
    
    reader.readAsArrayBuffer(file);
  });
};

export const exportFinancialData = (data: FinancialData) => {
  const ws = utils.aoa_to_sheet(templateStructure);
  
  // Fill in the values
  Object.entries(fieldMappings).forEach(([label, field]) => {
    const rowIndex = templateStructure.findIndex(row => row[0] === label);
    if (rowIndex !== -1) {
      const cell = utils.encode_cell({ r: rowIndex, c: 1 });
      ws[cell] = { v: data[field], t: 'n' };
    }
  });

  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Financial Data');
  
  const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { 
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
  });
  
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'financial_data_export.xlsx';
  link.click();
  window.URL.revokeObjectURL(url);
};