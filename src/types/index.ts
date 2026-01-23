import type {
    UiNode,
    UiNodeAnchorAttributes,
    UiNodeTextAttributes,
    UiNodeScriptAttributes,
    UiText,
    LoginFlow,
    RecoveryFlow,
    RegistrationFlow,
    SettingsFlow,
    UpdateLoginFlowBody,
    UpdateRecoveryFlowBody,
    UpdateRegistrationFlowBody,
    UpdateSettingsFlowBody,
    UpdateVerificationFlowBody,
    VerificationFlow,
} from "@ory/client"

interface NodeProps<T> {
  node: UiNode
  attributes: T
}

export interface UiMessage extends UiText {}

export interface MessagesProps {
  messages?: UiMessage[];
  classNames?: string;
}


export type UpdateValues = Partial<
    | UpdateLoginFlowBody
    | UpdateRegistrationFlowBody
    | UpdateRecoveryFlowBody
    | UpdateSettingsFlowBody
    | UpdateVerificationFlowBody
>

type AuthMethods =
    | 'oidc'
    | 'password'
    | 'profile'
    | 'totp'
    | 'webauthn'
    | 'passkey'
    | 'link'
    | 'lookup_secret'

export type FlowProps<T> = {
    // The flow
    flow?:
        | LoginFlow
        | RegistrationFlow
        | SettingsFlow
        | VerificationFlow
        | RecoveryFlow
    // Only show certain nodes. We will always render the default nodes for CSRF tokens.
    only?: AuthMethods
    // Is triggered on submission
    onSubmit: (values: T) => Promise<void>
    // Do not show the global messages. Useful when rendering them elsewhere.
    hideGlobalMessages?: boolean
}

export type FlowState<T> = {
    values: T
    isLoading: boolean
}

export type Router = {
  push: (url: string) => void
  refresh?: () => void
}


// Usage examples:
export type AnchorNode = NodeProps<UiNodeAnchorAttributes>
export type TextNode = NodeProps<UiNodeTextAttributes>
export type ScriptNode = NodeProps<UiNodeScriptAttributes>
