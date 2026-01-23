import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Flow } from '../../ory/ui/Flow'
import type { LoginFlow, UpdateLoginFlowBody } from '@ory/client';
import { IdentityProvider } from '../../ory/sdk';
import { AxiosError } from 'axios';
import { HandleError } from '../../ory/hooks';



export default function Login() {
  const [flow, setFlow] = useState<LoginFlow | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const flowId = searchParams.get('flow');
  const loginChallenge = searchParams.get('login_challenge') ?? undefined;
  const returnTo = searchParams.get('return_to') ?? undefined;
  const aal = searchParams.get('aal') ?? undefined;
  const refresh = Boolean(searchParams.get('refresh')) ? true : undefined;
  const identityProvider = new IdentityProvider();
  const hasInitRef = useRef(false);

  const router = {
    push: (url: string) => navigate(url),
    refresh: () => window.location.reload(),
  };
    const  getFlow = useCallback((flowId: string) => {
    return identityProvider
      .helper()
      .getLoginFlow({ id: flowId })
      .then(({ data }) => {
        setFlow(data);
      });
  }, []);
    const handleError = useCallback((error: AxiosError) => {
    // Standard error handler for Kratos flows
        const handle = HandleError(getFlow, setFlow, '/', true, router);
        return handle(error);
    }, [getFlow, router]);

    const createFlow = useCallback((aal?: string,refresh?: boolean, returnTo?: string,loginChallenge?:string) => {
   identityProvider.helper().createBrowserLoginFlow({ aal, refresh, returnTo, loginChallenge })
      .then(({ data }) => {
        setFlow(data);
       
        router.push(`?flow=${encodeURIComponent(data.id)}${loginChallenge ? `&login_challenge=${encodeURIComponent(loginChallenge)}` : ''}`);

      })
      .catch(handleError);
  }, [loginChallenge, handleError, router]);

    const initFlow = useCallback(() => {
      if (hasInitRef.current) {
        return;
      }
      hasInitRef.current = true;

      if (!loginChallenge && !flowId) {
        window.location.assign('/api/login?redirect=http://127.0.0.1:8082');
        return;
      }

      if (flowId) {
        getFlow(flowId).catch(handleError);
        return;
      }

      if (loginChallenge) {
        createFlow(aal, refresh, returnTo, loginChallenge);
        return;
      }
    }, [flowId, loginChallenge, aal, refresh, returnTo, createFlow, getFlow, handleError]);

    useEffect(() => {
        initFlow();
    }, [initFlow]);

    const onSubmit = async (body: UpdateLoginFlowBody) => {
       identityProvider.helper()
          .updateLoginFlow({
            flow: String(flow?.id),
            updateLoginFlowBody: body,
          })
          .then(({ data  }) => {
            if(flowId){
              console.log(data.continue_with)
              return
            }
            router.push('/');
          }).catch(handleError)
        

    };

  if (!flow) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Flow<UpdateLoginFlowBody>
            flow={flow}
            onSubmit={onSubmit}
            hideGlobalMessages={false}
          />
          {isLoading && (
            <div className="mt-4 flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
