import React, { useState, useEffect } from "react";
import { Widget } from "@rjsf/utils";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { JSONSchema7 } from "json-schema";
import { JsonObject } from '@backstage/types';

interface Option {
  label: string;
  value: string;
}

const LanguageWidget: Widget<JsonObject, JSONSchema7, any> = ({ value, onChange, formContext }) => {
  const [languages, setLanguages] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const _formContext = formContext as { formData?: {personalInfo: { country: string } }};
  const country = _formContext?.formData?.personalInfo.country;
  React.useEffect(() => {
    if (languages.length === 1) {
      onChange(languages[0].value);
    }
  }, [languages])
  useEffect(() => {
    if (country) {
      setLoading(true);
      // Fetch languages for the specified country
      axios
        .get(`https://restcountries.com/v3.1/all`)
        .then((response) => {
          const countryData = response.data.find((c: any) => c.name.common === country);
          
          if (countryData && countryData.languages) {
            const languageOptions: Option[] = Object.entries(countryData.languages).map(([code, language]) => ({
              label: language as string,
              value: code,
            }));
            setLanguages(languageOptions);
          } else {
            setLanguages([]);
          }
          setLoading(false);
        })
        .catch(() => {
          setLanguages([]);
          setLoading(false);
        });
    }
  }, [country]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChange(event.target.value as string);
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel>Select Language</InputLabel>
      <Select value={value || ""} onChange={handleChange} label="Select Language">        
        {!loading &&
          languages.map((language) => (
            <MenuItem key={language.value} value={language.value}>
              {language.label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default LanguageWidget;
