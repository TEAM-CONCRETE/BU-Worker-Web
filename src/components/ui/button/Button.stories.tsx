import type { Meta, StoryObj } from "@storybook/react";
import Button from "@/components/ui/button/Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    loading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 기본 스토리
export const Default: Story = {
  args: {
    children: "Button",
  },
};

// Variants
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Danger Button",
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Button",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "Medium Button",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large Button",
  },
};

// States
export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};

export const LoadingOutline: Story = {
  args: {
    variant: "outline",
    loading: true,
    children: "Loading...",
  },
};

export const DisabledSecondary: Story = {
  args: {
    variant: "secondary",
    disabled: true,
    children: "Disabled Secondary",
  },
};

// Full Width
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "Full Width Button",
  },
};

export const FullWidthOutline: Story = {
  args: {
    variant: "outline",
    fullWidth: true,
    children: "Full Width Outline",
  },
};

// 모든 Variants 조합
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

// 모든 Sizes 조합
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// Figma 예시
export const FigmaExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button variant="primary">로그인</Button>
        <Button variant="primary">회원가입</Button>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" size="sm">
          중복확인
        </Button>
        <Button variant="outline" size="md">
          주소 검색
        </Button>
      </div>
      <div className="flex gap-4">
        <Button variant="primary" disabled>
          회원가입
        </Button>
        <Button variant="primary" disabled>
          다음
        </Button>
      </div>
    </div>
  ),
};
