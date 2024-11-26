import React, { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Plus, LayoutGrid, LayoutList, Trash2 } from 'lucide-react';
import { usePipelineStore } from '../../stores/pipelineStore';
import { useNotificationStore } from '../../stores/notificationStore';
import StageColumn from './StageColumn';
import AddLeadDialog from './AddLeadDialog';

const stages = [
  { id: 'warm-lead', title: 'Warm Lead', color: 'from-blue-400 to-blue-600' },
  { id: 'qualified', title: 'Qualified', color: 'from-indigo-400 to-indigo-600' },
  { id: 'discovery', title: 'Discovery Call', color: 'from-violet-400 to-violet-600' },
  { id: 'proposal', title: 'Proposal Sent', color: 'from-purple-400 to-purple-600' },
  { id: 'follow-up', title: 'Follow-Up', color: 'from-pink-400 to-pink-600' },
  { id: 'contract', title: 'Contract', color: 'from-orange-400 to-orange-600' },
  { id: 'lost', title: 'Lead Lost', color: 'from-red-400 to-red-600' },
  { id: 'won', title: 'Lead Won', color: 'from-green-400 to-green-600' }
];

const Pipeline = () => {
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { leads, moveLead, deleteLead, getTotalValue } = usePipelineStore();
  const addNotification = useNotificationStore((state) => state.addNotification);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const lead = leads.find(l => l.id === draggableId);
    if (!lead) return;

    moveLead(draggableId, destination.droppableId);

    // Add notification for stage change
    const sourceStage = stages.find(s => s.id === source.droppableId)?.title;
    const destStage = stages.find(s => s.id === destination.droppableId)?.title;

    let priority: 'low' | 'medium' | 'high' = 'medium';
    let title = 'Lead Stage Updated';

    if (destination.droppableId === 'won') {
      priority = 'high';
      title = 'Deal Won! 🎉';
    } else if (destination.droppableId === 'lost') {
      priority = 'high';
      title = 'Deal Lost';
    } else if (destination.droppableId === 'contract') {
      priority = 'high';
      title = 'Contract Stage Reached';
    }

    addNotification({
      type: 'deal',
      title,
      message: `${lead.title} moved from ${sourceStage} to ${destStage}`,
      priority,
      metadata: {
        dealId: lead.id,
        clientId: lead.clientId,
        oldStage: source.droppableId,
        newStage: destination.droppableId,
        value: lead.value
      }
    });
  };

  const handleDeleteLead = (leadId: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    if (window.confirm('Are you sure you want to delete this lead?')) {
      deleteLead(leadId);

      // Add notification for lead deletion
      addNotification({
        type: 'deal',
        title: 'Lead Deleted',
        message: `${lead.title} has been deleted`,
        priority: 'high',
        metadata: {
          dealId: leadId,
          clientId: lead.clientId,
          stage: lead.stage,
          value: lead.value
        }
      });
    }
  };

  const metrics = [
    {
      title: 'Total Pipeline Value',
      value: `$${getTotalValue().toLocaleString()}`,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Leads',
      value: leads.filter(l => !['lost', 'won'].includes(l.stage)).length,
      color: 'bg-green-500'
    },
    {
      title: 'Won Leads',
      value: leads.filter(l => l.stage === 'won').length,
      color: 'bg-indigo-500'
    },
    {
      title: 'Conversion Rate',
      value: `${Math.round((leads.filter(l => l.stage === 'won').length / leads.length) * 100)}%`,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="h-full p-6">
      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <div key={index} className={`${metric.color} rounded-lg p-4 text-white`}>
            <h3 className="text-sm font-medium opacity-80">{metric.title}</h3>
            <p className="text-2xl font-bold mt-1">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Pipeline Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pipeline</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
              title="Grid View"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
              title="List View"
            >
              <LayoutList className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => setIsAddingLead(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Lead
          </button>
        </div>
      </div>

      {/* Pipeline Content */}
      <DragDropContext onDragEnd={handleDragEnd}>
        {viewMode === 'grid' ? (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {stages.map((stage) => (
              <StageColumn
                key={stage.id}
                id={stage.id}
                title={stage.title}
                color={stage.color}
                leads={leads.filter((lead) => lead.stage === stage.id)}
                onDeleteLead={handleDeleteLead}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow">
            <div className="grid grid-cols-1 divide-y divide-gray-200">
              {stages.map((stage) => {
                const stageLeads = leads.filter((lead) => lead.stage === stage.id);
                if (stageLeads.length === 0) return null;
                
                return (
                  <div key={stage.id} className="p-4">
                    <div className={`bg-gradient-to-r ${stage.color} text-white px-4 py-2 rounded-lg mb-3`}>
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{stage.title}</h3>
                        <span className="bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-sm">
                          {stageLeads.length}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {stageLeads.map((lead) => (
                        <div
                          key={lead.id}
                          className="bg-gray-50 rounded-lg p-3 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-gray-900">{lead.title}</h4>
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{lead.client}</p>
                          <p className="text-sm font-medium text-gray-900 mt-2">
                            ${lead.value.toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </DragDropContext>

      {isAddingLead && <AddLeadDialog onClose={() => setIsAddingLead(false)} />}
    </div>
  );
};

export default Pipeline;