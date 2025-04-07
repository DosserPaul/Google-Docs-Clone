"use client";

import {AlertTriangleIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export const ErrorPage = ({error, reset}: ErrorPageProps) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-red-200 p-3 rounded-full">
            <AlertTriangleIcon className="text-red-600 size-10"/>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">
            Something went wrong
          </h2>
          <p>
            {error.message}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Button
          onClick={reset}
          className="font-medium px-6"
          variant="primary"
        >
          Try again
        </Button>

        <Button
          className="font-medium px-6 text-gray-900"
          variant="ghost"
          onClick={handleRedirect}
        >
          Go back
        </Button>
      </div>
    </div>
  );
}

export default ErrorPage;
