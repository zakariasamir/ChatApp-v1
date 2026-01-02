// Components
export { LoadingSpinner } from "@/modules/_shared/components/LoadingSpinner";

// Contexts
export { AuthProvider, useAuth } from "@/modules/_shared/contexts/AuthContext";
export {
  ChatProvider,
  useChatState,
} from "@/modules/_shared/contexts/ChatContext";

// Hooks
export { useChatState } from "@/modules/_shared/hooks/useChatState";
export { useSocket } from "@/modules/_shared/hooks/useSocket";

// Lib
export * from "@/modules/_shared/lib/socket";
export * from "@/modules/_shared/lib/utils";
export * from "@/modules/_shared/lib/validations";

// Providers
export { SWRProvider } from "@/modules/_shared/providers/SWRProvider";

// Types
export * as Types from "@/modules/_shared/types";
