import React, { useState, useEffect } from 'react';
import { QuizQuestion, SolarTerm } from '../types';
import { generateQuiz } from '../services/gemini';
import { Loader2, Award, XCircle, CheckCircle } from 'lucide-react';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTerm: SolarTerm;
  onComplete: (success: boolean) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, currentTerm, onComplete }) => {
  const [loading, setLoading] = useState(false);
  const [questionData, setQuestionData] = useState<QuizQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (isOpen && !questionData) {
      setLoading(true);
      generateQuiz(currentTerm).then(jsonStr => {
        try {
          if (jsonStr) {
             const data = JSON.parse(jsonStr);
             setQuestionData(data);
          } else {
             // Fallback question
             setQuestionData({
                 question: `${currentTerm.name}是二十四节气中的第几个？`,
                 options: ["第1个", "第3个", `第${currentTerm.id}个`, "不知道"],
                 correctIndex: 2,
                 explanation: "基础知识。"
             });
          }
        } catch(e) {
          console.error(e);
          setQuestionData(null);
        }
        setLoading(false);
      });
    }
  }, [isOpen, currentTerm]);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
    setShowResult(true);
    
    // Slight delay before notifying parent to allow animation
    if (index === questionData?.correctIndex) {
        setTimeout(() => onComplete(true), 1500);
    } else {
        setTimeout(() => onComplete(false), 1500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#fdfbf7] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-stone-200">
        
        {/* Header */}
        <div className="bg-stone-800 text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Award size={20} className="text-yellow-500" />
            <span className="font-medium">节气挑战: {currentTerm.name}</span>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-white">✕</button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10">
               <Loader2 className="animate-spin text-stone-400 mb-4" size={32} />
               <p className="text-stone-500 text-sm">正在生成题目...</p>
            </div>
          ) : questionData ? (
            <div className="animate-fadeIn">
              <h3 className="text-lg font-bold text-stone-800 mb-6 leading-relaxed">
                {questionData.question}
              </h3>
              
              <div className="space-y-3">
                {questionData.options.map((opt, idx) => {
                  let btnClass = "w-full p-4 rounded-xl text-left border transition-all duration-200 flex justify-between items-center ";
                  
                  if (showResult) {
                    if (idx === questionData.correctIndex) {
                       btnClass += "bg-green-100 border-green-500 text-green-800";
                    } else if (idx === selectedOption) {
                       btnClass += "bg-red-100 border-red-500 text-red-800";
                    } else {
                       btnClass += "bg-white border-stone-200 opacity-50";
                    }
                  } else {
                    btnClass += "bg-white border-stone-200 hover:border-stone-400 active:scale-[0.98] shadow-sm";
                  }

                  return (
                    <button 
                      key={idx} 
                      onClick={() => handleAnswer(idx)}
                      disabled={showResult}
                      className={btnClass}
                    >
                      <span className="font-medium">{['A', 'B', 'C', 'D'][idx]}. {opt}</span>
                      {showResult && idx === questionData.correctIndex && <CheckCircle size={18} />}
                      {showResult && idx === selectedOption && idx !== questionData.correctIndex && <XCircle size={18} />}
                    </button>
                  );
                })}
              </div>

              {showResult && (
                <div className="mt-6 p-4 bg-stone-100 rounded-lg text-sm text-stone-600 leading-relaxed border-l-4 border-stone-400">
                  <span className="font-bold block mb-1">解析：</span>
                  {questionData.explanation}
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-red-500">加载失败，请重试。</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;