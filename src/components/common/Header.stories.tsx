import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Common/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
    },
    showBackButton: {
      control: "boolean",
    },
    onBackClick: {
      action: "back clicked",
    },
    rightAction: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    title: "페이지 제목",
  },
};

export const WithBackButton: Story = {
  args: {
    title: "근태 내역",
    showBackButton: true,
  },
};

export const WithRightAction: Story = {
  args: {
    title: "급여 내역",
    rightAction: (
      <button
        type="button"
        className="flex items-center justify-center w-8 h-8 text-worker-neutral-600 hover:text-worker-primary-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-worker-primary-600 focus-visible:ring-offset-2 rounded"
        aria-label="정보"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
          <path
            d="M10 6V10M10 14H10.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    ),
  },
};

export const FullFeatures: Story = {
  args: {
    title: "근태 내역",
    showBackButton: true,
    rightAction: (
      <button
        type="button"
        className="flex items-center justify-center w-8 h-8 text-worker-neutral-600 hover:text-worker-primary-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-worker-primary-600 focus-visible:ring-offset-2 rounded"
        aria-label="정보"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
          <path
            d="M10 6V10M10 14H10.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    ),
  },
};

export const LongTitle: Story = {
  args: {
    title: "매우 긴 페이지 제목이 들어갈 경우 어떻게 표시되는지 확인",
    showBackButton: true,
    rightAction: (
      <button
        type="button"
        className="flex items-center justify-center w-8 h-8 text-worker-neutral-600 hover:text-worker-primary-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-worker-primary-600 focus-visible:ring-offset-2 rounded"
        aria-label="정보"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
          <path
            d="M10 6V10M10 14H10.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    ),
  },
};

export const MyPage: Story = {
  args: {
    title: "마이페이지",
  },
};
