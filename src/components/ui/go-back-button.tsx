import { useNavigate } from 'react-router-dom';
import { Button, ButtonProps } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GoBackButtonProps extends ButtonProps {
  fallbackPath?: string;
}

export function GoBackButton({ 
  className, 
  fallbackPath = '/', 
  variant = 'ghost',
  size = 'sm',
  children,
  ...props 
}: GoBackButtonProps) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // Check if there is a history state to go back to
    // window.history.state.idx > 0 usually implies there is a previous entry in the stack
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      className={cn("group gap-2 pl-0 hover:pl-2 transition-all duration-300", className)} 
      onClick={handleGoBack}
      {...props}
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      {children || 'Go Back'}
    </Button>
  );
}
