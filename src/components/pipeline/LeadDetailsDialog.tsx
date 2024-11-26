import React, { useState } from 'react';
import { X, DollarSign, Calendar, Building, Mail, Phone, Edit2, Save } from 'lucide-react';
import { usePipelineStore } from '../../stores/pipelineStore';

interface LeadDetailsDialogProps {
  leadId: string;
  onClose: () => void;
}

const LeadDetailsDialog: React.FC<LeadDetailsDialogProps> = ({ leadId, onClose }) => {
  const { getLead, updateLead } = usePipelineStore();
  const lead = getLead(leadId);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: lead?.title || '',
    client: lead?.client || '',
    value: lead?.value.toString() || '',
    dueDate: lead?.dueDate || '',
    email: lead?.email || '',
    phone: lead?.phone || '',
    notes: lead?.notes || ''
  });

  if (!lead) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateLead(leadId, {
      ...lead,
      title: formData.title,
      client: formData.client,
      value: parseFloat(formData.value) || 0,
      dueDate: formData.dueDate,
      email: formData.email,
      phone: formData.phone,
      notes: formData.notes
    });

    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-gray-800">Lead Details</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Edit2 className="w-5 h-5" />
              </button>
            )}
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lead Title
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <p className="text-gray-900">{lead.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Name
              </label>
              <div className="flex items-center">
                <Building className="w-5 h-5 text-gray-400 mr-2" />
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  />
                ) : (
                  <p className="text-gray-900">{lead.client}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Value
              </label>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
                {isEditing ? (
                  <input
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  />
                ) : (
                  <p className="text-gray-900">${lead.value.toLocaleString()}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                {isEditing ? (
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  />
                ) : (
                  <p className="text-gray-900">
                    {lead.dueDate ? new Date(lead.dueDate).toLocaleDateString() : 'Not set'}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  />
                ) : (
                  <p className="text-gray-900">{lead.email || 'Not provided'}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-400 mr-2" />
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  />
                ) : (
                  <p className="text-gray-900">{lead.phone || 'Not provided'}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            {isEditing ? (
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full p-2 border rounded-md"
                rows={4}
              />
            ) : (
              <p className="text-gray-900 whitespace-pre-wrap">
                {lead.notes || 'No notes added'}
              </p>
            )}
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LeadDetailsDialog;