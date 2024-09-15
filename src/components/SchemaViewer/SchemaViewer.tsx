import { useState } from 'react';
import { FaRegFileCode } from 'react-icons/fa';
import { GraphQLSchema } from 'graphql';
import {
  DocExplorer,
  EditorContextProvider,
  ExplorerContextProvider,
  SchemaContextProvider,
} from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { RiCloseLargeLine } from 'react-icons/ri';

interface SchemaViewerProps {
  schema: GraphQLSchema | undefined;
  sdlState: string;
}

const SchemaViewer = ({ schema, sdlState }: SchemaViewerProps) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <button
        className="p-2 mt-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
        onClick={toggleDrawer}
      >
        <FaRegFileCode className="inline-block mr-2" />
        View Schema
      </button>

      <div
        className={`graphiql-container z-[9999] fixed top-0 right-0 !w-[400px] h-full bg-white shadow-lg border-l border-gray-300 transition-transform transform ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Schema Explorer</h2>

          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            onClick={toggleDrawer}
          >
            <RiCloseLargeLine size={32} />
          </button>

          {schema && (
            <EditorContextProvider>
              <SchemaContextProvider fetcher={createGraphiQLFetcher({ url: sdlState })}>
                <ExplorerContextProvider>
                  <div className="doc-explorer border-l-4 border-blue-500 bg-white p-4 rounded-md shadow-sm">
                    <DocExplorer />
                  </div>
                </ExplorerContextProvider>
              </SchemaContextProvider>
            </EditorContextProvider>
          )}
        </div>
      </div>

      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black opacity-50" onClick={toggleDrawer}></div>
      )}
    </div>
  );
};

export default SchemaViewer;
