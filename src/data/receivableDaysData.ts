export const receivableDaysActions = [
  {
    id: 'payment-history',
    name: 'Analyze Individual Customer Payment History',
    strategies: [
      {
        id: 'late-payers',
        name: 'Identify Late-Paying Customers',
        description: 'Use the Financial Health Check-up tool.'
      },
      {
        id: 'payment-segmentation',
        name: 'Segment Customers Based on Payment Behavior',
        description: 'Categorize customers to tailor collection strategies.'
      },
      {
        id: 'credit-control',
        name: 'Implement Targeted Credit Control Measures',
        description: 'Focus collection efforts on high-risk accounts.'
      }
    ]
  },
  {
    id: 'credit-policies',
    name: 'Review Credit Policies',
    strategies: [
      {
        id: 'update-policies',
        name: 'Update Credit Policies and Terms',
        description: 'Utilize the Credit Policy Template to establish clear terms.'
      },
      {
        id: 'communicate-changes',
        name: 'Communicate Policy Changes to Customers',
        description: 'Ensure customers are aware of new credit terms and conditions.'
      },
      {
        id: 'strengthen-checks',
        name: 'Strengthen Credit Checks',
        description: 'Tighten approval processes for new customers to reduce credit risk.'
      }
    ]
  },
  {
    id: 'credit-card-payments',
    name: 'Consider Accepting Credit Card Payments',
    strategies: [
      {
        id: 'processing-systems',
        name: 'Set Up Credit Card Processing Systems',
        description: 'Enable customers to pay via credit card for faster payments.'
      },
      {
        id: 'merchant-fees',
        name: 'Negotiate Merchant Fees',
        description: 'Reduce transaction costs associated with credit card payments.'
      },
      {
        id: 'promote-options',
        name: 'Promote Credit Card Payment Options',
        description: 'Encourage customers to use credit cards through incentives.'
      }
    ]
  },
  {
    id: 'electronic-invoices',
    name: 'Generate Electronic Invoices for Faster Payment',
    strategies: [
      {
        id: 'e-invoicing',
        name: 'Implement E-Invoicing Solutions',
        description: 'Streamline invoicing with electronic delivery.'
      },
      {
        id: 'invoice-automation',
        name: 'Use Invoice Automation Templates',
        description: 'Standardize invoices for consistency and efficiency.'
      },
      {
        id: 'payment-reminders',
        name: 'Set Up Automated Payment Reminders',
        description: 'Ensure timely follow-up on outstanding invoices.'
      }
    ]
  },
  {
    id: 'collections-management',
    name: 'Assign an Employee to Manage Collections',
    strategies: [
      {
        id: 'collections-specialist',
        name: 'Designate a Dedicated Collections Specialist',
        description: 'Focus on reducing overdue accounts.'
      },
      {
        id: 'specialized-training',
        name: 'Provide Specialized Training',
        description: 'Use the Collections Training Guide to improve skills.'
      },
      {
        id: 'performance-incentives',
        name: 'Implement Performance Incentives',
        description: 'Motivate effective collections through rewards.'
      }
    ]
  }
];