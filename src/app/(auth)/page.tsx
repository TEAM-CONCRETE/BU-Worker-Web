"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EntryPage() {
  return (
    <div className="flex flex-col items-center min-h-screen px-4">
      <div className="flex flex-col items-center mt-32">
        <Image
          src="/logo.png"
          alt="Build-Up 로고"
          width={85}
          height={110}
          priority
          className="!mb-4 block"
          style={{ display: "block", margin: 0, padding: 0 }}
        />
        <h1 className="text-[32px] font-extrabold leading-[28px] text-worker-primary-700">
          Build-Up
        </h1>
      </div>

      <div className="w-full max-w-[353px] space-y-3 mt-auto mb-8">
        <Link href="/login" className="block">
          <Button
            variant="primary"
            fullWidth
            className="h-[46px] text-2xl font-bold rounded-lg bg-worker-primary-700 hover:bg-worker-primary-700 active:bg-worker-primary-700"
          >
            로그인
          </Button>
        </Link>

        <Link href="/register" className="block">
          <Button
            variant="primary"
            fullWidth
            className="h-[51px] text-2xl font-bold rounded-lg bg-worker-primary-600 hover:bg-worker-primary-600 active:bg-worker-primary-600"
          >
            회원가입
          </Button>
        </Link>
      </div>
    </div>
  );
}
