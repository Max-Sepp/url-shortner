import { CheckIcon, ClipboardIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, ButtonProps } from "./ui/button";
import { Card } from "./ui/card";

async function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value);
}

interface CopyProps extends ButtonProps {
  value: string;
}

export function CopyButton({
  value,
  className,
  variant = "ghost",
  ...props
}: CopyProps) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <Button
      size="icon"
      variant={variant}
      className={className}
      onClick={() => {
        copyToClipboard(value);
        setHasCopied(true);
      }}
      {...props}
    >
      {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
    </Button>
  );
}

export function CopyLink({ url }: { url: string }) {
  return (
    <Card className="flex flex-row items-center justify-between gap-3 p-3">
      <a href={url}>
        <Button variant="link" className="text-md">
          {url}
        </Button>
      </a>
      <CopyButton value={url} />
    </Card>
  );
}
