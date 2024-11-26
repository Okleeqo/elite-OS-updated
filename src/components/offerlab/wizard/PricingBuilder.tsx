import React, { useState } from 'react';
import { Plus, Trash2, DollarSign, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { WizardData } from '../OfferWizard';

interface PricingBuilderProps {
  strategies: any[];
  pricing: WizardData['pricing'];
  onUpdatePricing: (pricing: WizardData['pricing']) => void;
}

const PricingBuilder: React.FC<PricingBuilderProps> = ({
  strategies,
  pricing,
  onUpdatePricing
}) => {
  const [newTierName, setNewTierName] = useState('');
  const [newTierPrice, setNewTierPrice] = useState('');
  const [expandedTiers, setExpandedTiers] = useState<string[]>([]);

  const toggleTierExpansion = (tierId: string) => {
    setExpandedTiers(prev => 
      prev.includes(tierId) 
        ? prev.filter(id => id !== tierId)
        : [...prev, tierId]
    );
  };

  const handleAddTier = () => {
    if (!newTierName || !newTierPrice) return;

    const tierId = `tier-${Date.now()}`;
    onUpdatePricing({
      tiers: [
        ...pricing.tiers,
        {
          id: tierId,
          name: newTierName,
          price: parseFloat(newTierPrice),
          strategies: [],
          features: []
        }
      ]
    });

    setExpandedTiers(prev => [...prev, tierId]);
    setNewTierName('');
    setNewTierPrice('');
  };

  const handleRemoveTier = (index: number) => {
    onUpdatePricing({
      tiers: pricing.tiers.filter((_, i) => i !== index)
    });
  };

  const handleStrategyToggle = (tierIndex: number, strategyId: string) => {
    const newTiers = [...pricing.tiers];
    const tier = newTiers[tierIndex];

    if (tier.strategies.includes(strategyId)) {
      tier.strategies = tier.strategies.filter(id => id !== strategyId);
    } else {
      tier.strategies = [...tier.strategies, strategyId];
    }

    onUpdatePricing({ tiers: newTiers });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Build Pricing Tiers
        </h3>
        <p className="text-gray-600">
          Create pricing tiers and assign strategies to each tier.
        </p>
      </div>

      {/* Add New Tier */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Add New Tier</h4>
        <div className="flex gap-4">
          <input
            type="text"
            value={newTierName}
            onChange={(e) => setNewTierName(e.target.value)}
            placeholder="Tier Name"
            className="flex-1 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="relative flex-1">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={newTierPrice}
              onChange={(e) => setNewTierPrice(e.target.value)}
              placeholder="Price"
              className="w-full pl-10 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleAddTier}
            disabled={!newTierName || !newTierPrice}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Tier
          </button>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="space-y-6">
        {pricing.tiers.map((tier, tierIndex) => (
          <div key={tier.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div 
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleTierExpansion(tier.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{tier.name}</h4>
                  <p className="text-sm text-gray-600">${tier.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveTier(tierIndex);
                    }}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  {expandedTiers.includes(tier.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {expandedTiers.includes(tier.id) && (
              <div className="border-t px-6 py-4 space-y-4">
                {strategies.map((strategy) => (
                  <div
                    key={strategy.id}
                    className={`p-4 rounded-lg transition-all duration-300 ${
                      tier.strategies.includes(strategy.id)
                        ? 'bg-blue-50 border-2 border-blue-500'
                        : 'bg-gray-50 border-2 border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start">
                      <GripVertical className="w-5 h-5 text-gray-400 mr-3 mt-1 flex-shrink-0" />
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900">{strategy.strategy}</h5>
                          <button
                            onClick={() => handleStrategyToggle(tierIndex, strategy.id)}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              tier.strategies.includes(strategy.id)
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            {tier.strategies.includes(strategy.id) ? 'Remove' : 'Add'}
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{strategy.description}</p>
                        
                        {/* Implementation Steps */}
                        {tier.strategies.includes(strategy.id) && (
                          <div className="mt-4 space-y-2">
                            <h6 className="text-sm font-medium text-gray-700">Implementation Steps:</h6>
                            <ul className="list-disc list-inside space-y-1">
                              {strategy.implementation.map((step: string, stepIndex: number) => (
                                <li key={stepIndex} className="text-sm text-gray-600">{step}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* Tools */}
                        {tier.strategies.includes(strategy.id) && strategy.tools && (
                          <div className="mt-4">
                            <h6 className="text-sm font-medium text-gray-700 mb-2">Required Tools:</h6>
                            <div className="flex flex-wrap gap-2">
                              {strategy.tools.map((tool: string, toolIndex: number) => (
                                <span
                                  key={toolIndex}
                                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingBuilder;