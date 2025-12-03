"use client";

import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) {
        return null;
    }

    return (
        // Overlay pour l'arrière-plan
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={onClose} // Fermer en cliquant à l'extérieur
        >
            {/* Conteneur de la modale */}
            <div id="modaleContainer"
                className="bg-white p-6 rounded-lg shadow-2xl max-w-lg w-full m-4"
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    {/* Bouton de fermeture */}
                    <button 
                        onClick={onClose} 
                        className="text-gray-500 hover:text-gray-800 text-2xl"
                    >
                        &times;
                    </button>
                </div>
                
                {children}
            </div>
        </div>
    );
};