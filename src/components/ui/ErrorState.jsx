import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import Button from './Button';

export default function ErrorState({
  title = 'Something went wrong',
  message = 'We encountered an error loading this content. Please try again.',
  onRetry,
  className = ''
}) {
  return (
    <div className={`w-full py-12 px-6 flex flex-col items-center justify-center text-center space-y-4 bg-rose-50/30 rounded-3xl border border-dashed border-rose-250 select-none animate-[fadeIn_0.2s_ease-out] ${className}`}>
      <div className="w-16 h-16 rounded-full bg-red-100 text-[#EF4444] flex items-center justify-center shadow-xs">
        <AlertCircle className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <h4 className="text-xl font-semibold text-[#0F172A]">{title}</h4>
        <p className="text-sm text-[#64748B] max-w-md mx-auto">
          {message}
        </p>
      </div>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          size="sm"
          className="flex items-center gap-1.5 border-rose-200 hover:bg-rose-50/50 hover:text-rose-600 text-[#EF4444] rounded-xl mt-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retry Request</span>
        </Button>
      )}
    </div>
  );
}
