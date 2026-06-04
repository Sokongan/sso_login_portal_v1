type callbackParams = {
    id: string,
    status: string | null,
    message: string | null,
}
export function redirectError({id,status,message} :  callbackParams)  {
  const error = encodeURIComponent(
    JSON.stringify({
      status,
      message,
    })
  );

  window.location.replace(`/error?id=${encodeURIComponent(id)}&error=${error}`);
}
