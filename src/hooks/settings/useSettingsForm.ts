import { useEffect, useMemo, useState } from 'react';
import type { UiNode, UiNodeInputAttributes } from '@ory/client-fetch';
import type { SettingsFlow } from '@/lib/api/settings';
import { getSettingsFlow, submitSettingsFlow } from '@/lib/api/settings';
import { useSession } from '@/context/SessionContext';

const groupOrder = ['profile', 'password'];

type SettingsFormState = {
  flow: SettingsFlow | null;
  isLoading: boolean;
  orderedGroups: string[];
  groupedNodes: Record<string, UiNode[]>;
  hiddenNodes: UiNode[];
  formValues: Record<string, unknown>;
  submittingGroup: string | null;
  formErrors: Record<string, string>;
  messages: Record<string, string>;
  handleFieldChange: (name: string, value: unknown) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, group: string) => Promise<boolean>;
  setGroupError: (group: string, message: string) => void;
};

function setDeepValue(target: Record<string, unknown>, path: string, value: unknown) {
  const parts = path.split('.').filter(Boolean);
  if (parts.length === 0) return;
  let cursor: Record<string, unknown> = target;
  parts.forEach((part, index) => {
    if (index === parts.length - 1) {
      cursor[part] = value;
      return;
    }
    const next = cursor[part];
    if (!next || typeof next !== 'object') {
      cursor[part] = {};
    }
    cursor = cursor[part] as Record<string, unknown>;
  });
}

export function useSettingsForm(): SettingsFormState {
  const { refreshSession } = useSession();
  const [flow, setFlow] = useState<SettingsFlow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formValues, setFormValues] = useState<Record<string, unknown>>({});
  const [submittingGroup, setSubmittingGroup] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [messages, setMessages] = useState<Record<string, string>>({});

  const nodes = useMemo<UiNode[]>(() => flow?.ui?.nodes ?? [], [flow]);
  const hiddenNodes = useMemo(
    () =>
      nodes.filter(
        (node) =>
          node.attributes.node_type === 'input' &&
          (node.attributes as UiNodeInputAttributes).type === 'hidden' &&
          Boolean((node.attributes as UiNodeInputAttributes).name)
      ),
    [nodes]
  );

  const groupedNodes = useMemo(() => {
    const groups: Record<string, UiNode[]> = {};
    nodes.forEach((node) => {
      const group = node.group ?? 'default';
      if (group !== 'profile' && group !== 'password') {
        return;
      }
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(node);
    });
    return groups;
  }, [nodes]);

  const orderedGroups = useMemo(() => {
    const seen = new Set<string>();
    const ordered = groupOrder.filter((group) => groupedNodes[group]?.length);
    ordered.forEach((group) => seen.add(group));
    Object.keys(groupedNodes)
      .filter((group) => !seen.has(group))
      .sort()
      .forEach((group) => ordered.push(group));
    return ordered;
  }, [groupedNodes]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const { response, data } = await getSettingsFlow();
      if (!isMounted) return;
      if (!response.ok || !data) {
        setIsLoading(false);
        return;
      }
      setFlow(data);
      setIsLoading(false);
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!flow) return;
    const initialValues: Record<string, unknown> = {};
    (flow.ui?.nodes ?? []).forEach((node) => {
      if (node.attributes.node_type !== 'input') return;
      const attrs = node.attributes as UiNodeInputAttributes;
      const name = attrs.name;
      if (!name) return;
      if (attrs.type === 'checkbox') {
        initialValues[name] = Boolean(attrs.value);
      } else if (attrs.value !== undefined) {
        initialValues[name] = attrs.value;
      } else {
        initialValues[name] = '';
      }
    });
    setFormValues(initialValues);
  }, [flow]);

  const handleFieldChange = (name: string, value: unknown) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const setGroupError = (group: string, message: string) => {
    setFormErrors((prev) => ({ ...prev, [group]: message }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, group: string) => {
    event.preventDefault();
    setSubmittingGroup(group);
    setFormErrors((prev) => ({ ...prev, [group]: '' }));
    setMessages((prev) => ({ ...prev, [group]: '' }));

    const payload: Record<string, unknown> = {};
    const groupNodes = groupedNodes[group] ?? [];
    const nodesForPayload = [...hiddenNodes, ...groupNodes];
    nodesForPayload.forEach((node) => {
      if (node.attributes.node_type !== 'input') return;
      const attrs = node.attributes as UiNodeInputAttributes;
      const name = attrs.name;
      if (!name) return;
      if (attrs.type === 'submit') return;
      if (name === 'csrf_token') return;
      const value = attrs.type === 'checkbox' ? Boolean(formValues[name]) : formValues[name];
      if (name.includes('.')) {
        setDeepValue(payload, name, value);
      } else {
        payload[name] = value;
      }
    });

    const submitNode = groupNodes.find(
      (node) =>
        node.attributes.node_type === 'input' &&
        (node.attributes as UiNodeInputAttributes).type === 'submit' &&
        Boolean((node.attributes as UiNodeInputAttributes).name)
    );
    if (submitNode?.attributes.node_type === 'input') {
      const attrs = submitNode.attributes as UiNodeInputAttributes;
      if (attrs.name && attrs.value !== undefined) {
        payload[attrs.name] = attrs.value;
      } else {
        payload.method = group;
      }
    } else {
      payload.method = group;
    }

    const { response, data } = await submitSettingsFlow(
      flow?.id,
      payload as unknown as import('@ory/client-fetch').UpdateSettingsFlowBody
    );
    if (!response.ok) {
      const flowMessages = data?.ui?.messages?.map((msg) => msg.text).filter(Boolean) ?? [];
      const nodeMessages = (data?.ui?.nodes ?? [])
        .filter((node) => node.group === group)
        .flatMap((node) => node.messages?.map((msg) => msg.text).filter(Boolean) ?? []);
      const errorText =
        [...flowMessages, ...nodeMessages].filter(Boolean).join(' ') ||
        'Unable to update settings. Please try again.';
      setFormErrors((prev) => ({ ...prev, [group]: errorText }));
      setSubmittingGroup(null);
      return false;
    }

    setFlow(data ?? flow);
    await refreshSession();
    setMessages((prev) => ({ ...prev, [group]: 'Account settings updated.' }));
    setSubmittingGroup(null);
    return true;
  };

  return {
    flow,
    isLoading,
    orderedGroups,
    groupedNodes,
    hiddenNodes,
    formValues,
    submittingGroup,
    formErrors,
    messages,
    handleFieldChange,
    handleSubmit,
    setGroupError,
  };
}
