export function ToolEmbed({
  src,
  height = '500px',
}: {
  src: string;
  height?: string;
}) {
  return (
    <div className="tool-embed rounded-lg border overflow-hidden my-6">
      <iframe
        src={src}
        className="w-full border-0"
        style={{ height }}
        sandbox="allow-scripts allow-same-origin allow-downloads allow-downloads-without-user-activation allow-modals allow-forms"
        loading="lazy"
        title="Embedded tool"
      />
    </div>
  );
}
