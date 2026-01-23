import type { JSX } from 'react';
import { AlertCircle, AlertOctagon, Check } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { MessagesProps, UiMessage } from '@/types';

const Icon = ({ type }: Pick<UiMessage, 'type'>): JSX.Element => {
  switch (type) {
    case 'error':
      return <AlertOctagon className="h-4 w-4" />;
    case 'success':
      return <Check className="h-4 w-4" />;
    case 'info':
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <></>;
  }
};

const Message = ({ message }: { message: UiMessage }) => (
  <Alert>
    <Icon type={message.type} />
    <AlertTitle>
      {message.type[0].toUpperCase() + message.type.substring(1)}
    </AlertTitle>
    <AlertDescription>{message.text}</AlertDescription>
  </Alert>
);

export const Messages = ({ messages, classNames }: MessagesProps) => {
  if (!messages?.length) return null;

  return (
    <div className={classNames}>
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
    </div>
  );
};
