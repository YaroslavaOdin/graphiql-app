import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { Locale } from '../../../i18n.config';
import { DictionaryType } from '../../interfaces/interfaces';
import { getDictionary } from '../../lib/dictionary';

const languageApi = createApi({
  reducerPath: 'languageApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: builder => ({
    getTextByLang: builder.query<DictionaryType, Locale>({
      async queryFn(lang) {
        try {
          const text = await getDictionary(lang);
          return { data: text };
        } catch (error) {
          return { error: error as FetchBaseQueryError };
        }
      },
    }),
  }),
});

export default languageApi;
export const { useGetTextByLangQuery } = languageApi;
