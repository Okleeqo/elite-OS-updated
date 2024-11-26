import { FinancialData } from '../context/FinancialContext';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export async function generateExecutiveReport(financials: FinancialData): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured. Please check your environment variables.');
  }

  try {
    const { actual, lastPeriod, budget } = financials;

    // Calculate key metrics
    const revenue = (actual.revenue || 0) + (actual.serviceRevenue || 0);
    const lastRevenue = (lastPeriod.revenue || 0) + (lastPeriod.serviceRevenue || 0);
    const budgetRevenue = (budget.revenue || 0) + (budget.serviceRevenue || 0);
    
    const revenueGrowth = ((revenue - lastRevenue) / lastRevenue) * 100;
    const revenueBudgetVar = ((revenue - budgetRevenue) / budgetRevenue) * 100;

    const grossProfit = revenue - (actual.cogs || 0);
    const lastGrossProfit = lastRevenue - (lastPeriod.cogs || 0);
    const grossMargin = (grossProfit / revenue) * 100;
    const lastGrossMargin = (lastGrossProfit / lastRevenue) * 100;

    const operatingExpenses = (actual.operatingExpenses || 0) + 
      (actual.marketingExpenses || 0) + 
      (actual.adminExpenses || 0) + 
      (actual.researchDevelopment || 0);

    const netIncome = grossProfit - operatingExpenses;
    const lastNetIncome = lastGrossProfit - ((lastPeriod.operatingExpenses || 0) + 
      (lastPeriod.marketingExpenses || 0) + 
      (lastPeriod.adminExpenses || 0) + 
      (lastPeriod.researchDevelopment || 0));
    
    const netIncomeGrowth = ((netIncome - lastNetIncome) / lastNetIncome) * 100;
    const netMargin = (netIncome / revenue) * 100;

    // Balance Sheet Analysis
    const currentAssets = (actual.cash || 0) + 
      (actual.accountsReceivable || 0) + 
      (actual.inventory || 0);
    const totalAssets = currentAssets + 
      (actual.buildings || 0) + 
      (actual.equipment || 0);
    
    const currentLiabilities = (actual.accountsPayable || 0) + 
      (actual.shortTermDebt || 0);
    const totalLiabilities = currentLiabilities + 
      (actual.longTermDebt || 0);
    
    const workingCapital = currentAssets - currentLiabilities;
    const currentRatio = currentAssets / currentLiabilities;
    const debtToEquity = totalLiabilities / (totalAssets - totalLiabilities);
    const returnOnEquity = (netIncome / (totalAssets - totalLiabilities)) * 100;
    const returnOnAssets = (netIncome / totalAssets) * 100;

    const prompt = `
Generate a 500-word executive report as a Chief Financial Officer (CFO). The report MUST follow this EXACT structure with these EXACT section headings:

1. Financial Overview
- Provide a thorough analysis of our current financial position using these metrics:
  - Revenue: ${formatCurrency(revenue)} (${revenueGrowth > 0 ? '+' : ''}${revenueGrowth.toFixed(1)}% YoY)
  - Net Income: ${formatCurrency(netIncome)} (${netIncomeGrowth > 0 ? '+' : ''}${netIncomeGrowth.toFixed(1)}% YoY)
  - Gross Margin: ${grossMargin.toFixed(1)}% (${(grossMargin - lastGrossMargin).toFixed(1)}pp change)
  - Net Margin: ${netMargin.toFixed(1)}%
  - Return on Equity: ${returnOnEquity.toFixed(1)}%
  - Return on Assets: ${returnOnAssets.toFixed(1)}%
  - Working Capital: ${formatCurrency(workingCapital)}
  - Current Ratio: ${currentRatio.toFixed(2)}x
  - Debt-to-Equity: ${debtToEquity.toFixed(2)}x
  - Budget Variance: ${revenueBudgetVar > 0 ? '+' : ''}${revenueBudgetVar.toFixed(1)}% vs budget

2. Strategic CFO Initiatives
- Detail current and upcoming strategic initiatives
- Include specific objectives and timelines
- Outline expected outcomes
- Explain alignment with organizational goals
- Describe performance optimization strategies

3. Recommendations
Risk Analysis:
- Internal Factors:
  * Financial structure assessment
  * Operational efficiency evaluation
  * Resource allocation review
  * Cost management strategies

- External Factors:
  * Market conditions impact
  * Competitive landscape analysis
  * Economic indicators review
  * Industry trends evaluation

Risk Mitigation:
- Strategic adjustments needed
- Operational improvements required
- Financial optimization steps
- Contingency planning measures

CRITICAL REQUIREMENTS:
1. MUST include all three sections with EXACT headings
2. Each section MUST be clearly separated
3. Use professional, CFO-level language
4. Provide specific, actionable insights
5. Focus on strategic implications
6. Include data-driven analysis
7. Maintain consistent executive tone
8. Ensure recommendations are practical and implementable

Format each section with clear headings and bullet points where appropriate. The report must be suitable for board-level presentation.`;

    try {
      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo-preview',
          messages: [
            {
              role: 'system',
              content: 'You are a Fortune 500 CFO with extensive experience in financial analysis and strategic planning. You MUST follow the exact report structure provided and include ALL requested sections. Your analysis must be thorough, professional, and actionable, suitable for board-level presentation. Never omit any sections or deviate from the required format.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.5,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || 
          `API request failed with status ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      
      if (!data.choices?.[0]?.message?.content) {
        throw new Error('Invalid response format from OpenAI API');
      }

      const report = data.choices[0].message.content.trim();

      // Verify all sections are present
      const requiredSections = [
        '1. Financial Overview',
        '2. Strategic CFO Initiatives',
        '3. Recommendations'
      ];

      const missingSection = requiredSections.find(section => 
        !report.includes(section)
      );

      if (missingSection) {
        throw new Error(`Invalid report format: Missing required section "${missingSection}"`);
      }

      return report
        .replace(/\*\*/g, '')
        .replace(/"/g, '')
        .trim();

    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to OpenAI API. Please check your internet connection.');
      }
      throw error;
    }

  } catch (error) {
    console.error('Error generating report:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('Configuration error: OpenAI API key is missing or invalid. Please check your settings.');
      }
      if (error.message.includes('Network error')) {
        throw new Error('Connection error: Unable to reach OpenAI servers. Please check your internet connection.');
      }
      if (error.message.includes('Invalid report format')) {
        throw new Error('The generated report did not meet the required format. Please try again.');
      }
      throw new Error(`Failed to generate financial report: ${error.message}`);
    }
    
    throw new Error('An unexpected error occurred while generating the report. Please try again.');
  }
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}