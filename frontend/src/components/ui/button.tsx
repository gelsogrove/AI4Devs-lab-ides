import * as React from "react"

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
type ButtonSize = "default" | "sm" | "lg"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
  style?: React.CSSProperties
}

interface VariantStyle {
  backgroundColor: string
  color: string
  border?: string
  padding?: string
  height?: string
  textDecoration?: string
  textUnderlineOffset?: string
  "&:hover"?: {
    backgroundColor?: string
    color?: string
  }
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", children, ...props }, ref) => {
    // Base styles
    const baseStyle: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.2s",
      cursor: "pointer",
      outline: "none",
      border: "none",
    }

    // Size variants
    const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
      default: {
        height: "40px",
        padding: "0 16px",
      },
      sm: {
        height: "36px",
        padding: "0 12px",
        fontSize: "13px",
      },
      lg: {
        height: "44px",
        padding: "0 32px",
        fontSize: "15px",
      },
    }

    // Variant styles
    const variantStyles: Record<ButtonVariant, VariantStyle> = {
      default: {
        backgroundColor: "#2563eb",
        color: "white",
        "&:hover": {
          backgroundColor: "#1d4ed8",
        },
      },
      destructive: {
        backgroundColor: "#ef4444",
        color: "white",
        "&:hover": {
          backgroundColor: "#dc2626",
        },
      },
      outline: {
        backgroundColor: "transparent",
        border: "1px solid #e5e7eb",
        color: "#374151",
        "&:hover": {
          backgroundColor: "#f3f4f6",
          color: "#111827",
        },
      },
      secondary: {
        backgroundColor: "#f3f4f6",
        color: "#374151",
        "&:hover": {
          backgroundColor: "#e5e7eb",
          color: "#111827",
        },
      },
      ghost: {
        backgroundColor: "transparent",
        color: "#374151",
        "&:hover": {
          backgroundColor: "#f3f4f6",
          color: "#111827",
        },
      },
      link: {
        backgroundColor: "transparent",
        color: "#2563eb",
        padding: "0",
        textDecoration: "underline",
        textUnderlineOffset: "4px",
      },
    }

    // Combine styles based on props
    const combinedStyle: React.CSSProperties = {
      ...baseStyle,
      ...(sizeStyles[size] || {}),
      ...(variantStyles[variant] || {}),
      ...props.style,
    }

    // Handle hover state
    const [isHovered, setIsHovered] = React.useState<boolean>(false)
    const hoverStyle: React.CSSProperties =
      isHovered && variantStyles[variant]["&:hover"]
        ? (variantStyles[variant]["&:hover"] as React.CSSProperties)
        : {}

    return (
      <button
        ref={ref}
        style={{ ...combinedStyle, ...hoverStyle }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
