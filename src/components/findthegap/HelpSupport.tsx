import React from 'react';
import { HelpCircle, Book, MessageCircle, Video, ExternalLink } from 'lucide-react';

const HelpSupport: React.FC = () => {
  const resources = [
    {
      title: 'Documentation',
      description: 'Comprehensive guides and tutorials',
      icon: Book,
      link: '#'
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      icon: Video,
      link: '#'
    },
    {
      title: 'Live Chat Support',
      description: 'Get help from our support team',
      icon: MessageCircle,
      link: '#'
    },
    {
      title: 'Knowledge Base',
      description: 'Find answers to common questions',
      icon: HelpCircle,
      link: '#'
    }
  ];

  const faqs = [
    {
      question: 'How do I import my financial data?',
      answer: 'You can import your financial data by uploading a CSV file or connecting your accounting software through our integrations.'
    },
    {
      question: 'How often is the data updated?',
      answer: 'Data is updated in real-time when changes are made. Automated reports can be scheduled daily, weekly, or monthly.'
    },
    {
      question: 'Can I export my analysis results?',
      answer: 'Yes, you can export your analysis results in various formats including PDF, Excel, and CSV.'
    },
    {
      question: 'How secure is my financial data?',
      answer: 'We use industry-standard encryption and security measures to protect your data. All information is stored securely and backed up regularly.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Help Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <a
              key={index}
              href={resource.link}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{resource.title}</h3>
                  <p className="text-sm text-gray-500">{resource.description}</p>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900">{faq.question}</h3>
              <p className="text-sm text-gray-600 mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Contact Support</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="How can we help?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Describe your issue..."
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Additional Resources */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="#"
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div>
              <h3 className="font-medium text-gray-900">API Documentation</h3>
              <p className="text-sm text-gray-500">Access our API documentation</p>
            </div>
            <ExternalLink className="w-5 h-5 text-gray-400" />
          </a>
          <a
            href="#"
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div>
              <h3 className="font-medium text-gray-900">Community Forum</h3>
              <p className="text-sm text-gray-500">Join discussions with other users</p>
            </div>
            <ExternalLink className="w-5 h-5 text-gray-400" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;