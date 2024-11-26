import React, { useState } from 'react';
import { Target, Plus, ChevronDown, ChevronRight, Loader } from 'lucide-react';
import { generateGoal, generateActions, generateStrategies } from '../../lib/openai';

interface Action {
  id: string;
  title: string;
  description: string;
  strategies: Strategy[];
  timeline: string;
}

interface Strategy {
  id: string;
  title: string;
  description: string;
  tools: string[];
}

interface Goal {
  id: string;
  title: string;
  metrics: string[];
  actions: Action[];
}

const ActionPlanPanel: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedGoal, setExpandedGoal] = useState<string | null>(null);
  const [expandedAction, setExpandedAction] = useState<string | null>(null);

  const handleGenerateActionPlan = async () => {
    setIsGenerating(true);
    try {
      // Example goal for demonstration
      const goalInput = "Increase client portfolio value by 25% within 12 months while maintaining risk tolerance levels";
      
      // Generate goal using GPT
      const generatedGoal = await generateGoal(goalInput);
      
      // Generate actions for the goal
      const actions = await generateActions(generatedGoal.goal);
      
      // Generate strategies for each action
      const actionsWithStrategies = await Promise.all(
        actions.map(async (action) => {
          const strategies = await generateStrategies(action.action, {
            frequency: 'monthly',
            deliveryMethod: 'video-call',
            tools: ['Financial Planning Software', 'Portfolio Management System']
          });
          
          return {
            id: Math.random().toString(36).substr(2, 9),
            title: action.action,
            description: action.description,
            strategies: strategies.map(strategy => ({
              id: Math.random().toString(36).substr(2, 9),
              title: strategy.strategy,
              description: strategy.description,
              tools: strategy.tools
            })),
            timeline: '3 months'
          };
        })
      );

      const newGoal: Goal = {
        id: Math.random().toString(36).substr(2, 9),
        title: generatedGoal.goal,
        metrics: generatedGoal.metrics,
        actions: actionsWithStrategies
      };

      setGoals([...goals, newGoal]);
    } catch (error) {
      console.error('Error generating action plan:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Action Plan</h2>
        <button
          onClick={handleGenerateActionPlan}
          disabled={isGenerating}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isGenerating ? (
            <>
              <Loader className="w-5 h-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 mr-2" />
              Generate Action Plan
            </>
          )}
        </button>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <button
              onClick={() => setExpandedGoal(expandedGoal === goal.id ? null : goal.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div className="flex items-center">
                <Target className="w-5 h-5 text-blue-600 mr-3" />
                <span className="font-medium text-gray-900">{goal.title}</span>
              </div>
              {expandedGoal === goal.id ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedGoal === goal.id && (
              <div className="p-4 bg-gray-50 border-t">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700">Success Metrics:</h4>
                  <ul className="mt-2 space-y-1">
                    {goal.metrics.map((metric, index) => (
                      <li key={index} className="text-sm text-gray-600">• {metric}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  {goal.actions.map((action) => (
                    <div key={action.id} className="bg-white rounded-lg shadow-sm">
                      <button
                        onClick={() => setExpandedAction(expandedAction === action.id ? null : action.id)}
                        className="w-full flex items-center justify-between p-4"
                      >
                        <span className="font-medium text-gray-900">{action.title}</span>
                        {expandedAction === action.id ? (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                      </button>

                      {expandedAction === action.id && (
                        <div className="p-4 border-t">
                          <p className="text-gray-600 mb-4">{action.description}</p>
                          <div className="space-y-4">
                            {action.strategies.map((strategy) => (
                              <div key={strategy.id} className="bg-gray-50 p-4 rounded-lg">
                                <h5 className="font-medium text-gray-900 mb-2">{strategy.title}</h5>
                                <p className="text-sm text-gray-600 mb-2">{strategy.description}</p>
                                <div className="flex flex-wrap gap-2">
                                  {strategy.tools.map((tool, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                                    >
                                      {tool}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {goals.length === 0 && !isGenerating && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Action Plans Yet</h3>
            <p className="text-gray-500">
              Click the "Generate Action Plan" button to create your first action plan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionPlanPanel;