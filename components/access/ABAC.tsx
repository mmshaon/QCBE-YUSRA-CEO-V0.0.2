
import React from 'react';
import { abacPolicies } from './accessControlData';
import { Button } from '../ui/Button';

const PolicyCard: React.FC<{ policy: typeof abacPolicies[0] }> = ({ policy }) => {
    const { rule } = policy;

    const renderCondition = (condition, type) => (
        <div className="flex items-center space-x-2">
            <span className={`text-xs font-mono p-1 rounded ${type === 'subject' ? 'bg-sky-500/20 text-sky-300' : 'bg-amber-500/20 text-amber-300'}`}>{condition.attribute}</span>
            <span className="text-gray-400 font-bold">{condition.operator}</span>
            <span className="text-xs font-mono p-1 rounded bg-gray-600">{Array.isArray(condition.value) ? `[${condition.value.join(', ')}]` : condition.value}</span>
        </div>
    );

    return (
        <div className="rounded-lg border border-white/10 bg-black/30 p-4 transition-all duration-300 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-900/20">
            <h4 className="font-bold text-white">{policy.name}</h4>
            <p className="text-xs text-gray-400 mt-1 mb-4">{policy.description}</p>
            <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                    <span className="font-bold text-red-400 w-12">IF</span>
                    <div className="space-y-1">
                        {renderCondition(rule.subject, 'subject')}
                        {rule.resource && renderCondition(rule.resource, 'subject')}
                    </div>
                </div>
                 {rule.context && (
                    <div className="flex items-start space-x-2">
                        <span className="font-bold text-red-400 w-12">AND</span>
                        {renderCondition(rule.context, 'context')}
                    </div>
                 )}
                <div className="flex items-start space-x-2">
                    <span className="font-bold text-green-400 w-12">THEN</span>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm">Action:</span>
                        <span className="text-xs font-mono p-1 rounded bg-green-500/20 text-green-300">{rule.action}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const ABAC: React.FC = () => {
  return (
    <div className="rounded-2xl bg-white/5 p-6 animated-border">
        <div className="flex justify-between items-center mb-2">
            <div>
                <h3 className="text-xl font-bold text-white">Attribute-Based Policies</h3>
                <p className="text-sm text-gray-400">Create dynamic rules that grant permissions based on user, resource, or context attributes.</p>
            </div>
            <Button>Create New Policy</Button>
        </div>
      
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {abacPolicies.map(policy => (
                <PolicyCard key={policy.id} policy={policy} />
            ))}
        </div>
    </div>
  );
};
