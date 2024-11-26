import React, { useEffect, useState } from 'react';
import { FileText, Download, Loader } from 'lucide-react';
import { OfferData } from '../OfferCreationWizard';
import { generateGoal, generateActions, generateStrategies } from '../../../../lib/openai';

interface OfferPreviewStepProps {
  offerData: OfferData;
  onUpdateOffer: (data: Partial<OfferData>) => void;
}

const OfferPreviewStep: React.FC<OfferPreviewStepProps> = ({
  offerData,
  onUpdateOffer
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateContent = async () => {
      if (offerData.gaps.length === 0) return;
      
      setIsGenerating(true);
      setError(null);

      try {
        // Generate goals for each gap
        const goals = await Promise.all(
          offerData.gaps.map(gap => generateGoal(gap))
        );

        // Generate actions for each goal
        const actions = await Promise.all(
          goals.map(goal => generateActions(goal.goal))
        );

        // Generate strategies for each action
        const strategies = await Promise.all(
          actions.flat().map(action => 
            generateStrategies(action.action, {
              frequency: offerData.parameters.frequency,
              deliveryMethod: offerData.parameters.deliveryMethod,
              tools: offerData.parameters.tools
            })
          )
        );

        onUpdateOffer({
          goals,
          actions: actions.flat(),
          strategies: strategies.flat()
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error generating content');
        console.error('Error generating content:', err);
      } finally {
        setIsGenerating(false);
      }
    };

    if (offerData.gaps.length > 0 && !offerData.goals.length) {
      generateContent();
    }
  }, [offerData.gaps, offerData.parameters, onUpdateOffer]);

  const formatDeliveryMethod = (method: string) => {
    return method.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader className="w-8 h-8 text-purple-600 animate-spin mb-4" />
        <p className="text-gray-600">Generating your offer content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="text-purple-600 hover:text-purple-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Review Your Offer
        </h3>
        <p className="text-gray-600">
          Review and customize the AI-generated offer before finalizing.
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 space-y-6">
        {/* Service Parameters */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Service Parameters</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <span className="text-sm text-gray-500">Frequency</span>
              <p className="font-medium text-gray-900 capitalize">{offerData.parameters.frequency}</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-sm text-gray-500">Delivery Method</span>
              <p className="font-medium text-gray-900">
                {formatDeliveryMethod(offerData.parameters.deliveryMethod)}
              </p>
            </div>
          </div>
        </div>

        {/* Tools & Resources */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Tools & Resources</h4>
          <div className="flex flex-wrap gap-2">
            {offerData.parameters.tools.map((tool, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Generated Content */}
        <div className="space-y-6">
          {offerData.goals.map((goal, goalIndex) => (
            <div key={goalIndex} className="bg-white rounded-lg p-6">
              <h4 className="font-medium text-gray-900 mb-4">Goal {goalIndex + 1}</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-800">{goal.goal}</p>
                  <div className="mt-2">
                    <h5 className="text-sm font-medium text-gray-700">Metrics</h5>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {goal.metrics.map((metric, i) => (
                        <li key={i}>{metric}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {offerData.actions
                  .filter((_, actionIndex) => Math.floor(actionIndex / 3) === goalIndex)
                  .map((action, actionIndex) => (
                    <div key={actionIndex} className="pl-4 border-l-2 border-purple-200">
                      <h5 className="font-medium text-gray-800 mb-2">Action {actionIndex + 1}</h5>
                      <p className="text-gray-600 mb-2">{action.description}</p>
                      
                      <div className="space-y-2">
                        {offerData.strategies
                          .filter((_, strategyIndex) => 
                            Math.floor(strategyIndex / 2) === actionIndex + (goalIndex * 3)
                          )
                          .map((strategy, strategyIndex) => (
                            <div key={strategyIndex} className="bg-gray-50 p-3 rounded">
                              <h6 className="text-sm font-medium text-gray-700">
                                {strategy.strategy}
                              </h6>
                              <p className="text-sm text-gray-600">{strategy.description}</p>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <FileText className="w-5 h-5 mr-2" />
          Export Offer
        </button>
      </div>
    </div>
  );
};

export default OfferPreviewStep;