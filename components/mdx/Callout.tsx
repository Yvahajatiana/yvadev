import { ReactNode } from 'react';
import { AlertTriangle, Info, Lightbulb, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'danger';
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Callout({ 
  type = 'info', 
  title, 
  children, 
  className 
}: CalloutProps) {
  const configs = {
    info: {
      icon: Info,
      classes: 'border-blue-200 bg-blue-50 text-blue-800',
      iconClasses: 'text-blue-500',
      defaultTitle: 'Info',
    },
    warning: {
      icon: AlertTriangle,
      classes: 'border-yellow-200 bg-yellow-50 text-yellow-800',
      iconClasses: 'text-yellow-500',
      defaultTitle: 'Attention',
    },
    tip: {
      icon: Lightbulb,
      classes: 'border-green-200 bg-green-50 text-green-800',
      iconClasses: 'text-green-500',
      defaultTitle: 'Conseil',
    },
    danger: {
      icon: XCircle,
      classes: 'border-red-200 bg-red-50 text-red-800',
      iconClasses: 'text-red-500',
      defaultTitle: 'Danger',
    },
  };

  const config = configs[type];
  const Icon = config.icon;
  const displayTitle = title || config.defaultTitle;

  return (
    <div className={cn(
      'border-l-4 rounded-r-lg p-4 my-6',
      config.classes,
      className
    )}>
      <div className="flex items-start space-x-3">
        <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', config.iconClasses)} />
        <div className="flex-1 min-w-0">
          <div className="font-semibold mb-1">
            {displayTitle}
          </div>
          <div className="prose prose-sm max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
