'use client';

import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Button } from '~/components/ui/button';

interface ErrorBoundaryProps {
  error: Error & { digest?: string; code?: string };
  reset: () => void;
}

const GENERIC_ERROR_MESSAGE =
  'An unexpected error occurred. Please try again later.';

function getSafeErrorMessage(error: Error & { digest?: string; code?: string }): string {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const isAppError = error.name === 'AppError';

  if (isDevelopment) {
    return error.message || GENERIC_ERROR_MESSAGE;
  }

  if (isAppError) {
    return error.message || GENERIC_ERROR_MESSAGE;
  }

  return GENERIC_ERROR_MESSAGE;
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  const safeMessage = getSafeErrorMessage(error);
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (!isDevelopment) {
    console.error('Error Boundary caught an error:', {
      message: error.message,
      name: error.name,
      digest: error.digest,
      stack: error.stack,
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Alert variant="destructive" className="max-w-lg">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription className="mt-2 space-y-4">
          <p>{safeMessage}</p>
          {isDevelopment && error.digest && (
            <p className="text-xs text-muted-foreground">
              Error ID: {error.digest}
            </p>
          )}
          {isDevelopment && error.message !== safeMessage && (
            <p className="text-xs text-muted-foreground font-mono break-all">
              Original: {error.message}
            </p>
          )}
          <Button onClick={reset} variant="outline" className="mt-4">
            Try again
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
