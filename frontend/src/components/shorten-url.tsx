"use client";

import { useState } from "react";
import { ShortenUrlForm } from "./shorten-url-form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { getBaseUrl } from "@/lib/utils";
import { CopyLink } from "./copy-text";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

export function ShortenUrl() {
  // if code is undefined then user is shortening a url
  const [code, setCode] = useState<string | undefined>(undefined);

  if (code === undefined) {
    return (
      <Card className="max-w-md grow">
        <CardHeader>
          <CardTitle>Shorten a URL</CardTitle>
        </CardHeader>
        <CardContent>
          <ShortenUrlForm setCode={setCode} />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-row items-center gap-3">
      <Button onClick={() => setCode(undefined)} variant="ghost">
        <ArrowLeft />
      </Button>{" "}
      <CopyLink url={getBaseUrl() + "s/" + code} />
    </div>
  );
}
