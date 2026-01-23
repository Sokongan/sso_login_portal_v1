import type { ScriptNode } from '@/types';
import type { HTMLAttributeReferrerPolicy } from 'react';
import { useEffect } from 'react';



export const NodeScript = ({ attributes }: ScriptNode) => {
    useEffect(() => {
        const script = document.createElement('script');

        script.async = true;
        script.src = attributes.src;
        script.async = attributes.async;
        script.crossOrigin = attributes.crossorigin;
        script.integrity = attributes.integrity;
        script.referrerPolicy =
            attributes.referrerpolicy as HTMLAttributeReferrerPolicy;
        script.type = attributes.type;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [attributes]);

    return null;
};