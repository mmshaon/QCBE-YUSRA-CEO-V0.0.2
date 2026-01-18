
import React, { useState, useEffect } from 'react';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { Expense } from '../pages/Expenses';

interface ExpenseFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (expenseData: Omit<Expense, 'id' | 'status'>) => void;
}

interface ExpenseItem {
    id: number;
    name: string;
    category: string;
    amount: number;
    quantity: number;
    receipt?: File;
}

const expenseCategories = ['Office Supplies', 'Travel', 'Software', 'Meals', 'Utilities', 'Other'];

export const ExpenseFormModal: React.FC<ExpenseFormModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [items, setItems] = useState<ExpenseItem[]>([{ id: 1, name: '', category: expenseCategories[0], amount: 0, quantity: 1 }]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const newTotal = items.reduce((sum, item) => sum + (item.amount * item.quantity), 0);
        setTotal(newTotal);
    }, [items]);

    const handleItemChange = (id: number, field: keyof ExpenseItem, value: any) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const addItem = () => {
        setItems([...items, { id: Date.now(), name: '', category: expenseCategories[0], amount: 0, quantity: 1 }]);
    };

    const removeItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    const handleSubmit = () => {
        // Check if any item has a receipt attached
        const hasAnyReceipt = items.some(item => !!item.receipt);

        onSubmit({
            submitter: 'M. Maynul Hasan', // Auto-filled from user session
            date: new Date().toISOString().split('T')[0],
            total: total,
            hasReceipt: hasAnyReceipt
        });
        onClose();
        // Reset form
        setItems([{ id: 1, name: '', category: expenseCategories[0], amount: 0, quantity: 1 }]);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Submit New Expense">
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={item.id} className="p-4 bg-[#0f1220] rounded-lg border border-[#2a314e] space-y-3">
                        <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-white">Item {index + 1}</h4>
                            {items.length > 1 && <Button variant="danger" size="sm" onClick={() => removeItem(item.id)}>Remove</Button>}
                        </div>
                        <Input 
                            placeholder="Item Name" 
                            value={item.name} 
                            onChange={e => handleItemChange(item.id, 'name', e.target.value)} 
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <Select 
                                value={item.category} 
                                onChange={e => handleItemChange(item.id, 'category', e.target.value)} 
                                options={expenseCategories.map(c => ({value: c, label: c}))} 
                            />
                            <Input 
                                type="number" 
                                placeholder="Amount (SAR)" 
                                value={item.amount || ''} 
                                onChange={e => handleItemChange(item.id, 'amount', parseFloat(e.target.value))} 
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <Input 
                                type="number" 
                                placeholder="Quantity" 
                                value={item.quantity || ''} 
                                onChange={e => handleItemChange(item.id, 'quantity', parseInt(e.target.value, 10))} 
                            />
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500 ml-1 mb-1">Attach Receipt</label>
                                <Input 
                                    type="file" 
                                    accept="image/*,application/pdf"
                                    onChange={e => handleItemChange(item.id, 'receipt', e.target.files ? e.target.files[0] : undefined)} 
                                />
                                {item.receipt && (
                                    <span className="text-[10px] text-cyan-400 mt-1 truncate max-w-[150px] font-medium">
                                        Selected: {item.receipt.name}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <Button variant="secondary" onClick={addItem}>Add Another Item</Button>

                <div className="pt-4 border-t border-[#2a314e] text-right">
                    <p className="text-lg font-bold text-white">Total Amount: <span className="font-mono text-cyan-400">SAR {total.toFixed(2)}</span></p>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit Expense</Button>
            </div>
        </Modal>
    );
};
