import {LoaderIcon} from "lucide-react";

interface LoaderProps {
  label?: string;
}

const Loader = ({label}: LoaderProps) => {
  return (
    <div className="min-h-screen flex flxex-col items-center justify-center gap-2">
      <LoaderIcon className="size-6 text-muted-foreground animate-spin"/>
      {label && (
        <p className="text-muted-foreground text-sm">
          {label}
        </p>
      )}
    </div>
  );
}

export default Loader;
