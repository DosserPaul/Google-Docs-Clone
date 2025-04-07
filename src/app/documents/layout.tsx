interface DocumentsLayoutProps {
  children: React.ReactNode;
}

const DocumentsLayout = ({children}: DocumentsLayoutProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}

export default DocumentsLayout;
