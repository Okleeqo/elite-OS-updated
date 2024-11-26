export const generateGoalPrompt = (gaps: string) => `
As a seasoned Fortune 500 CFO with extensive experience in strategic financial advisory, analyze these business gaps and generate specific, measurable financial goals:

"${gaps}"

Generate 10 SMART financial goals that:
1. Are specific to the identified gaps
2. Include measurable financial metrics
3. Are realistically achievable
4. Are relevant to business growth
5. Have clear timelines

Format your response as a JSON array of objects with this structure:
[
  {
    "goal": "The SMART goal statement",
    "metrics": ["List of 3-5 specific success metrics"],
    "timeline": "Specific timeframe for achievement"
  }
]

Requirements:
1. Each goal must be specific and actionable
2. Include 3-5 measurable metrics per goal
3. Metrics must be quantifiable and trackable
4. Timeline must be specific and realistic
5. Focus on strategic financial impact
6. Demonstrate Fortune 500 CFO-level thinking
7. Ensure goals are aligned with industry best practices
8. Include a mix of short-term and long-term objectives
9. Consider both financial and operational metrics
10. Align with standard financial reporting periods
`;

export const generateActionsPrompt = (goals: string) => `
As a seasoned Fortune 500 CFO with extensive experience in strategic financial advisory, analyze the following goals and generate specific, actionable steps:

"${goals}"

Generate 10 strategic actions that:
1. Are specific and implementable
2. Have clear, measurable outcomes
3. Align with financial advisory best practices
4. Focus on practical implementation

Format your response as a JSON array of objects with this structure:
[
  {
    "action": "Clear action statement",
    "description": "Detailed implementation description",
    "expectedOutcome": "Specific expected result with measurable metrics"
  }
]

Requirements:
1. Each action must be specific and actionable
2. Include detailed implementation steps in the description
3. Expected outcomes must be measurable and quantifiable
4. Focus on strategic financial impact
5. Demonstrate Fortune 500 CFO-level thinking
`;

export const generateStrategiesPrompt = (action: string, parameters: {
  frequency: string;
  deliveryMethod: string;
  tools: string[];
}) => `
As a seasoned Fortune 500 CFO with extensive experience in strategic financial advisory, analyze and develop implementation strategies for the following action:

"${action}"

Generate 3 sophisticated implementation strategies that:
1. Are aligned with ${parameters.frequency} delivery frequency
2. Can be delivered via ${parameters.deliveryMethod}
3. Utilize ONLY these specific tools: ${parameters.tools.join(', ')}

Format your response as a JSON array of objects with this structure:
[
  {
    "strategy": "Strategy name",
    "description": "Detailed strategy description",
    "metrics": ["3 specific success metrics"],
    "tools": ["Required tools from the provided list ONLY"],
    "implementation": [
      "Detailed step using GoalPilot for goal-seek analysis",
      "Specific step using ForecastIQ for forecasting",
      "Step utilizing CEO dashboard for KPI tracking",
      "Step employing MarketPulse for performance analysis",
      "Concrete step using FindtheGAP for gap analysis"
    ]
  }
]

Requirements for each strategy:
1. Use ONLY tools from the provided list
2. Include SPECIFIC implementation steps for EACH tool used
3. Each implementation step must detail HOW the tool is used
4. Implementation steps must be sequential and build upon each other
5. Each tool's purpose must align with its specific capability
6. Each implementation step must be actionable and specific
7. Include exactly 3 measurable metrics per strategy
8. Ensure all steps are compatible with the delivery method
9. Implementation timeline should align with the frequency
10. Focus on practical, real-world application of each tool
`;