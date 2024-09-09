'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../utils/firebaseConfig';
import { useAppSelector } from '../../../hooks/redux-hook';
import { selectRequest } from '../../../store/reducers/historySlice';
import nextBase64 from 'next-base64';

export default function HistoryPage(): JSX.Element {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const allRequests = useAppSelector(selectRequest);

  function showRequest(req: string) {
    const arrReq = req.split('/');
    const [, , , method, url] = arrReq;
    return `${method}  ${nextBase64.decode(url)}`;
  }

  function redirectToRespectiveRoute(req: string) {
    const arrReq = req.split('/');
    const [, lang, route, method, url, body] = arrReq;
    router.push(`/${lang}/${route}/${method}/${url}/${body}`);
  }

  useEffect(() => {
    if (!user && !loading) {
      router.push('/');
    }
  }, [user, router, loading]);

  return (
    <div>
      {user?.displayName}
      {allRequests.map((item, i) => (
        <div key={i} onClick={() => redirectToRespectiveRoute(item)}>
          {showRequest(item)}
        </div>
      ))}
    </div>
  );
}
