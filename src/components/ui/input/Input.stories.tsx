import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "tel", "url", "search"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["default", "filled"],
    },
    disabled: {
      control: "boolean",
    },
    error: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// 기본 스토리
export const Default: Story = {
  args: {
    placeholder: "텍스트를 입력하세요",
  },
};

// With Label
export const WithLabel: Story = {
  args: {
    label: "이름",
    placeholder: "이름을 입력하세요",
  },
};

// With Helper Text
export const WithHelperText: Story = {
  args: {
    label: "이메일",
    placeholder: "example@email.com",
    helperText: "이메일 주소를 정확히 입력해주세요",
  },
};

// Error State
export const WithError: Story = {
  args: {
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 입력하세요",
    error: true,
    errorMessage: "비밀번호는 최소 8자 이상이어야 합니다",
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: "비활성화",
    placeholder: "입력할 수 없습니다",
    disabled: true,
  },
};

// Required
export const Required: Story = {
  args: {
    label: "필수 입력",
    placeholder: "필수 입력 필드입니다",
    required: true,
    helperText: "이 필드는 필수입니다",
  },
};

// Types - Text
export const TypeText: Story = {
  args: {
    type: "text",
    label: "텍스트",
    placeholder: "텍스트를 입력하세요",
  },
};

// Types - Password
export const TypePassword: Story = {
  args: {
    type: "password",
    label: "비밀번호",
    placeholder: "비밀번호를 입력하세요",
  },
};

// Types - Email
export const TypeEmail: Story = {
  args: {
    type: "email",
    label: "이메일",
    placeholder: "example@email.com",
  },
};

// Types - Number
export const TypeNumber: Story = {
  args: {
    type: "number",
    label: "숫자",
    placeholder: "숫자를 입력하세요",
  },
};

// Types - Tel
export const TypeTel: Story = {
  args: {
    type: "tel",
    label: "전화번호",
    placeholder: "010-1234-5678",
  },
};

// Types - URL
export const TypeURL: Story = {
  args: {
    type: "url",
    label: "웹사이트",
    placeholder: "https://example.com",
  },
};

// Types - Search
export const TypeSearch: Story = {
  args: {
    type: "search",
    label: "검색",
    placeholder: "검색어를 입력하세요",
  },
};

// Sizes - Small
export const SizeSmall: Story = {
  args: {
    size: "sm",
    label: "Small Input",
    placeholder: "Small size input",
  },
};

// Sizes - Medium
export const SizeMedium: Story = {
  args: {
    size: "md",
    label: "Medium Input",
    placeholder: "Medium size input",
  },
};

// Sizes - Large
export const SizeLarge: Story = {
  args: {
    size: "lg",
    label: "Large Input",
    placeholder: "Large size input",
  },
};

// Variants - Default
export const VariantDefault: Story = {
  args: {
    variant: "default",
    label: "Default Variant",
    placeholder: "Default variant input",
  },
};

// Variants - Filled
export const VariantFilled: Story = {
  args: {
    variant: "filled",
    label: "Filled Variant",
    placeholder: "Filled variant input",
  },
};

// Full Width
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    label: "전체 너비",
    placeholder: "전체 너비 Input",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

// With Prefix
export const WithPrefix: Story = {
  args: {
    label: "가격",
    placeholder: "0",
    prefix: <span>₩</span>,
  },
};

// With Suffix
export const WithSuffix: Story = {
  args: {
    label: "할인율",
    placeholder: "0",
    suffix: <span>%</span>,
  },
};

// All Types
export const AllTypes: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Input type="text" label="Text" placeholder="텍스트 입력" />
      <Input type="password" label="Password" placeholder="비밀번호 입력" />
      <Input type="email" label="Email" placeholder="이메일 입력" />
      <Input type="number" label="Number" placeholder="숫자 입력" />
      <Input type="tel" label="Tel" placeholder="전화번호 입력" />
      <Input type="url" label="URL" placeholder="URL 입력" />
      <Input type="search" label="Search" placeholder="검색어 입력" />
    </div>
  ),
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Input size="sm" label="Small" placeholder="Small input" />
      <Input size="md" label="Medium" placeholder="Medium input" />
      <Input size="lg" label="Large" placeholder="Large input" />
    </div>
  ),
};

// All States
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Input label="Normal" placeholder="Normal state" />
      <Input
        label="Error"
        placeholder="Error state"
        error
        errorMessage="에러 메시지입니다"
      />
      <Input label="Disabled" placeholder="Disabled state" disabled />
      <Input
        label="Required"
        placeholder="Required field"
        required
        helperText="필수 입력 필드입니다"
      />
    </div>
  ),
};

// Figma 예시 - 로그인 폼
export const FigmaLoginForm: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <h2 className="text-xl font-bold text-worker-neutral-900 mb-4">로그인</h2>
      <Input
        type="email"
        label="이메일"
        placeholder="이메일을 입력하세요"
        required
      />
      <Input
        type="password"
        label="비밀번호"
        placeholder="비밀번호를 입력하세요"
        required
      />
    </div>
  ),
};

// Figma 예시 - 회원가입 폼
export const FigmaSignupForm: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <h2 className="text-xl font-bold text-worker-neutral-900 mb-4">
        회원가입
      </h2>
      <Input label="이름" placeholder="이름을 입력하세요" required />
      <Input
        type="email"
        label="이메일"
        placeholder="example@email.com"
        required
        helperText="이메일 인증이 필요합니다"
      />
      <Input
        type="password"
        label="비밀번호"
        placeholder="8자 이상 입력하세요"
        required
        helperText="영문, 숫자, 특수문자 포함"
      />
      <Input
        type="password"
        label="비밀번호 확인"
        placeholder="비밀번호를 다시 입력하세요"
        required
      />
      <Input
        type="tel"
        label="전화번호"
        placeholder="010-1234-5678"
        helperText="- 를 포함하여 입력하세요"
      />
    </div>
  ),
};

// Figma 예시 - 검색 폼
export const FigmaSearchForm: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Input
        type="search"
        size="lg"
        placeholder="검색어를 입력하세요"
        prefix={
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        }
      />
    </div>
  ),
};
