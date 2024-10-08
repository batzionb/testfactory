import React from 'react';
import { FormDecoratorProps, OrchestratorFormApi } from '@janus-idp/backstage-plugin-orchestrator-form-api';
import { CustomValidator, ErrorSchema, RegistryWidgetsType } from '@rjsf/utils';
import {JsonObject} from '@backstage/types';
import { JSONSchema7 } from 'json-schema';
import CountryWidget from './widgets/CountryWidget';
import {isEqual} from "lodash-es";
import LanguageWidget from './widgets/LanguageSelectWidget';

type Data = {
  personalInfo: {
    country: string;
    firstName: string;
  }
  languageInfo: {
    language: string;
  }  
}

class CustomFormExtensionsApi implements OrchestratorFormApi {  
    getFormDecorator(_schema: JSONSchema7) {
      return (FormComponent: React.ComponentType<FormDecoratorProps>) => {
      
       const [extraErrors, setExtraErrors] = React.useState<ErrorSchema<JsonObject>>({        });
       const [formData, setFormData] = React.useState<Data | undefined>();
       const [formContext, setFormContext] = React.useState<{formData: Data | undefined}>({formData: formData});
        const widgets: RegistryWidgetsType<JsonObject, JSONSchema7, any> = {
            LanguageWidget, 
            CountryWidget,
        };

        return () => (<FormComponent widgets={widgets} onChange={(e) => {
          const data = e.formData as Data;
          if (isEqual(data, formData)) {
            return;
          }
          if (data.personalInfo.country !== formData?.personalInfo.country) {
            data.languageInfo = {...data.languageInfo, language: ''};                        
            setFormData(data);
            setFormContext({formData: data});
          }                    
        }} 
        formContext={formContext}
        formData={formData}
        extraErrors={extraErrors}
        />);        
      }
    }    
  }
  

export default CustomFormExtensionsApi;