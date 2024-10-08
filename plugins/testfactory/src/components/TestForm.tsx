
import React from 'react';
import {  
  Header,
  Page,
  Content,
  HeaderLabel,
} from '@backstage/core-components';
import {OrchestratorForm} from '@janus-idp/backstage-plugin-orchestrator-form-react';
import { JsonObject } from '@backstage/types';
import { JSONSchema7 } from 'json-schema';


const schema = {
  type: "object",
  properties: {
    personalInfo: {
      type: "object",
      title: "Personal Information",
      properties: {
        firstName: { "type": "string", "title": "First Name", "default": "John" },
        lastName: { "type": "string", "title": "Last Name" },
        country: { "type": "string", "title": "Country", "ui:widget": "CountryWidget" }
      },
      required: ["firstName"]
    },
    languageInfo: {
      type: "object",
      title: "Language Selection",
      properties: {
        language: { "type": "string", "title": "Language", "ui:widget": "LanguageWidget" }
      }
    }
  }
} as JSONSchema7;

const handleExecute = (parameters: JsonObject): Promise<void> => {console.log(parameters); return Promise.resolve();}

export const TestForm = () => (
  <Page themeId="tool">
    <Header title="Welcome to test!" subtitle="Optional subtitle">
      <HeaderLabel label="Owner" value="Team X" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
      <OrchestratorForm schema={schema} isExecuting={false} handleExecute={handleExecute} isDataReadonly={false} />
    </Content>
  </Page>
);
