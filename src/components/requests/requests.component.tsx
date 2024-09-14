'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { selectRequest } from '../../store/reducers/historySlice';
import nextBase64 from 'next-base64';
import { useAppSelector } from '../../hooks/redux-hook';
import NoAnyRequests from '../noAnyRequests/noAnyRequests.components';
import { Locale } from '../../../i18n.config';

function Requests() {
  const router = useRouter();
  const allRequests = useAppSelector(selectRequest);

  const { lang } = useParams();

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
  return (
    <ul className="mt-4">
      {allRequests.length === 0 ? (
        <NoAnyRequests lang={lang as Locale} />
      ) : (
        allRequests.map((item, i) => (
          <li
            role='item-request'
            className="cursor-pointer text-green-700 hover:text-green-500"
            key={i}
            onClick={() => redirectToRespectiveRoute(item)}
          >
            {showRequest(item)}
          </li>
        ))
      )}
    </ul>
  );
}

export default Requests;
