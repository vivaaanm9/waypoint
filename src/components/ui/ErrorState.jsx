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
      <div className="w-12 h-12 rounded-full bg-white shadow-xs border border-rose-100 flex items-center justify-center text-rose-500">
        <AlertCircle className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-black uppercase tracking-wider text-slate-800">{title}</h4>
        <p className="text-xs text-slate-400 font-semibold max-w-sm">
          {message}
        </p>
      </div>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          size="sm"
          className="flex items-center gap-1.5 border-rose-200 hover:bg-rose-50/50 hover:text-rose-600 text-rose-500 rounded-xl"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retry Request</span>
        </Button>
      )}
    </div>
  );
}
